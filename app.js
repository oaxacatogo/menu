/* ═══════════════════════════════════════════════════════════
   Oaxaca to go · lógica del menú
   Sin dependencias ni build: se sube la carpeta y ya funciona.
   ═══════════════════════════════════════════════════════════ */

const productos = [
    {
        categoria: "Mezcales",
        nombre: "Mezcal Espadín 250 ml",
        nombre_en: "Espadín Mezcal 250 ml",
        desc: "Destilado artesanal con notas ahumadas, auténtico carácter del agave oaxaqueño.",
        desc_en: "Handcrafted distilled spirit with smoky notes and the authentic character of Oaxacan agave.",
        precio: 150,
        precio_usd: 10,
        foto: "mezcal-espadin"
    },
    {
        categoria: "Mezcales",
        nombre: "Trilogía de Mezcal",
        nombre_en: "Mezcal Trilogy",
        desc: "Tres expresiones artesanales que muestran la diversidad del agave, elaborado con manos oaxaqueñas de San Pablo Villa de Mitla.",
        desc_en: "Three handcrafted mezcals that showcase the diversity of agave, made by artisans from San Pablo Villa de Mitla, Oaxaca.",
        precio: 150,
        precio_usd: 10,
        foto: "mezcal-trilogia"
    },
    {
        categoria: "Moles",
        nombre: "Mole Negro 250 g",
        nombre_en: "Black Mole 250 g",
        desc: "Receta tradicional oaxaqueña, elaborada con una cuidadosa selección de chiles, especias y cacao.",
        desc_en: "Traditional Oaxacan recipe made with a carefully selected blend of chilies, spices, and cocoa.",
        precio: 50,
        precio_usd: 4,
        foto: "mole-negro"
    },
    {
        categoria: "Moles",
        nombre: "Mole Negro 500 g",
        nombre_en: "Black Mole 500 g",
        desc: "Receta tradicional oaxaqueña, elaborada con una cuidadosa selección de chiles, especias y cacao.",
        desc_en: "Traditional Oaxacan recipe made with a carefully selected blend of chilies, spices, and cocoa.",
        precio: 100,
        precio_usd: 8,
        foto: "mole-negro"
    },
    {
        categoria: "Salsas",
        nombre: "Salsa de Chapulines",
        nombre_en: "Grasshopper Salsa",
        desc: "Inspirada en uno de los ingredientes más emblemáticos de la gastronomía oaxaqueña.",
        desc_en: "Inspired by one of the most iconic ingredients in Oaxacan cuisine.",
        precio: 75,
        precio_usd: 7,
        foto: "salsa-chapulines"
    },
    {
        categoria: "Salsas",
        nombre: "Salsa de Chile Morita",
        nombre_en: "Morita Chile Salsa",
        desc: "Elaborada con chile Morita, un sabor característico de la cocina mexicana.",
        desc_en: "Made with Morita chili, a signature flavor of Mexican cuisine.",
        precio: 75,
        precio_usd: 7,
        foto: "salsa-morita"
    },
    {
        categoria: "Chocolates",
        nombre: "Chocolate Original",
        nombre_en: "Original Chocolate",
        desc: "Elaborado artesanalmente, siguiendo la tradición que distingue nuestro Estado.",
        desc_en: "Handcrafted following the tradition that makes Oaxaca famous.",
        precio: 100,
        precio_usd: 8,
        foto: "chocolate-original"
    },
    {
        categoria: "Chocolates",
        nombre: "Chocolate Almendrado",
        nombre_en: "Almond Chocolate",
        desc: "Chocolate oaxaqueño enriquecido con almendra.",
        desc_en: "Traditional Oaxacan chocolate enriched with almonds.",
        precio: 100,
        precio_usd: 8,
        foto: "chocolate-almendrado"
    },
    {
        categoria: "Bebidas en polvo",
        nombre: "Jamaica en Polvo 300 g",
        nombre_en: "Powdered Jamaica 300 g",
        desc: "Preparado natural sin conservadores, elaborado en San Pablo Etla, Oaxaca.",
        desc_en: "Natural drink mix with no preservatives, made in San Pablo Etla, Oaxaca.",
        precio: 75,
        precio_usd: 8,
        foto: "polvo-jamaica"
    },
    {
        categoria: "Bebidas en polvo",
        nombre: "Tamarindo en Polvo 300 g",
        nombre_en: "Powdered Tamarind 300 g",
        desc: "Una bebida representativa de nuestro hermoso México.",
        desc_en: "A traditional drink that represents the flavors of Mexico.",
        precio: 75,
        precio_usd: 8,
        foto: "polvo-tamarindo"
    },
    {
        categoria: "Sales tradicionales",
        nombre: "Sal de Gusano de Maguey",
        nombre_en: "Maguey Worm Salt",
        desc: "Un clásico de la gastronomía oaxaqueña, ideal para acompañar mezcal, fruta y botanas.",
        desc_en: "A classic from Oaxacan cuisine, perfect with mezcal, fruit, and snacks.",
        precio: 45,
        precio_usd: 6,
        foto: "sal-gusano"
    },
];

