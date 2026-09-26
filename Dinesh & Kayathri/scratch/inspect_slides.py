with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

import re
slides = list(re.finditer(r'<section[^>]*class="[^"]*slide-section[^"]*"[^>]*>', text))
print("Slides found:", len(slides))

for i in range(len(slides)):
    start = slides[i].start()
    end = slides[i+1].start() if i+1 < len(slides) else text.find('</main>', start)
    slide_content = text[start:end]
    print(f"\n==================== SLIDE {i+1} ====================")
    # Print headings or ids
    for line in slide_content.splitlines():
        if any(tag in line for tag in ['<h1', '<h2', '<h3', '<h4', 'id=', 'class="event-', 'class="timeline', 'class="icon', '<svg']):
            print("  ", line.strip()[:100])
