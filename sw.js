/* ═══════════════════════════════════════════════════════════
   Service worker · Oaxaca to go

   El menú se llama "to go": mucha gente lo abre de viaje, en el
   campo o en un lugar sin señal. Este service worker guarda el
   sitio en el dispositivo para que abra aunque no haya internet,
   y para que la segunda visita no espere a la red.

   Al subir cambios a sw.js hay que subir la VERSION: es lo que
   invalida la copia guardada en los teléfonos de los clientes.
   ═══════════════════════════════════════════════════════════ */

const VERSION = "v1";
const CACHE = `oaxacatogo-${VERSION}`;

/* El "cascarón" mínimo para que el sitio se vea aunque no haya red.
   Las fotos NO van aquí a propósito: son la mayor parte del peso y
   se van guardando conforme el usuario navega. */
const CASCARON = [
    "./",
    "index.html",
    "styles.css",
    "app.js",
    "manifest.webmanifest",
    "img/logo.webp",
    "img/favicon.ico",
    "img/icon-32.png",
    "img/apple-touch-icon.png",
    "img/icon-192.png",
    "img/icon-512.png",
    "img/og-image.jpg",
    // fuentes: si se caen, el sitio sigue legible con las del sistema
    "https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;600;700&family=Work+Sans:wght@400;500;600&display=swap",
];

// ─────────── Instalación ───────────
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE)
            // addAll falla entero si un recurso no está: se agregan uno a uno
            .then(cache => Promise.all(
                CASCARON.map(url =>
                    cache.add(url).catch(() => {
                        // un recurso ausente no debe impedir instalar el sitio
                    })
                )
            ))
            // toma el control de inmediato, sin esperar a que se cierre la pestaña
            .then(() => self.skipWaiting())
    );
});

// ─────────── Activación: limpia cachés viejos ───────────
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(nombres =>
                Promise.all(
                    nombres.filter(n => n !== CACHE).map(n => caches.delete(n))
                )
            )
            .then(() => self.clients.claim())
    );
});

// ─────────── Peticiones ───────────
self.addEventListener("fetch", event => {
    const req = event.request;

    // solo GET: un POST a la API no se cachea
    if (req.method !== "GET") return;

    const url = new URL(req.url);
    const esOtroSitio = url.origin !== self.location.origin;

    // ── Navegación: red primero, caché si no hay señal ──
    // "network first" para que una actualización del menú llegue rápido,
    // con el guardado como red de seguridad cuando se va el internet.
    //
    // Se guarda siempre index.html y NO la URL pedida: si se guardara cada
    // URL con su hash, al volver sin señal un enlace como #moles caería en
    // un documento en blanco, porque el caso de "solo existe en caché" es
    // justamente el que sirve el index guardado.
    if (req.mode === "navigate") {
        event.respondWith(
            fetch(req)
                .then(resp => {
                    if (resp.ok) {
                        const copia = resp.clone();
                        caches.open(CACHE).then(c => c.put("index.html", copia));
                    }
                    return resp;
                })
                .catch(() => caches.match("index.html"))
        );
        return;
    }

    // ── Fuentes y peticiones a Google: caché primero ──
    // son inmutables en la práctica y lentas; no tiene sentido reintentarlas
    if (esOtroSitio) {
        event.respondWith(
            caches.match(req).then(cachada => {
                if (cachada) return cachada;
                return fetch(req).then(resp => {
                    if (resp.ok || resp.type === "opaque") {
                        const copia = resp.clone();
                        caches.open(CACHE).then(c => c.put(req, copia));
                    }
                    return resp;
                });
            })
        );
        return;
    }

    // ── Recursos propios (fotos, css, js): caché primero ──
    // y de paso se guarda lo que se visita por primera vez
    event.respondWith(
        caches.match(req).then(cachada => {
            if (cachada) return cachada;
            return fetch(req).then(resp => {
                if (resp.ok) {
                    const copia = resp.clone();
                    caches.open(CACHE).then(c => c.put(req, copia));
                }
                return resp;
            });
        })
    );
});
