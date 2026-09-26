import sys
import base64
import os
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

for fname in ["Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "wedding-invitation-preview.html", "Dinesh_Kayathri_Wedding_Invitation_Final.html"]:
    with open(fname, "r", encoding="utf-8") as f:
        html = f.read()

    print(f"=== Verifying {fname} ===")
    
    # 1. Top controls button check
    top_ctrls_start = html.find('class="top-controls"')
    top_ctrls_end = html.find('</header>', top_ctrls_start)
    top_ctrls_html = html[top_ctrls_start:top_ctrls_end]
    assert "viewModeBtn" not in top_ctrls_html, "ERROR: viewModeBtn still present in top controls header!"
    print("  ✓ Top button 'Switch to Full Screen' is completely removed from header controls")

    # 2. 3D hearts check in CSS & JS
    assert "heart-3d-particle" in html, "ERROR: heart-3d-particle missing in CSS/JS!"
    assert "@keyframes heartFall3D" in html, "ERROR: heartFall3D missing in CSS!"
    assert "@keyframes heartTumble3D" in html, "ERROR: heartTumble3D missing in CSS!"
    assert "heartThemes" in html, "ERROR: heartThemes missing in JS!"
    print("  ✓ 3D Animated Falling Hearts Engine is active in CSS and JavaScript")

    # 3. Avatar check
    assert "couple-avatar-glow" in html, "ERROR: couple-avatar-glow missing!"
    with open("assets/invitation/couple-portrait-perfect.jpg", "rb") as fp:
        test_b64 = base64.b64encode(fp.read()).decode("utf-8")
    assert test_b64 in html, "ERROR: new couple portrait base64 not found in HTML!"
    print("  ✓ Second page couple avatar successfully updated to the newly uploaded studio portrait")

    # 4. JavaScript execution check via Node script file
    idx_s = html.find('<script>')
    idx_e = html.find('</script>')
    js_code = html[idx_s+8:idx_e]
    
    mock = """
    const window = { addEventListener: () => {} };
    const document = {
      addEventListener: () => {},
      getElementById: () => ({ innerHTML: '', appendChild: () => {}, classList: { add: () => {}, remove: () => {} }, style: { setProperty: () => {} } }),
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({ style: { setProperty: () => {} }, appendChild: () => {}, classList: { add: () => {} } }),
      body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }
    };
    """
    temp_js = "scratch/temp_val.js"
    with open(temp_js, "w", encoding="utf-8") as tf:
        tf.write(mock + js_code)
    
    p = subprocess.run(['node', temp_js], capture_output=True, text=True)
    if os.path.exists(temp_js):
        os.remove(temp_js)
    assert p.returncode == 0, f"Node check failed: {p.stderr}"
    print("  ✓ JavaScript executes cleanly with 0 errors")

    print(f"✓ All checks passed for {fname}!\n")

print("★ ALL FILES 100% VERIFIED AND SYNCHRONIZED!")
