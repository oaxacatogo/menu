const productos = [
    {
        categoria: "Mezcales",
        nombre: "Mezcal Espadín 250 ml",
        desc: "Destilado artesanal con notas ahumadas, auténtico carácter del agave oaxaqueño.",
        precio: 150,
        foto: "mezcal-espadin.jpeg"
    },
    {
        categoria: "Mezcales",
        nombre: "Trilogía de Mezcal",
        desc: "Tres expresiones artesanales que muestran la diversidad del agave, elaborado con manos oaxaqueñas de San Pablo Villa de Mitla.",
        precio: 150,
        foto: "mezcal-trilogia.jpeg"
    },
    {
        categoria: "Moles",
        nombre: "Mole Negro 500 g ",
        desc: "Receta tradicional oaxaqueña, elaborada con una cuidadosa selección de chiles, especias y cacao.",
        precio: 50,
        foto: "mole-negro.jpeg"
    },
    {
        categoria: "Moles",
        nombre: "Mole negro",
        desc: "Receta tradicional oaxaqueña, elaborada con una cuidadosa selección de chiles, especias y cacao.",
        precio: 100,
        foto: "mole-negro.jpeg"
    },
    {
        categoria: "Salsas",
        nombre: "Salsa de Chapulines",
        desc: "Inspirada en uno de los ingredientes más emblemáticos de la gastronomía Oaxaqueña.",
        precio: 75,
        foto: "salsa-chapulines.jpeg"
    },
    {
        categoria: "Salsas",
        nombre: "Salsa de chile Morita",
        desc: "Elaborada con chile Morita, un sabor característico de la cocina mexicana.",
        precio: 75,
        foto: "salsa-morita.jpeg"
    },
    {
        categoria: "Chocolates",
        nombre: "Chocolate Original",
        desc: "Elaborado artesanalmente, siguiendo la tradición que distingue nuestro Estado.",
        precio: 100,
        foto: "chocolate-original.jpeg"
    },
    {
        categoria: "Chocolates",
        nombre: "Chocolate Almendrado",
        desc: "Chocolate Oaxaqueño enriquecido con almendra.",
        precio: 100,
        foto: "chocolate-almendrado.jpeg"
    },
    {
        categoria: "Bebidas en polvo",
        nombre: "Jamaica en polvo 300 g",
        desc: "Preparado natural sin conservadores, elaborado en San Pablo Etla, Oaxaca.",
        precio: 75,
        foto: "polvo-jamaica.jpeg"
    },
    {
        categoria: "Bebidas en polvo",
        nombre: "Tamarindo en polvo 300 g",
        desc: "Una bebida representativa de nuestro hermoso México.",
        precio: 75,
        foto: "polvo-tamarindo.jpeg"
    },
    {
        categoria: "Sales tradicionales",
        nombre: "Sal de Gusano de Maguey",
        desc: "Un clásico de la gastronomía oaxaqueña, ideal para acompañar mezcal, fruta y botanas.",
        precio: 45,
        foto: "sal-gusano.jpeg"
    },

];

// Número de WhatsApp del negocio (formato: código de país + número, sin espacios ni +)
const NUMERO_WHATSAPP = "+526241555147"; // <-- reemplaza por el número real

const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
const nav = document.getElementById("filtros");
const contenido = document.getElementById("contenido");

function formatoPrecio(n) {
    return "$" + n.toLocaleString("es-MX");
}

function linkWhatsapp(p) {
    const mensaje = `Hola, quiero pedir: ${p.nombre} (${formatoPrecio(p.precio)})`;
    return `https://wa.me/${NUMERO_WHATSAPP}?text=Hola, me gustaría encargarte ${p.nombre}`;
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
        sec.innerHTML = `<h2 class="categoria-titulo">${cat}</h2>`;

        items.forEach(p => {
            const el = document.createElement("div");
            el.className = "producto";
            el.innerHTML = `
          <img class="producto-img" src="fotos/${p.foto}" data-full="fotos/${p.foto}" alt="${p.nombre}" loading="lazy">
          <div class="producto-info">
            <div class="producto-cabecera">
              <h3>${p.nombre}</h3>
              <div class="producto-precio">${formatoPrecio(p.precio)}</div>
            </div>
            <p>${p.desc}</p>
            <a class="btn-whatsapp" href="${linkWhatsapp(p)}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C11.5 9 11 7.8 10.8 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15.1 3.6 13.6 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.3-8.4 8.3z"/></svg>
              Pedir por WhatsApp
            </a>
          </div>
        `;
            sec.appendChild(el);
        });

        contenido.appendChild(sec);
    });
}

categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    if (cat === "Todos") btn.classList.add("activo");
    btn.addEventListener("click", () => {
        document.querySelectorAll("nav button").forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        render(cat);
    });
    nav.appendChild(btn);
});

render("Todos");

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