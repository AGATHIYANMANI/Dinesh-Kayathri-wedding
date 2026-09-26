import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'<section class="slide-section" id="slide-2".*?</section>', text, re.DOTALL)
if m:
    s3 = m.group(0)
    svgs = re.findall(r'<svg[^>]*>.*?</svg>', s3, re.DOTALL)
    print(f'Total SVGs on Slide 3: {len(svgs)}')
    for i, s in enumerate(svgs):
        print(f'SVG {i+1}: {s.strip()[:120]}...')