/* ─────────── Configuración del negocio ───────────
   El número va SIN el signo + y sin espacios: es lo que exige wa.me.
   Con el + los botones de producto no abrían el chat. */
const NUMERO_WHATSAPP = "529518834911";
const SITIO = "https://oaxacatogo.github.io/menu/";

const thumb = f => `fotos/thumbs/${f}.webp`;
const full = f => `fotos/full/${f}.webp`;

// ───────── Traducciones de interfaz ─────────
const textos = {
    es: {
        titulo: "Sabores de Oaxaca",
        tituloDoc: "Oaxaca to go · Sabores de Oaxaca",
        descripcion: "Productos elaborados con manos oaxaqueñas, seleccionados para llevar un pedacito de Oaxaca contigo.",
        todos: "Todos",
        pedir: "Pedir por WhatsApp",
        pedirAria: "Pedir por WhatsApp",
        pie: "Productos tradicionales de Oaxaca.",
        alternarIdioma: "EN",
        alternarIdiomaAria: "Cambiar a inglés",
        filtroAria: "Filtrar por categoría",
        filtroAriaEn: "Filter by category",
        verFoto: "Ver foto ampliada de",
        resultados: n => n === 1 ? "1 producto" : `${n} productos`,
        expanding: (n, cat) => `${n} productos en ${cat}`
    },
    en: {
        titulo: "Flavors of Oaxaca",
        tituloDoc: "Oaxaca to go · Flavors of Oaxaca",
        descripcion: "Products made by Oaxacan hands, selected to take a little piece of Oaxaca with you.",
        todos: "All",
        pedir: "Order via WhatsApp",
        pedirAria: "Order via WhatsApp",
        pie: "Traditional products from Oaxaca.",
        alternarIdioma: "ES",
        alternarIdiomaAria: "Cambiar a español",
        filtroAria: "Filtrar por categoría",
        filtroAriaEn: "Filter by category",
        verFoto: "Enlarge photo of",
        resultados: n => n === 1 ? "1 product" : `${n} products`,
        expanding: (n, cat) => `${n} products in ${cat}`
    }
};

const categoriasTraducidas = {
    "Mezcales": "Mezcals",
    "Moles": "Moles",
    "Salsas": "Sauces",
    "Chocolates": "Chocolates",
    "Bebidas en polvo": "Powdered Drinks",
    "Sales tradicionales": "Traditional Salts"
};

/* ─────────── Estado ─────────── */
const CLAVE_IDIOMA = "oaxacatogo:idioma";
const CLAVE_CATEGORIA = "oaxacatogo:categoria";
const TODAS = "Todos";

const categorias = [TODAS, ...new Set(productos.map(p => p.categoria))];
const slugs = new Map(categorias.map(c => [c, slug(c)]));

let idioma = leerIdiomaGuardado();
let categoriaActiva = leerCategoriaDeUrl();

const nav = document.getElementById("filtros");
const contenido = document.getElementById("contenido");
const btnIdioma = document.getElementById("btnIdioma");
const estado = document.getElementById("estado");
const pie = document.getElementById("pie");

// ─────────── Utilidades ───────────

