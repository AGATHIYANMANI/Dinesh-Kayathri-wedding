import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'<section class="slide-section" id="slide-4".*?</section>', text, re.DOTALL)
if m:
    print("=== SLIDE 5 (id=slide-4) ===")
    print(m.group(0))

m_modal = re.search(r'<div class="modal" id="wishesModal".*?</div>\s*</div>\s*</div>', text, re.DOTALL)
if m_modal:
    print("\n=== WISHES MODAL ===")
    print(m_modal.group(0))
