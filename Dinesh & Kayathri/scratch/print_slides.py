import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
s3_match = re.search(r'(<!--\s*==+\s*SLIDE 3.*?<!--\s*==+\s*SLIDE 4)', text, re.DOTALL)
if s3_match:
    print("=== SLIDE 3 IN index.html ===")
    print(s3_match.group(1))

s4_match = re.search(r'(<!--\s*==+\s*SLIDE 4.*?<!--\s*==+\s*SLIDE 5)', text, re.DOTALL)
if s4_match:
    print("=== SLIDE 4 IN index.html ===")
    print(s4_match.group(1))
