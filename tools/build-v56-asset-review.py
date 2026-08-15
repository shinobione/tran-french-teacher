from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PREMIUM = ROOT / "assets" / "premium"
THEMES = PREMIUM / "themes"
THEME_NAMES = ("original", "aurora", "sunset", "nocturne")


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    family = "arialbd.ttf" if bold else "arial.ttf"
    return ImageFont.truetype(family, size)


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    copy = image.copy()
    copy.thumbnail(size, Image.Resampling.LANCZOS)
    return copy


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def add_label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, color: str) -> None:
    draw.text(xy, text, fill=color, font=font(25, bold=True))


def build_background_board() -> None:
    board = Image.new("RGB", (1900, 1200), "#080b14")
    draw = ImageDraw.Draw(board)
    draw.text((70, 48), "V5.6 — BACKGROUND REVIEW", fill="white", font=font(48, bold=True))
    draw.text(
        (72, 110),
        "Original v2 candidate beside the three user-locked identities",
        fill="#aeb9d0",
        font=font(25),
    )

    entries = [
        ("ORIGINAL · NEW V2", THEMES / "original" / "background-v2.png", "#7bdcff"),
        ("AURORA · LOCKED", THEMES / "aurora" / "background.webp", "#cf78ff"),
        ("SUNSET · LOCKED", THEMES / "sunset" / "background.webp", "#ff9f6e"),
        ("NOCTURNE · LOCKED", THEMES / "nocturne" / "background.webp", "#79d8b1"),
    ]
    panel_size = (390, 844)
    gap = 44
    x0 = 70
    y = 220
    for index, (label, path, color) in enumerate(entries):
        x = x0 + index * (panel_size[0] + gap)
        image = cover(Image.open(path).convert("RGB"), panel_size)
        board.paste(image, (x, y))
        draw.rounded_rectangle(
            (x - 2, y - 2, x + panel_size[0] + 2, y + panel_size[1] + 2),
            radius=28,
            outline=color,
            width=4,
        )
        add_label(draw, (x, y - 46), label, color)

    draw.text(
        (72, 1110),
        "Gate: approve the new dark Original identity before any runtime wiring.",
        fill="#dbe4f8",
        font=font(24),
    )
    board.save(PREMIUM / "v5.6-background-review.png", optimize=True)


def checker(size: tuple[int, int], a: str = "#182033", b: str = "#26314a") -> Image.Image:
    image = Image.new("RGB", size, a)
    draw = ImageDraw.Draw(image)
    block = 24
    for y in range(0, size[1], block):
        for x in range(0, size[0], block):
            if (x // block + y // block) % 2:
                draw.rectangle((x, y, x + block - 1, y + block - 1), fill=b)
    return image


def card_preview(theme: str, color: str, accent: str) -> Image.Image:
    card = Image.new("RGBA", (450, 430), color)
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((2, 2, 447, 427), radius=34, outline=accent, width=3)
    draw.ellipse((24, 26, 66, 68), fill=accent)
    draw.text((82, 28), "LEÇON", fill="#f6f8ff", font=font(22, bold=True))
    draw.rounded_rectangle((28, 104, 210, 126), radius=11, fill="#f7f8ff")
    draw.rounded_rectangle((28, 142, 174, 158), radius=8, fill="#aeb9cf")
    draw.rounded_rectangle((28, 326, 196, 382), radius=26, fill=accent)
    draw.text((73, 341), "CONTINUER", fill="#07111f", font=font(18, bold=True))

    art = Image.open(THEMES / theme / "lesson-eiffel-v2.png").convert("RGBA")
    bbox = art.getchannel("A").getbbox()
    art = art.crop(bbox)
    art.thumbnail((300, 390), Image.Resampling.LANCZOS)
    card.alpha_composite(art, (450 - art.width + 4, 430 - art.height + 10))
    return card


def validate_candidates() -> None:
    background = Image.open(THEMES / "original" / "background-v2.png")
    if background.size != (864, 1821):
        raise ValueError(f"Unexpected Original background size: {background.size}")

    for theme in THEME_NAMES:
        path = THEMES / theme / "lesson-eiffel-v2.png"
        image = Image.open(path)
        if image.mode != "RGBA" or image.size != (1254, 1254):
            raise ValueError(f"{path} must be a 1254×1254 RGBA image")
        alpha = image.getchannel("A")
        if alpha.getextrema() != (0, 255):
            raise ValueError(f"{path} must contain both transparent and opaque pixels")
        histogram = alpha.histogram()
        transparent_ratio = histogram[0] / (image.width * image.height)
        if transparent_ratio < 0.5:
            raise ValueError(f"{path} lacks the required transparent margins")


def build_lesson_board() -> None:
    board = Image.new("RGB", (2200, 1450), "#080b14")
    draw = ImageDraw.Draw(board)
    draw.text((70, 46), "V5.6 — LESSON EIFFEL REVIEW", fill="white", font=font(48, bold=True))
    draw.text(
        (72, 108),
        "Top: rejected opaque thumbnails · Bottom: new alpha assets in a neutral card preview",
        fill="#aeb9d0",
        font=font(25),
    )

    entries = [
        ("ORIGINAL", "original", "#111a2c", "#70c8ff"),
        ("AURORA", "aurora", "#15112c", "#c678ff"),
        ("SUNSET", "sunset", "#2b1725", "#ff9a62"),
        ("NOCTURNE", "nocturne", "#0c201d", "#8bd6a9"),
    ]
    x0 = 70
    col_w = 500
    for index, (label, theme, card_color, accent) in enumerate(entries):
        x = x0 + index * 530
        add_label(draw, (x, 190), label, accent)

        rejected = contain(Image.open(THEMES / theme / "lesson-eiffel.webp").convert("RGB"), (450, 320))
        rejected_bg = Image.new("RGB", (450, 320), "#111522")
        rejected_bg.paste(rejected, ((450 - rejected.width) // 2, (320 - rejected.height) // 2))
        board.paste(rejected_bg, (x, 240))
        draw.rounded_rectangle((x, 240, x + 450, 560), radius=26, outline="#a14b55", width=3)
        draw.text((x + 16, 574), "REJECTED V1 · opaque scene", fill="#ef8a94", font=font(21, bold=True))

        alpha_bg = checker((450, 160))
        alpha = Image.open(THEMES / theme / "lesson-eiffel-v2.png").convert("RGBA")
        bbox = alpha.getchannel("A").getbbox()
        alpha = alpha.crop(bbox)
        alpha.thumbnail((270, 150), Image.Resampling.LANCZOS)
        alpha_bg.paste(alpha, ((450 - alpha.width) // 2, 160 - alpha.height), alpha)
        board.paste(alpha_bg, (x, 636))
        draw.text((x + 16, 810), "ALPHA CHECK", fill="#b8c5df", font=font(18, bold=True))

        preview = card_preview(theme, card_color, accent)
        board.paste(preview, (x, 854), preview)
        draw.text((x + 16, 1302), "NEW V2 · composition preview", fill=accent, font=font(21, bold=True))

    draw.text(
        (72, 1384),
        "Preview only — no asset is wired into the runtime before human approval.",
        fill="#dbe4f8",
        font=font(24),
    )
    board.save(PREMIUM / "v5.6-lesson-eiffel-review.png", optimize=True)


if __name__ == "__main__":
    validate_candidates()
    build_background_board()
    build_lesson_board()
