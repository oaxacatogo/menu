#!/usr/bin/env python3
"""
Genera las versiones ligeras de las imagenes del sitio.

El menu original servia los JPEG completos (960x1280, ~80 KB cada uno) para
mostrarlos en recuadros de 88 px de ancho. Este script produce:

  fotos/thumbs/<nombre>.webp   240 px de ancho  -> se muestra en la tarjeta
  fotos/full/<nombre>.webp     960 px de ancho  -> se abre en el modal
  img/logo.webp                version ligera del logo para el <header>
  img/favicon.ico, icon-*.png   iconos de pestana y de "anadir a pantalla"
  img/og-image.jpg             imagen 1200x630 para compartir el link

Los archivos de origen (img/logo.jpeg y fotos/*.jpeg) NO se tocan: son la
copia maestra desde la que se regenera todo lo demas.

Uso:  python3 tools/optimize-images.py
Requiere Pillow:  pip install Pillow
"""

import os
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_IMG = os.path.join(RAIZ, "img")   # logo e iconos del sitio

THUMB_W = 240   # 88 px CSS x ~2.7 para pantallas de alta densidad
FULL_W = 960    # imagen que se ve ampliada en el modal
THUMB_Q = 76
FULL_Q = 82

DIR_FOTOS = os.path.join(RAIZ, "fotos")
DIR_THUMBS = os.path.join(DIR_FOTOS, "thumbs")
DIR_FULL = os.path.join(DIR_FOTOS, "full")


