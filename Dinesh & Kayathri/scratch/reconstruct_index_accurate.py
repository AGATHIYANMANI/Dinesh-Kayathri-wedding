with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

# Replace style
style_s = text.find('<style>')
style_e = text.find('</style>') + 8
html_base = text[:style_s] + '<link rel="stylesheet" href="styles.css">' + text[style_e:]

# Replace script
script_s = html_base.find('<script>')
script_e = html_base.find('</script>') + 9
html_base = html_base[:script_s] + '<script src="script.js"></script>' + html_base[script_e:]

# Replace envelope backdrop base64
idx_env = html_base.find('class="envelope-backdrop-img"')
idx_bg_s = html_base.find('url(\'', idx_env) + 5
idx_bg_e = html_base.find('\')', idx_bg_s)
html_base = html_base[:idx_bg_s] + 'assets/invitation/envelope-backdrop.jpg' + html_base[idx_bg_e:]

# Replace watermark base64
idx_wm = html_base.find('class="env-photo-watermark"')
idx_wm_s = html_base.find('url(\'', idx_wm) + 5
idx_wm_e = html_base.find('\')', idx_wm_s)
html_base = html_base[:idx_wm_s] + 'assets/invitation/envelope-backdrop.jpg' + html_base[idx_wm_e:]

# Replace couple avatar base64
idx_av = html_base.find('class="couple-avatar-glow"')
idx_av_s = html_base.find('src="', idx_av) + 5
idx_av_e = html_base.find('"', idx_av_s)
html_base = html_base[:idx_av_s] + 'assets/invitation/couple-portrait.jpg' + html_base[idx_av_e:]

# Replace printed card outer
idx_c0 = html_base.find('id="printedCardImg0"')
idx_c0_s = html_base.rfind('src="', 0, idx_c0) + 5
idx_c0_e = html_base.find('"', idx_c0_s)
html_base = html_base[:idx_c0_s] + 'assets/invitation/printed-card-outer.jpg' + html_base[idx_c0_e:]

# Replace printed card inner
idx_c1 = html_base.find('id="printedCardImg1"')
idx_c1_s = html_base.rfind('src="', 0, idx_c1) + 5
idx_c1_e = html_base.find('"', idx_c1_s)
html_base = html_base[:idx_c1_s] + 'assets/invitation/printed-card-inner.jpg' + html_base[idx_c1_e:]

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_base)

print(f"✓ Created clean index.html ({len(html_base)} characters)")