/** Escapa texto antes de meterlo en innerHTML. */
function esc(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

function slug(texto) {
    // NFD separa la "é" en "e" + acento; quitamos los acentos combinantes
    // (U+0300–U+036F) para que "Bebidas en Polvo" quede "bebidas-en-polvo"
    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function leerIdiomaGuardado() {
    try {
        const g = localStorage.getItem(CLAVE_IDIOMA);
        if (g === "es" || g === "en") return g;
    } catch (e) { /* modo privado: seguimos con el predeterminado */ }
    return "es";
}

function guardar(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (e) { /* sin espacio */ }
}

function categoriaMostrada(cat) {
    return idioma === "en" ? (categoriasTraducidas[cat] || cat) : cat;
}

function formatoPrecio(p) {
    if (idioma === "en") {
        return "$" + p.precio_usd.toLocaleString("en-US") + " USD";
    }
    return "$" + p.precio.toLocaleString("es-MX") + " MXN";
}

function linkWhatsapp(p) {
    const nombre = idioma === "en" ? p.nombre_en : p.nombre;
    const mensaje = idioma === "en"
        ? `Hello! I'd like to order ${nombre}.`
        : `Hola, me gustaría encargarte ${nombre}.`;
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

// ─────────── Render ───────────

function render() {
    const t = textos[idioma];
    contenido.innerHTML = "";

    const activas = categoriaActiva === TODAS
        ? categorias.slice(1)
        : [categoriaActiva];

    let total = 0;

    activas.forEach(cat => {
        const items = productos.filter(p => p.categoria === cat);
        if (!items.length) return;
        total += items.length;

        const sec = document.createElement("section");
        sec.className = "categoria";
        sec.setAttribute("aria-labelledby", `cat-${slugs.get(cat)}`);

        const h2 = document.createElement("h2");
        h2.className = "categoria-titulo";
        h2.id = `cat-${slugs.get(cat)}`;
        h2.textContent = categoriaMostrada(cat);
        sec.appendChild(h2);

        items.forEach(p => {
            const nombre = idioma === "en" ? p.nombre_en : p.nombre;
            const desc = idioma === "en" ? p.desc_en : p.desc;

            const el = document.createElement("article");
            el.className = "producto";

            // `foto` sin extensión: las rutas se arman con thumb()/full()
            el.innerHTML = `
              <button class="producto-foto" type="button"
                      data-full="${esc(full(p.foto))}"
                      aria-label="${esc(t.verFoto + " " + nombre)}">
                <img class="producto-img" src="${esc(thumb(p.foto))}"
                     alt="${esc(nombre)}"
                     width="240" height="320"
                     decoding="async" loading="lazy">
              </button>
              <div class="producto-info">
                <div class="producto-cabecera">
                  <h3>${esc(nombre)}</h3>
                  <div class="producto-precio">${esc(formatoPrecio(p))}</div>
                </div>
                <p>${esc(desc)}</p>
                <a class="btn-whatsapp" href="${esc(linkWhatsapp(p))}"
                   target="_blank" rel="noopener"
                   aria-label="${esc(t.pedirAria + " " + nombre)}">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C11.5 9 11 7.8 10.8 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15.1 3.6 13.6 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.3-8.4 8.3z"/></svg>
                  ${esc(t.pedir)}
                </a>
              </div>
            `;

            // Si falta el archivo (producto nuevo sin correr el optimizador),
            // ocultamos la foto en vez de mostrar el ícono de imagen rota.
            const img = el.querySelector(".producto-img");
            img.addEventListener("error", () => {
                const btn = el.querySelector(".producto-foto");
                if (btn) btn.style.display = "none";
            });

            sec.appendChild(el);
        });

        contenido.appendChild(sec);
    });

    // Aviso para lectores de pantalla
    estado.textContent = categoriaActiva === TODAS
        ? t.resultados(total)
        : t.expanding(total, categoriaMostrada(categoriaActiva));

    guardar(CLAVE_CATEGORIA, categoriaActiva);
}

function renderNav() {
    nav.innerHTML = "";
    nav.setAttribute("aria-label", idioma === "en" ? textos.en.filtroAriaEn : textos.es.filtroAria);

    categorias.forEach(cat => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = cat === TODAS ? textos[idioma].todos : categoriaMostrada(cat);
        btn.dataset.cat = cat;

        const activa = cat === categoriaActiva;
        btn.classList.toggle("activo", activa);
        // en vez de aria-current, un filtro es un botón que se puede activar
        btn.setAttribute("aria-pressed", String(activa));

        btn.addEventListener("click", () => {
            categoriaActiva = cat;
            renderNav();
            render();
            actualizarUrl();
        });

        nav.appendChild(btn);
    });
}

/** Actualiza lang, title, encabezado, pie y botón de idioma. */
function actualizarTextos() {
    const t = textos[idioma];

    // lang y title son lo primero: de ello depende la pronunciación del
    // lector de pantalla y lo que se ve en la pestaña del navegador
    document.documentElement.lang = idioma === "en" ? "en" : "es-MX";
    document.title = t.tituloDoc;

    document.getElementById("titulo").textContent = t.titulo;
    document.getElementById("descripcion").textContent = t.descripcion;
    pie.textContent = t.pie;

    btnIdioma.textContent = t.alternarIdioma;
    btnIdioma.setAttribute("aria-label", t.alternarIdiomaAria);
}

// ─────────── URL: permite compartir un filtro concreto ───────────
function actualizarUrl() {
    const nuevo = categoriaActiva === TODAS ? "" : `#${slugs.get(categoriaActiva)}`;
    const url = location.pathname + location.search + nuevo;

    history.replaceState(null, "", url || location.pathname);
}

function leerCategoriaDeUrl() {
    const h = location.hash.replace("#", "");
    if (!h) return TODAS;
    const encontrada = categorias.find(c => c !== TODAS && slugs.get(c) === h);
    return encontrada || TODAS;
}

window.addEventListener("hashchange", () => {
    const cat = leerCategoriaDeUrl();
    if (cat !== categoriaActiva) {
        categoriaActiva = cat;
        renderNav();
        render();
    }
});

// ─────────── Datos estructurados del menú ───────────
/* Se generan desde `productos` para que no haya que mantener el precio
   en dos lugares. Google los usa para mostrar precio y disponibilidad. */
function inyectarDatosEstructurados() {
    const items = productos.map(p => ({
        "@type": "Product",
        "name": p.nombre,
        "description": p.desc,
        "image": `${SITIO}${thumb(p.foto)}`,
        "offers": {
            "@type": "Offer",
            "price": String(p.precio),
            "priceCurrency": "MXN",
            "availability": "https://schema.org/InStock",
            "url": `${SITIO}#${slug(p.categoria)}`
        }
    }));

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Menú de Oaxaca to go",
        "numberOfItems": items.length,
        "itemListElement": items.map((it, i) => ({ "@type": "ListItem", position: i + 1, item: it }))
    });
    document.head.appendChild(script);
}

