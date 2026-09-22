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
SERIF = FONTS / 'shrikhand/files/shrikhand-latin-400-normal.woff'
SANS = ROOT / 'node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2'
MONO = FONTS / 'dm-mono/files/dm-mono-latin-500-normal.woff'
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
    font = ImageFont.truetype(str(SANS), size)
    font.set_variation_by_axes([weight])
    return font


def rounded_mask(size, radius):
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius, fill=255)
    return mask


# ---------- Favicon: the nav's "Em" on the night sky, underlined by the name-highlight gradient ----------

# Shared proportions (fractions of the icon's size), so the PNG and SVG match.
LETTERS = 0.54  # font size
LIFT = 0.07  # letters sit above center to make room for the stroke
STROKE_W, STROKE_H, STROKE_GAP = 0.62, 0.075, 0.07
RADIUS = 0.22
EDGE = (40, 38, 72)  # a faint border so the tile holds its shape on dark tab bars


def favicon_png(size, touch=False):
    """touch: a full-bleed square for iOS, which rounds the corners itself."""
    scale = 4  # draw large, then downsample for smooth edges
    s = size * scale
    tile = Image.new('RGB', (s, s), NIGHT)
    draw = ImageDraw.Draw(tile)
    if not touch:
        draw.rounded_rectangle((0, 0, s - 1, s - 1), round(s * RADIUS), outline=EDGE, width=max(scale, round(s * 0.03)))
    font = ImageFont.truetype(str(SERIF), round(s * LETTERS))
    box = draw.textbbox((0, 0), 'Em', font=font)
    x = (s - (box[2] - box[0])) / 2 - box[0]
    y = (s - (box[3] - box[1])) / 2 - box[1] - s * LIFT
    draw.text((x, y), 'Em', font=font, fill=SNOW)
    sw, sh = round(s * STROKE_W), round(s * STROKE_H)
    stroke = gradient(sw, sh)
    top = round(y + box[3] + s * STROKE_GAP)
    tile.paste(stroke, ((s - sw) // 2, top), rounded_mask((sw, sh), sh // 2))
    if touch:
        return tile.resize((size, size), Image.LANCZOS)
    icon = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    icon.paste(tile, (0, 0), rounded_mask((s, s), round(s * RADIUS)))
    return icon.resize((size, size), Image.LANCZOS)


def favicon_svg():
    """Glyphs as paths, so the icon looks the same without the font installed."""
    font = TTFont(str(SERIF))
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    units = font['head'].unitsPerEm
    size = 64
    k = size * LETTERS / units
    names = [cmap[ord(c)] for c in 'Em']
    advance = sum(font['hmtx'][n][0] for n in names) * k
    ascent = font['OS/2'].sCapHeight * k
    x0, baseline = (size - advance) / 2, (size + ascent) / 2 - size * LIFT
    pen = SVGPathPen(glyphs)
    x = x0
    for n in names:
        glyphs[n].draw(TransformPen(pen, (k, 0, 0, -k, x, baseline)))
        x += font['hmtx'][n][0] * k
    hex_color = lambda rgb: '#%02x%02x%02x' % rgb
    stops = ''.join(f'<stop offset="{i / 2:.1f}" stop-color="{hex_color(c)}"/>' for i, c in enumerate(GRADIENT))
    sw, sh = size * STROKE_W, size * STROKE_H
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">'
        f'<defs><linearGradient id="g">{stops}</linearGradient></defs>'
        f'<rect x="1" y="1" width="{size - 2}" height="{size - 2}" rx="{size * RADIUS:.1f}" '
        f'fill="{hex_color(NIGHT)}" stroke="{hex_color(EDGE)}" stroke-width="2"/>'
        f'<path fill="{hex_color(SNOW)}" d="{pen.getCommands()}"/>'
        f'<rect x="{(size - sw) / 2:.2f}" y="{baseline + size * STROKE_GAP:.2f}" width="{sw:.2f}" height="{sh:.2f}" '
        f'rx="{sh / 2:.2f}" fill="url(#g)"/></svg>\n'
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
    # Flat night sky with stars, like the site: no colored glows.
    img = Image.new('RGB', (w, h), NIGHT)
    stars(img, 420)
    draw = ImageDraw.Draw(img, 'RGBA')

    left = 80 * S
    # Name with the brushstroke behind "Harley"
    serif = ImageFont.truetype(str(SERIF), 80 * S)
    name_y = 100 * S
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

    # The role reads as a sentence under the name, as in the site's hero.
    draw.text((left, 222 * S), 'Senior Full-Stack Software Engineer in San Francisco', font=inter(25 * S, 400), fill=MUTED)

    # "Most people call me Em" with the gradient mark
    body = inter(30 * S, 450)
    line_y = 286 * S
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

    # Photo on the right with the site's thin cyan frame
    photo = Image.open(ROOT / 'src/assets/photos/dog.webp').convert('RGB')
    pw, ph = 320 * S, 400 * S
    photo = photo.resize((pw, ph), Image.LANCZOS)
    px0, py0 = w - pw - 80 * S, (h - ph) // 2
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
    favicon_png(180, touch=True).save(PUBLIC / 'apple-touch-icon.png')
    social_preview().save(PUBLIC / 'social-preview.png', optimize=True)
    for f in ['favicon.svg', 'favicon.ico', 'favicon-32x32.png', 'favicon-96x96.png', 'apple-touch-icon.png', 'social-preview.png']:
        print(f, (PUBLIC / f).stat().st_size // 1024, 'kB')
