import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'<form id="wishesForm".*?</form>', text, re.DOTALL)
if m:
    print("=== wishesForm in index.html ===")
    print(m.group(0))

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

m2 = re.search(r'(?:wishesForm|handleWish|submitWish|sendWish).*?(?=\n\nfunction|\n\n/\*|\Z)', js, re.DOTALL)
if m2:
    print("\n=== wishes handling in script.js ===")
    print(m2.group(0)[:2000])

# Also check for addEventListener on wishesForm
for line in js.splitlines():
    if 'wishesForm' in line or 'wishAuthorName' in line:
        print("JS line:", line)
