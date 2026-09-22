"""
Builds the favicon set and social preview from the site's own fonts and colors.

    python3 -m pip install pillow fonttools
    python3 scripts/brand-assets.py

Run from the repository root after `npm install` (the fonts come from node_modules).
Writes public/favicon.svg, favicon.ico, favicon-32x32.png, favicon-96x96.png, apple-touch-icon.png, social-preview.png.
"""
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'node_modules/@fontsource'
PLAYFAIR = FONTS / 'playfair-display/files/playfair-display-latin-700-normal.woff'
INTER = ROOT / 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'
MONO = FONTS / 'jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff'
PUBLIC = ROOT / 'public'

NIGHT = (5, 8, 22)
INK = (8, 11, 28)
SNOW = (238, 236, 246)
MUTED = (169, 163, 194)
ACCENT = (112, 215, 250)
PINK = (230, 167, 237)
GOLD = (247, 206, 112)
STAR = (242, 114, 200)
GRADIENT = [ACCENT, PINK, GOLD]


def gradient(width, height, stops=GRADIENT, angle=0):
    """Left-to-right (optionally tilted) multi-stop gradient, sRGB like the site."""
    width, height = round(width), round(height)
    img = Image.new('RGB', (width, height))
    px = img.load()
    dx, dy = math.cos(math.radians(angle)), math.sin(math.radians(angle))
    span = abs(width * dx) + abs(height * dy)
    for y in range(height):
        for x in range(width):
            t = min(max((x * dx + y * dy) / span, 0), 1) * (len(stops) - 1)
            i = min(int(t), len(stops) - 2)
            f = t - i
            px[x, y] = tuple(round(a + (b - a) * f) for a, b in zip(stops[i], stops[i + 1]))
    return img


def inter(size, weight):
    font = ImageFont.truetype(str(INTER), size)
    font.set_variation_by_axes([weight])
    return font


def rounded_mask(size, radius):
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius, fill=255)
    return mask


# ---------- Favicon: the hero's "Em" mark ----------

def favicon_png(size):
    scale = 4  # draw large, then downsample for smooth edges
    s = size * scale
    tile = gradient(s, s, angle=35)
    draw = ImageDraw.Draw(tile)
    font = ImageFont.truetype(str(PLAYFAIR), round(s * 0.56))
    box = draw.textbbox((0, 0), 'Em', font=font)
    x = (s - (box[2] - box[0])) / 2 - box[0]
    y = (s - (box[3] - box[1])) / 2 - box[1] - s * 0.01
    draw.text((x, y), 'Em', font=font, fill=INK)
    icon = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    icon.paste(tile, (0, 0), rounded_mask((s, s), round(s * 0.22)))
    return icon.resize((size, size), Image.LANCZOS)


def favicon_svg():
    """Glyphs as paths, so the icon looks the same without the font installed."""
    font = TTFont(str(PLAYFAIR))
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    units = font['head'].unitsPerEm
    size, font_size = 64, 64 * 0.56
    k = font_size / units
    names = [cmap[ord(c)] for c in 'Em']
    advance = sum(font['hmtx'][n][0] for n in names) * k
    ascent = font['OS/2'].sCapHeight * k
    x0, baseline = (size - advance) / 2, (size + ascent) / 2
    pen = SVGPathPen(glyphs)
    x = x0
    for n in names:
        glyphs[n].draw(TransformPen(pen, (k, 0, 0, -k, x, baseline)))
        x += font['hmtx'][n][0] * k
    stops = ''.join(
        f'<stop offset="{i / 2:.1f}" stop-color="#{r:02x}{g:02x}{b:02x}"/>' for i, (r, g, b) in enumerate(GRADIENT)
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">'
        f'<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0.7">{stops}</linearGradient></defs>'
        f'<rect width="{size}" height="{size}" rx="{size * 0.22:.1f}" fill="url(#g)"/>'
        f'<path fill="#080b1c" d="{pen.getCommands()}"/></svg>\n'
    )


# ---------- Social preview ----------

def stars(img, count, seed=20260918):
    """Pink dots from the same seeded generator idea as the site's star field."""
    state = seed
    def rand():
        nonlocal state
        state = (state * 1103515245 + 12345) & 0x7FFFFFFF
        return state / 0x7FFFFFFF
    draw = ImageDraw.Draw(img, 'RGBA')
    w, h = img.size
    for _ in range(count):
        x, y, r = rand() * w, rand() * h, 0.6 + rand() * 1.8
        draw.ellipse((x - r, y - r, x + r, y + r), fill=STAR + (round(60 + rand() * 150),))


