const productos = [
    {
        categoria: "Mezcales",
        nombre: "Mezcal Espadín 250 ml",
        nombre_en: "Espadín Mezcal",
        desc: "Destilado artesanal con notas ahumadas, auténtico carácter del agave oaxaqueño.",
        desc_en: "Handcrafted distilled spirit with smoky notes and the authentic character of Oaxacan agave.",
        precio: 150,
        precio_usd: 10,
        foto: "mezcal-espadin.jpeg"
    },
    {
        categoria: "Mezcales",
        nombre: "Trilogía de Mezcal",
        nombre_en: "Mezcal Trilogy",
        desc: "Tres expresiones artesanales que muestran la diversidad del agave, elaborado con manos oaxaqueñas de San Pablo Villa de Mitla.",
        desc_en: "Three handcrafted mezcals that showcase the diversity of agave, made by artisans from San Pablo Villa de Mitla, Oaxaca.",
        precio: 150,
        precio_usd: 10,
        foto: "mezcal-trilogia.jpeg"
    },
    {
        categoria: "Moles",
        nombre: "Mole Negro 250 g ",
        nombre_en: "Black Mole 250 g",
        desc: "Receta tradicional oaxaqueña, elaborada con una cuidadosa selección de chiles, especias y cacao.",
        desc_en: "Traditional Oaxacan recipe made with a carefully selected blend of chilies, spices, and cocoa.",
        precio: 50,
        precio_usd: 4,
        foto: "mole-negro.jpeg"
    },
    {
        categoria: "Moles",
        nombre: "Mole negro 500 g",
        nombre_en: "Black Mole 500 g",
        desc: "Receta tradicional oaxaqueña, elaborada con una cuidadosa selección de chiles, especias y cacao.",
        desc_en: "Traditional Oaxacan recipe made with a carefully selected blend of chilies, spices, and cocoa.",
        precio: 100,
        precio_usd: 8,
        foto: "mole-negro.jpeg"
    },
    {
        categoria: "Salsas",
        nombre: "Salsa de Chapulines",
        nombre_en: "Grasshopper Salsa",
        desc: "Inspirada en uno de los ingredientes más emblemáticos de la gastronomía Oaxaqueña.",
        desc_en: "Inspired by one of the most iconic ingredients in Oaxacan cuisine.",
        precio: 75,
        precio_usd: 7,
        foto: "salsa-chapulines.jpeg"
    },
    {
        categoria: "Salsas",
        nombre: "Salsa de chile Morita",
        nombre_en: "Morita Salsa",
        desc: "Elaborada con chile Morita, un sabor característico de la cocina mexicana.",
        desc_en: "Made with Morita chili, a signature flavor of Mexican cuisine.",
        precio: 75,
        precio_usd: 7,
        foto: "salsa-morita.jpeg"
    },
    {
        categoria: "Chocolates",
        nombre: "Chocolate Original",
        nombre_en: "Original Chocolate",
        desc: "Elaborado artesanalmente, siguiendo la tradición que distingue nuestro Estado.",
        desc_en: "Handcrafted following the tradition that makes Oaxaca famous.",
        precio: 100,
        precio_usd: 8,
        foto: "chocolate-original.jpeg"
    },
    {
        categoria: "Chocolates",
        nombre: "Chocolate Almendrado",
        nombre_en: "Almond Chocolate",
        desc: "Chocolate Oaxaqueño enriquecido con almendra.",
        desc_en: "Traditional Oaxacan chocolate enriched with almonds.",
        precio: 100,
        precio_usd: 8,
        foto: "chocolate-almendrado.jpeg"
    },
    {
        categoria: "Bebidas en polvo",
        nombre: "Jamaica en polvo 300 g",
        nombre_en: "Powdered Jamaica",
        desc: "Preparado natural sin conservadores, elaborado en San Pablo Etla, Oaxaca.",
        desc_en: "Natural drink mix with no preservatives, made in San Pablo Etla, Oaxaca.",
        precio: 75,
        precio_usd: 8,
        foto: "polvo-jamaica.jpeg"
    },
    {
        categoria: "Bebidas en polvo",
        nombre: "Tamarindo en polvo 300 g",
        nombre_en: "Powdered Tamarind",
        desc: "Una bebida representativa de nuestro hermoso México.",
        desc_en: "A traditional drink that represents the flavors of Mexico.",
        precio: 75,
        precio_usd: 8,
        foto: "polvo-tamarindo.jpeg"
    },
    {
        categoria: "Sales tradicionales",
        nombre: "Sal de Gusano de Maguey",
        nombre_en: "Worm Salt",
        desc: "Un clásico de la gastronomía oaxaqueña, ideal para acompañar mezcal, fruta y botanas.",
        desc_en: "A classic from Oaxacan cuisine, perfect with mezcal, fruit, and snacks.",
        precio: 45,
        precio_usd: 6,
        foto: "sal-gusano.jpeg"
    },

];

// Número de WhatsApp del negocio (formato: código de país + número, sin espacios ni +)
const NUMERO_WHATSAPP = "+529518834911"; // <-- reemplaza por el número real

