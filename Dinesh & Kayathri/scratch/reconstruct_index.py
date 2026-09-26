import re

with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

# Replace <style>...</style> with <link rel="stylesheet" href="styles.css">
style_s = text.find('<style>')
style_e = text.find('</style>') + 8
html_base = text[:style_s] + '<link rel="stylesheet" href="styles.css">' + text[style_e:]

# Replace <script>...</script> with <script src="script.js"></script>
script_s = html_base.find('<script>')
script_e = html_base.find('</script>') + 9
html_base = html_base[:script_s] + '<script src="script.js"></script>' + html_base[script_e:]

# Replace base64 images with relative paths
html_base = re.sub(r'data:image/[^;]+;base64,[A-Za-z0-9+/=]+', 'assets/invitation/couple-portrait.jpg', html_base)

# Specifically fix the known image slots
html_base = html_base.replace("url('assets/invitation/couple-portrait.jpg')", "url('assets/invitation/envelope-backdrop.jpg')")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_base)

print(f"✓ Created index.html ({len(html_base)} characters)")
