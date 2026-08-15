#!/usr/bin/env python3
"""Build five four-theme contact sheets from the V5.7 browser captures."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


VIEWPORTS = (
    ("iphone390", "390 × 844"),
    ("iphone430", "430 × 932"),
    ("tablet768", "768 × 1024"),
    ("desktop1280", "1280 × 800"),
    ("desktop1440", "1440 × 900"),
)
THEMES = (
    ("original", "ORIGINAL"),
    ("aurora", "AURORA"),
    ("sunset", "SUNSET"),
    ("jade", "NOCTURNE"),
)


def font(size: int) -> ImageFont.ImageFont:
    candidates = (
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    )
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def build_sheet(source: Path, output: Path, viewport: str, dimensions: str) -> None:
    images = []
    target_height = 720 if viewport.startswith("iphone") else 540
    for theme, label in THEMES:
        path = source / f"{viewport}-{theme}-home.png"
        if not path.exists():
            raise FileNotFoundError(path)
        image = Image.open(path).convert("RGB")
        width = round(image.width * target_height / image.height)
        images.append((label, image.resize((width, target_height), Image.Resampling.LANCZOS)))

    gap, margin, header, label_height = 20, 28, 66, 30
    columns = 4 if viewport.startswith("iphone") else 2
    rows = (len(images) + columns - 1) // columns
    cell_width = max(image.width for _, image in images)
    width = margin * 2 + columns * cell_width + gap * (columns - 1)
    height = margin * 2 + header + rows * (label_height + target_height) + gap * (rows - 1)
    board = Image.new("RGB", (width, height), "#070b14")
    draw = ImageDraw.Draw(board)
    title_font, label_font = font(30), font(18)
    draw.text((margin, 18), f"V5.7 · {dimensions} · HOME / CURRENT LESSON", fill="#f6f8ff", font=title_font)

    for index, (label, image) in enumerate(images):
        column, row = index % columns, index // columns
        x = margin + column * (cell_width + gap)
        y = margin + header + row * (label_height + target_height + gap)
        draw.text((x, y), label, fill="#a9c8ff", font=label_font)
        board.paste(image, (x, y + label_height))

    output.mkdir(parents=True, exist_ok=True)
    board.save(output / f"{viewport}-review.png", optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    for viewport, dimensions in VIEWPORTS:
        build_sheet(args.input, args.output, viewport, dimensions)


if __name__ == "__main__":
    main()