// ───────── Traducciones de interfaz y categorías ─────────
const textos = {
    es: {
        titulo: "Productos tradicionales de Oaxaca",
        descripcion: "Productos elaborados con manos oaxaqueñas, seleccionados para llevar un pedacito de Oaxaca contigo.",
        todos: "Todos",
        pedir: "Pedir por WhatsApp",
        footer: "Productos tradicionales de Oaxaca.",
        toggleLabel: "EN",
        filtroAria: "Filtrar por categoría"
    },
    en: {
        titulo: "Traditional products from Oaxaca",
        descripcion: "Products made by Oaxacan hands, selected to take a little piece of Oaxaca with you.",
        todos: "All",
        pedir: "Order via WhatsApp",
        footer: "Traditional products from Oaxaca.",
        toggleLabel: "ES",
        filtroAria: "Filter by category"
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

let idioma = "es"; // idioma activo: "es" | "en"
let categoriaActiva = "Todos";

function categoriaMostrada(cat) {
    if (idioma === "en") {
        return categoriasTraducidas[cat] || cat;
    }
    return cat;
}

const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
const nav = document.getElementById("filtros");
const contenido = document.getElementById("contenido");
const btnIdioma = document.getElementById("btnIdioma");

function formatoPrecio(p) {
    if (idioma === "en") {
        return "$" + p.precio_usd.toLocaleString("en-US") + " USD";
    }
    return "$" + p.precio.toLocaleString("es-MX") + " MXN";
}

function linkWhatsapp(p) {
    const nombreProducto = idioma === "en" ? p.nombre_en : p.nombre;
    return `https://wa.me/${NUMERO_WHATSAPP}?text=Hola, me gustaría encargarte ${nombreProducto}`;
}

function render(filtro) {
    contenido.innerHTML = "";
    const activos = filtro === "Todos"
        ? categorias.slice(1)
        : [filtro];

    activos.forEach(cat => {
        const items = productos.filter(p => p.categoria === cat);
        if (!items.length) return;

        const sec = document.createElement("section");
        sec.className = "categoria";
        sec.innerHTML = `<h2 class="categoria-titulo">${categoriaMostrada(cat)}</h2>`;

        items.forEach(p => {
            const nombreMostrado = idioma === "en" ? p.nombre_en : p.nombre;
            const descMostrada = idioma === "en" ? p.desc_en : p.desc;

            const el = document.createElement("div");
            el.className = "producto";
            el.innerHTML = `
          <img class="producto-img" src="fotos/${p.foto}" data-full="fotos/${p.foto}" alt="${nombreMostrado}" loading="lazy">
          <div class="producto-info">
            <div class="producto-cabecera">
              <h3>${nombreMostrado}</h3>
              <div class="producto-precio">${formatoPrecio(p)}</div>
            </div>
            <p>${descMostrada}</p>
            <a class="btn-whatsapp" href="${linkWhatsapp(p)}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C11.5 9 11 7.8 10.8 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15.1 3.6 13.6 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.3-8.4 8.3z"/></svg>
              ${textos[idioma].pedir}
            </a>
          </div>
        `;
            sec.appendChild(el);
        });

        contenido.appendChild(sec);
    });
}

function updateHeader() {
    document.querySelector("h1#titulo").textContent = textos[idioma].titulo;
    document.querySelector("p#descripcion").textContent = textos[idioma].descripcion;
}

function renderNav() {
    nav.innerHTML = "";
    nav.setAttribute("aria-label", textos[idioma].filtroAria);

    categorias.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat === "Todos" ? textos[idioma].todos : categoriaMostrada(cat);
        btn.dataset.cat = cat;
        if (cat === categoriaActiva) btn.classList.add("activo");
        btn.addEventListener("click", () => {
            categoriaActiva = cat;
            document.querySelectorAll("nav button").forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
            render(cat);
        });
        nav.appendChild(btn);
    });
}

function actualizarTextosFijos() {
    document.querySelector("footer").textContent = textos[idioma].footer;
    btnIdioma.textContent = textos[idioma].toggleLabel;
    btnIdioma.setAttribute(
        "aria-label",
        idioma === "es" ? "Switch to English" : "Cambiar a español"
    );
}

renderNav();
actualizarTextosFijos();
render(categoriaActiva);

btnIdioma.addEventListener("click", () => {
    idioma = idioma === "es" ? "en" : "es";
    updateHeader();
    renderNav();
    actualizarTextosFijos();
    render(categoriaActiva);
});

// --- Modal de imagen ---
const modal = document.getElementById("modalImagen");
const modalImg = document.getElementById("modalImg");
const modalCerrar = document.getElementById("modalCerrar");

function abrirModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add("abierto");
}

function cerrarModal() {
    modal.classList.remove("abierto");
    modalImg.src = "";
}

// Delegación de eventos: funciona con las tarjetas aunque se re-rendericen al filtrar
contenido.addEventListener("click", (e) => {
    const img = e.target.closest(".producto-img");
    if (img) {
        abrirModal(img.dataset.full, img.alt);
    }
});

modalCerrar.addEventListener("click", cerrarModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
});