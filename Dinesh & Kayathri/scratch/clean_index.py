with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

# Replace the 174675 base64 with assets/invitation/printed-card-outer.jpg
# Replace the 305307 base64 with assets/invitation/printed-card-inner.jpg
import re

for m in set(re.findall(r'data:image/[^;]+;base64,[A-Za-z0-9+/=]+', text)):
    if len(m) == 174675:
        text = text.replace(m, 'assets/invitation/printed-card-outer.jpg')
    elif len(m) == 305307:
        text = text.replace(m, 'assets/invitation/printed-card-inner.jpg')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(text)

import os
print("Clean index.html size:", os.path.getsize("index.html"), "bytes")
