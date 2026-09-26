import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    html = f.read()

print("CSS checks in Final (1).html:")
print("  has .heart-3d-particle?", ".heart-3d-particle" in html)
print("  has @keyframes heartFall3D?", "heartFall3D" in html)
print("  has @keyframes heartTumble3D?", "heartTumble3D" in html)

print("\nJS checks in Final (1).html:")
print("  has 3D heartThemes in initParticleRain?", "heartThemes" in html)
print("  has heart-3d-particle in initParticleRain?", "heart-3d-particle" in html)
