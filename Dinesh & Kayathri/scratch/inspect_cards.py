import re

with open('Dinesh_Kayathri_Wedding_Invitation_Final (1).html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all event-icon-circle occurrences and surrounding HTML
matches = list(re.finditer(r'<div class="event-icon-circle">.*?</div>', text, re.DOTALL))
print(f"Total event-icon-circle found: {len(matches)}")

for i, m in enumerate(matches):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 250)
    print(f"\n--- Icon {i+1} ---")
    snippet = text[start:end]
    print(snippet.strip())