def social_preview():
    W, H, S = 1200, 630, 2  # supersampled
    w, h = W * S, H * S
    img = Image.new('RGB', (w, h), NIGHT)

    glow = Image.new('RGB', (w, h), NIGHT)
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-w * 0.25, -h * 0.9, w * 0.55, h * 0.7), fill=(40, 22, 80))
    gd.ellipse((w * 0.62, h * 0.3, w * 1.25, h * 1.4), fill=(14, 40, 70))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(160 * S)), 0.9)
    stars(img, 420)
    draw = ImageDraw.Draw(img, 'RGBA')

    left = 80 * S
    # Eyebrow
    draw.text((left, 96 * S), 'SENIOR FULL-STACK SOFTWARE ENGINEER', font=ImageFont.truetype(str(MONO), 17 * S), fill=ACCENT)

    # Name with the brushstroke behind "Harley"
    serif = ImageFont.truetype(str(PLAYFAIR), 92 * S)
    name_y = 138 * S
    draw.text((left, name_y), 'Michael', font=serif, fill=SNOW)
    hx = left + draw.textlength('Michael ', font=serif)
    hb = draw.textbbox((hx, name_y), 'Harley', font=serif)
    brush = Image.open(ROOT / 'src/assets/brush.png').convert('RGBA')
    bw, bh = round((hb[2] - hb[0]) * 1.28), round((hb[3] - hb[1]) * 1.75)
    brush = brush.resize((bw, bh), Image.LANCZOS)
    img.paste(brush, (round((hb[0] + hb[2] - bw) / 2), round((hb[1] + hb[3] - bh) / 2 + 4 * S)), brush)
    draw = ImageDraw.Draw(img, 'RGBA')
    # Soft shadow under "Harley", like the site's text-shadow, so it reads on the brush.
    shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).text((hx, name_y + 3 * S), 'Harley', font=serif, fill=INK + (230,))
    shadow = shadow.filter(ImageFilter.GaussianBlur(5 * S))
    img.paste(shadow, (0, 0), shadow)
    draw = ImageDraw.Draw(img, 'RGBA')
    draw.text((hx, name_y), 'Harley', font=serif, fill=SNOW)

    # "Most people call me Em" with the gradient mark
    body = inter(30 * S, 450)
    line_y = 282 * S
    text = 'Most people call me '
    draw.text((left, line_y), text, font=body, fill=SNOW)
    mx = left + draw.textlength(text, font=body)
    em_font = inter(30 * S, 650)
    eb = [round(v) for v in draw.textbbox((mx + 10 * S, line_y), 'Em', font=em_font)]
    pad = 9 * S
    mark = gradient(eb[2] - eb[0] + 2 * pad, eb[3] - eb[1] + 2 * pad)
    img.paste(mark, (eb[0] - pad, eb[1] - pad), rounded_mask(mark.size, 7 * S))
    draw = ImageDraw.Draw(img, 'RGBA')
    draw.text((mx + 10 * S, line_y), 'Em', font=em_font, fill=INK)

    # Current role
    role_y = 350 * S
    draw.ellipse((left, role_y + 11 * S, left + 12 * S, role_y + 23 * S), fill=(94, 230, 168))
    draw.text((left + 24 * S, role_y), 'Pacific Fusion', font=inter(23 * S, 650), fill=SNOW)
    px = left + 24 * S + draw.textlength('Pacific Fusion', font=inter(23 * S, 650))
    draw.text((px, role_y), '  ·  Data systems for fusion hardware testing', font=inter(23 * S, 400), fill=MUTED)

    # Stack chips
    chip_font = ImageFont.truetype(str(MONO), 19 * S)
    cx, cy = left, 420 * S
    for label in ['Kafka', 'Go', 'Python', 'TypeScript']:
        tw = draw.textlength(label, font=chip_font)
        box = (cx, cy, cx + tw + 32 * S, cy + 44 * S)
        draw.rounded_rectangle(box, 22 * S, fill=ACCENT + (38,), outline=ACCENT + (170,), width=2 * S)
        draw.text((cx + 16 * S, cy + 10 * S), label, font=chip_font, fill=ACCENT)
        cx = box[2] + 12 * S

    draw.text((left, 540 * S), 'emharley.com', font=ImageFont.truetype(str(MONO), 22 * S), fill=MUTED)

    # Photo in a glowing frame on the right
    photo = Image.open(ROOT / 'src/assets/photos/dog.webp').convert('RGB')
    pw, ph = 320 * S, 400 * S
    photo = photo.resize((pw, ph), Image.LANCZOS)
    px0, py0 = w - pw - 80 * S, (h - ph) // 2
    halo = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(halo).rounded_rectangle((px0 - 10 * S, py0 + 20 * S, px0 + pw + 10 * S, py0 + ph + 30 * S), 30 * S, fill=(193, 118, 223, 120))
    img.paste(halo.filter(ImageFilter.GaussianBlur(40 * S)), (0, 0), halo.filter(ImageFilter.GaussianBlur(40 * S)))
    img.paste(photo, (px0, py0), rounded_mask((pw, ph), 26 * S))
    draw = ImageDraw.Draw(img, 'RGBA')
    draw.rounded_rectangle((px0, py0, px0 + pw, py0 + ph), 26 * S, outline=ACCENT + (120,), width=2 * S)

    return img.resize((W, H), Image.LANCZOS)


if __name__ == '__main__':
    (PUBLIC / 'favicon.svg').write_text(favicon_svg())
    favicon_png(32).save(PUBLIC / 'favicon-32x32.png')
    # Google Search wants icon sizes in multiples of 48px.
    favicon_png(96).save(PUBLIC / 'favicon-96x96.png')
    # For crawlers and tools that request /favicon.ico without reading the page.
    favicon_png(48).save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    favicon_png(180).convert('RGB').save(PUBLIC / 'apple-touch-icon.png')  # iOS rounds the corners itself
    social_preview().save(PUBLIC / 'social-preview.png', optimize=True)
    for f in ['favicon.svg', 'favicon.ico', 'favicon-32x32.png', 'favicon-96x96.png', 'apple-touch-icon.png', 'social-preview.png']:
        print(f, (PUBLIC / f).stat().st_size // 1024, 'kB')
