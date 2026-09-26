import re

with open('Dinesh_Kayathri_Wedding_Invitation_Final (1).html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Length:', len(text))

# Find pages / slides
pages = re.findall(r'(<div[^>]*class="[^"]*(?:page|slide|section)[^"]*"[^>]*>)', text, re.I)
print('Pages/slides elements:', pages[:10])

# Look for page 3
matches = [m.start() for m in re.finditer(r'class="[^"]*page[^"]*"', text, re.I)]
print(f'Total page class matches: {len(matches)}')

# Search for icons in the third page or ceremony
for i, m in enumerate(re.finditer(r'<!--\s*(?:PAGE|SLIDE)\s*3|page-3|slide-3|Ceremony|Muhurtham', text, re.I)):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 500)
    print(f'--- Match {i} ---')
    print(text[start:end])