def optimiza(origen, destino, ancho, calidad):
    """Reescala y guarda en WebP. Devuelve (bytes antes, bytes despues)."""
    img = Image.open(origen)
    img = img.convert("RGB")

    if img.width > ancho:
        alto = round(img.height * ancho / img.width)
        # reduce() es mas rapido que resize() cuando el factor es > 2
        if ancho * 2 <= img.width:
            img = img.reduce(max(1, img.width // ancho))
            img = img.resize((ancho, alto), Image.LANCZOS)
        else:
            img = img.resize((ancho, alto), Image.LANCZOS)

    os.makedirs(os.path.dirname(destino), exist_ok=True)
    img.save(destino, "WEBP", quality=calidad, method=6)

    return os.path.getsize(origen), os.path.getsize(destino)


def procesa_fotos():
    origenes = sorted(
        f for f in os.listdir(DIR_FOTOS) if f.lower().endswith((".jpeg", ".jpg", ".png"))
    )

    total_antes = total_despues = 0

    for nombre in origenes:
        base = os.path.splitext(nombre)[0]
        ruta_origen = os.path.join(DIR_FOTOS, nombre)

        a_t, d_t = optimiza(
            ruta_origen, os.path.join(DIR_THUMBS, base + ".webp"), THUMB_W, THUMB_Q
        )
        a_f, d_f = optimiza(
            ruta_origen, os.path.join(DIR_FULL, base + ".webp"), FULL_W, FULL_Q
        )

        total_antes += a_f
        total_despues += d_t

        print(
            f"  {base:24s} thumb {d_t/1024:6.1f} KB   "
            f"full {d_f/1024:6.1f} KB   (antes {a_f/1024:6.1f} KB)"
        )

    print(
        f"\n  {len(origenes)} fotos | lo que se descarga al abrir: "
        f"{total_despues/1024:.0f} KB  (antes {total_antes/1024:.0f} KB)"
    )


def procesa_logo():
    """El logo se muestra a 240 px y ademas se usa como icono de pestana.
    Todo lo que sale de aqui va a img/."""
    ruta = os.path.join(DIR_IMG, "logo.jpeg")

    logo = Image.open(ruta).convert("RGB")
    antes = os.path.getsize(ruta)
    os.makedirs(DIR_IMG, exist_ok=True)

    # version para el <header>
    logo.resize((480, 480), Image.LANCZOS).save(
        os.path.join(DIR_IMG, "logo.webp"), "WEBP", quality=84, method=6
    )

    # icono de pestana 32x32 (y 16x16 por si el navegador lo pide)
    icono = logo.resize((32, 32), Image.LANCZOS)
    icono.save(os.path.join(DIR_IMG, "favicon.ico"), sizes=[(16, 16), (32, 32)])
    icono.save(os.path.join(DIR_IMG, "icon-32.png"))

    # iconos para "anadir a pantalla de inicio"
    # se guardan en PNG de 256 colores: como PNG de color completo
    # ocupaban 184 KB y el navegador no gana nada con más colores
    def png_ico(size, nombre):
        logo.resize((size, size), Image.LANCZOS).quantize(
            colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG
        ).save(os.path.join(DIR_IMG, nombre), optimize=True)

    png_ico(180, "apple-touch-icon.png")
    png_ico(192, "icon-192.png")
    png_ico(512, "icon-512.png")

    kb = lambda b: f"{b/1024:.1f} KB"
    peso = lambda n: kb(os.path.getsize(os.path.join(DIR_IMG, n)))
    print(
        f"  logo                     header {peso('logo.webp')}   "
        f"favicon {peso('favicon.ico')}   "
        f"apple-touch {peso('apple-touch-icon.png')}"
        f"   (antes {kb(antes)})"
    )
    print(
        f"  iconos instalables       192 {peso('icon-192.png')}   "
        f"512 {peso('icon-512.png')}"
    )


def genera_og_image():
    """Imagen que se ve al compartir el link en WhatsApp o redes: 1200x630."""
    fondo, terracota, casi_negro = "#FDF9EE", "#AF3A1F", "#1A1A1A"
    dorado = "#8A6F2C"  # el dorado claro no se lee sobre crema
    W, H = 1200, 630
    lienzo = Image.new("RGB", (W, H), fondo)
    d = ImageDraw.Draw(lienzo)

    logo = Image.open(os.path.join(DIR_IMG, "logo.jpeg")).convert("RGB")
    logo = logo.resize((300, 300), Image.LANCZOS)
    # el logo es circular en el sitio: se recorta con una máscara
    mascara = Image.new("L", (300, 300), 0)
    ImageDraw.Draw(mascara).ellipse((0, 0, 299, 299), fill=255)
    lienzo.paste(logo, (60, (H - 300) // 2), mascara)

    x = 420
    d.text((x, 235), "Oaxaca to go", fill=casi_negro, font=fuente(76))
    d.rectangle([x, 330, x + 240, 336], fill=terracota)
    d.text((x, 360), "Sabores de Oaxaca", fill=terracota, font=fuente(40))
    d.text((x, 430), "Mezcal · Moles · Salsas", fill=dorado, font=fuente(34))
    d.text((x, 478), "Chocolates · Sales tradicionales", fill=dorado, font=fuente(34))

    destino = os.path.join(DIR_IMG, "og-image.jpg")
    lienzo.save(destino, "JPEG", quality=88, optimize=True, progressive=True)
    print(
        f"  imagen para compartir    og-image {os.path.getsize(destino)/1024:.1f} KB   (1200x630)"
    )


_cache_fuentes = {}

def fuente(px):
    """Busca una fuente del sistema a tamano px (TrueType), con reserva."""
    global _cache_fuentes
    if px in _cache_fuentes:
        return _cache_fuentes[px]

    candidatas = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/TTF/DejaVuSans.ttf",
    ]
    for c in candidatas:
        if os.path.exists(c):
            f = ImageFont.truetype(c, px)
            _cache_fuentes[px] = f
            return f

    f = ImageFont.load_default()
    _cache_fuentes[px] = f
    return f


if __name__ == "__main__":
    print("Optimizando logo e iconos (img/)...")
    procesa_logo()
    genera_og_image()
    print("\nOptimizando fotos de producto...")
    procesa_fotos()
    print("\nListo.")
