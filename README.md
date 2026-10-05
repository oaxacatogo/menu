# Oaxaca to go · menú

Menú de productos artesanales de Oaxaca (mezcal, moles, salsas, chocolates y
sales). Sitio estático: una sola carpeta, sin dependencias y sin build. Se
sube tal cual a cualquier hosting estático.

## Estructura

```
index.html               la página; aquí viven el SEO y los datos estructurados
styles.css               hoja de estilos, paleta centralizada en :root
app.js                   datos del menú, render, filtros, modal e idiomas
sw.js                    service worker: deja el menú disponible sin internet
manifest.webmanifest     permite "añadir a pantalla de inicio"

img/                     logo e iconos del sitio
  logo.jpeg                original, NO editar (copia maestra)
  logo.webp                versión ligera para el encabezado
  favicon.ico              icono de la pestaña
  icon-32/192/512.png      iconos instalables
  apple-touch-icon.png     icono de iOS
  og-image.jpg             imagen que se ve al compartir el link

fotos/                   fotos de producto
  *.jpeg                   originales, NO editar (copia maestra)
  thumbs/*.webp            240 px, se muestran en la tarjeta
  full/*.webp              960 px, se abren en el modal

tools/optimize-images.py regenera las imágenes ligeras desde los originales
```

## Everyday tasks

### Agregar o cambiar un producto

Todo vive en el arreglo `productos` de `app.js`. Cada producto necesita:

```js
{
    categoria: "Moles",              // debe existir arriba, en productos
    nombre: "Mole Negro 250 g",      // sin espacios al final
    nombre_en: "Black Mole 250 g",
    desc: "…",
    desc_en: "…",
    precio: 50,                      // pesos mexicanos
    precio_usd: 4,
    foto: "mole-negro"               // sin extensión
}
```

### Cambiar precios o descripciones

Edita `app.js`. El HTML ya no tiene productos escritos a mano, así que no hay
que tocar nada más. El `title`, los precios y el catálogo que ven Google se
generan solos desde ahí.

### Cambiar el número de WhatsApp

`NUMERO_WHATSAPP`, arriba de todo en `app.js`. **Sin el signo `+` ni espacios.**
Con el `+` los botones no abren el chat. No olvidar el número en `index.html`
(botón flotante) y en el JSON-LD.

### Cambiar textos de la interfaz

El objeto `textos` en `app.js` tiene los textos en `es` y `en`. Los nombres de
categoría que cambian al traducir van en `categoriasTraducidas`.

### Cambiar el logo o las fotos

Reemplaza el original en `img/logo.jpeg` o `fotos/*.jpeg` y ejecuta:

```bash
pip install Pillow
python3 tools/optimize-images.py
```

Genera solo las versiones ligeras. **No editar a mano los `.webp`**: se
sobrescriben en la siguiente corrida.

### Después de cambiar `sw.js`

Sube el número de `VERSION`. Es lo que hace que los teléfonos de los clientes
descarten la copia guardada; si no sube, seguirán viendo la versión vieja.

## Publicar

Cualquier hosting estático sirve esta carpeta sin configuración. En GitHub
Pages, publica la rama `main` desde *Settings → Pages*.

## Pruebas

No hay suite en el repo. Al tocar `app.js` o `sw.js` conviene abrir la página
en un navegador real y comprobar: que carga sin errores en la consola, que los
11 botones de WhatsApp abren el chat, que el modal abre con teclado y que el
menú sigue abreiendo con la red apagada.