// ─────────── Modal de foto ───────────
const modal = document.getElementById("modalImagen");
const modalImg = document.getElementById("modalImg");
const modalCerrar = document.getElementById("modalCerrar");

let elementoPrevio = null;   // para devolver el foco al cerrar
let modalAbierto = false;

function abrirModal(src, alt, disparador) {
    elementoPrevio = disparador || document.activeElement;

    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add("abierto");
    modalAbierto = true;

    // bloquea el scroll del fondo
    document.body.style.overflow = "hidden";
    // el foco entra al modal, si no el teclado sigue detrás del velo
    modalCerrar.focus();
}

function cerrarModal() {
    if (!modalAbierto) return;   // antes corría también con Escape cerrado

    modal.classList.remove("abierto");
    modalAbierto = false;
    document.body.style.overflow = "";
    modalImg.removeAttribute("src");   // removeAttribute, no src="" (pedía la URL actual)

    if (elementoPrevio && document.contains(elementoPrevio)) {
        elementoPrevio.focus();
    }
    elementoPrevio = null;
}

/* Delegación: las tarjetas se reconstruyen al filtrar, así que el
   listener vive en el contenedor y no en cada botón. */
contenido.addEventListener("click", e => {
    const btn = e.target.closest(".producto-foto");
    if (!btn) return;
    const img = btn.querySelector(".producto-img");
    // la miniatura se carga al abrir la página; la grande solo alAMPLiar
    abrirModal(btn.dataset.full, img.alt, btn);
});

modalCerrar.addEventListener("click", cerrarModal);

modal.addEventListener("click", e => {
    if (e.target === modal) cerrarModal();
});

document.addEventListener("keydown", e => {
    if (!modalAbierto) return;

    if (e.key === "Escape") {
        e.preventDefault();
        cerrarModal();
        return;
    }

    // trampa de foco: el único control del modal es el botón de cerrar,
    // así que dejamos que el foco circule entre él y el propio overlay
    if (e.key === "Tab") {
        e.preventDefault();
        modalCerrar.focus();
    }
});

// ─────────── Arranque ───────────
actualizarTextos();
renderNav();
render();
inyectarDatosEstructurados();

btnIdioma.addEventListener("click", () => {
    idioma = idioma === "es" ? "en" : "es";
    guardar(CLAVE_IDIOMA, idioma);

    // si el modal está abierto, su imagen corresponde al idioma anterior
    cerrarModal();

    actualizarTextos();
    renderNav();
    render();
});

// ─────────── Modo sin internet ───────────
// El menú se llama "to go": mucha gente lo abre de viaje, donde no hay señal.
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {
            // sin service worker el sitio sigue funcionando, solo pierde el modo offline
        });
    });
}
