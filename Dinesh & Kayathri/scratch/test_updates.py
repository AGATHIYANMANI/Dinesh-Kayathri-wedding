import base64
import os
import re

# 1. Prepare new couple portrait base64
avatar_path = "assets/invitation/couple-portrait-perfect.jpg"
with open(avatar_path, "rb") as f:
    avatar_b64 = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")

print(f"New avatar image base64 length: {len(avatar_b64)}")

# 2. Read Dinesh_Kayathri_Wedding_Invitation_Final (1).html
target = r"Dinesh_Kayathri_Wedding_Invitation_Final (1).html"
with open(target, "r", encoding="utf-8") as f:
    html = f.read()

print(f"Original HTML length: {len(html)}")

# Check 1: Avatar image replacement
m_avatar = re.search(r'(<div class="couple-avatar-glow">\s*<img\s+src=")(data:image/[^;]+;base64,[^"]+)(")', html)
if m_avatar:
    print("Found couple avatar image in HTML!")
    print("Old avatar base64 length:", len(m_avatar.group(2)))
else:
    print("WARNING: Could not find couple-avatar-glow img!")

# Check 2: Top button removal
m_btn = re.search(r'<!-- View Mode Toggle[^>]*-->\s*<button[^>]*id="viewModeBtn"[^>]*>.*?</button>', html, re.DOTALL)
if m_btn:
    print("Found viewModeBtn in HTML!")
    print(m_btn.group(0)[:150])
else:
    print("WARNING: Could not find viewModeBtn!")

# Check 3: Particle rain function in script
m_rain = re.search(r'function initParticleRain\(\)\s*\{.*?function initEnvelopeDust', html, re.DOTALL)
if m_rain:
    print("Found initParticleRain() in HTML script!")
else:
    print("WARNING: Could not find initParticleRain()!")
