"""Regenerate the original six-second sculpture loop. Requires Pillow and ffmpeg."""
import math
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw

size, fps, seconds = 720, 24, 6
output = Path(__file__).with_name('knot-source.mp4')
encoder = subprocess.Popen([
    'ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
    '-s', f'{size}x{size}', '-r', str(fps), '-i', '-', '-an', '-c:v', 'libx264',
    '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output),
], stdin=subprocess.PIPE)
try:
    for frame in range(fps * seconds):
        angle = frame / (fps * seconds) * 2 * math.pi
        segments = []
        for i in range(900):
            t = i * 2 * math.pi / 900
            x = (2 + math.cos(3*t)) * math.cos(2*t)
            y = (2 + math.cos(3*t)) * math.sin(2*t)
            z = math.sin(3*t)
            xx = x * math.cos(angle) + z * math.sin(angle)
            zz = -x * math.sin(angle) + z * math.cos(angle)
            yy, depth = y * .65 - zz * .76, y * .76 + zz * .65
            shade = int(110 + 110 * (.5 + .5 * math.cos(t * 3 - 1 + angle)))
            segments.append((depth, xx, yy, shade))
        image = Image.new('RGB', (size, size), '#101110')
        draw = ImageDraw.Draw(image)
        for _, x, y, shade in sorted(segments):
            cx, cy, radius = size/2 + x*85.8, size/2 + y*85.8, 36.6
            draw.ellipse((cx-radius, cy-radius, cx+radius, cy+radius), fill=(shade, shade, shade-7))
        encoder.stdin.write(image.tobytes())
finally:
    encoder.stdin.close()
assert encoder.wait() == 0, 'Video encoding failed'
print(output)
