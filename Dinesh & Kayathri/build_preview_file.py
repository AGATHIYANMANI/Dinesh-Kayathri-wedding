import os
import base64

def get_base64_image(rel_path):
    abs_path = os.path.join(os.getcwd(), rel_path)
    if not os.path.exists(abs_path):
        print(f"Warning: {abs_path} not found!")
        return ""
    with open(abs_path, "rb") as f:
        data = f.read()
    ext = os.path.splitext(rel_path)[1].lower().replace('.', '')
    mime = "image/jpeg" if ext in ["jpg", "jpeg"] else f"image/{ext}"
    b64 = base64.b64encode(data).decode('utf-8')
    return f"data:{mime};base64,{b64}"

print("Reading source files...")
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

def get_base64_audio(rel_path):
    abs_path = os.path.join(os.getcwd(), rel_path)
    if not os.path.exists(abs_path):
        print(f"Warning: {abs_path} not found!")
        return ""
    with open(abs_path, "rb") as f:
        data = f.read()
    b64 = base64.b64encode(data).decode('utf-8')
    return f"data:audio/mp3;base64,{b64}"

# Map and inline images
images = {
    "assets/invitation/envelope-backdrop.jpg": get_base64_image("assets/invitation/envelope-backdrop.jpg"),
    "assets/invitation/couple-portrait.jpg": get_base64_image("assets/invitation/couple-portrait.jpg"),
    "assets/invitation/printed-card-outer.jpg": get_base64_image("assets/invitation/printed-card-outer.jpg"),
    "assets/invitation/printed-card-inner.jpg": get_base64_image("assets/invitation/printed-card-inner.jpg")
}

for path, b64 in images.items():
    if b64:
        print(f"Inlining {path} ({len(b64)} chars base64)")
        html = html.replace(path, b64)

# Inline Audio
audio_path = "audio/whatsapp-audio-2026-09-25-at-111933-pm_rhyy3XTS.mp3"
audio_b64 = get_base64_audio(audio_path)
if audio_b64:
    print(f"Inlining audio {audio_path} ({len(audio_b64)} chars base64)")
    html = html.replace(audio_path, audio_b64)

# 1. Inline CSS: replace <link rel="stylesheet" href="styles.css"> with <style>...</style>
css_tag = f'<style>\n{css}\n</style>'
link_tag = '<link rel="stylesheet" href="styles.css">'
if link_tag in html:
    html = html.replace(link_tag, css_tag)
else:
    idx = html.find('href="styles.css"')
    start = html.rfind('<link', 0, idx)
    end = html.find('>', idx) + 1
    html = html[:start] + css_tag + html[end:]

# 2. Inline JS: replace <script src="script.js"></script> with <script>...</script>
script_tag = f'<script>\n{js}\n</script>'
script_ref = '<script src="script.js"></script>'
if script_ref in html:
    html = html.replace(script_ref, script_tag)
else:
    idx = html.find('src="script.js"')
    start = html.rfind('<script', 0, idx)
    end = html.find('</script>', idx) + 9
    html = html[:start] + script_tag + html[end:]

# Save Standalone Preview File
output_preview = "Dinesh_Kayathri_Wedding_Invitation_Preview.html"
with open(output_preview, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Generated standalone preview file: {output_preview}")
print(f"File size: {os.path.getsize(output_preview)} bytes ({os.path.getsize(output_preview)/1024:.1f} KB)")

# Also create wedding-invitation-preview.html as easy alias
with open("wedding-invitation-preview.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Generated alias: wedding-invitation-preview.html")

# Create clean standalone version without preview banner for final distribution
final_file_1 = "Dinesh_Kayathri_Wedding_Invitation_Final (1).html"
clean_file = "Dinesh_Kayathri_Wedding_Invitation_Final.html"

final_html = html.replace('id="previewFeedbackBanner"', 'id="previewFeedbackBanner" style="display:none;"') \
                 .replace('id="previewFloatingTrigger"', 'id="previewFloatingTrigger" style="display:none;"')

with open(final_file_1, "w", encoding="utf-8") as f:
    f.write(final_html)
print(f"Generated target user file: {final_file_1} ({os.path.getsize(final_file_1)/1024:.1f} KB)")

with open(clean_file, "w", encoding="utf-8") as f:
    f.write(final_html)
print(f"Generated final guest distribution file: {clean_file}")
