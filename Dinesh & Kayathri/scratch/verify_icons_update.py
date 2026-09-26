import re

with open('Dinesh_Kayathri_Wedding_Invitation_Final (1).html', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"Total length: {len(text)}")

# Check for presence of new icons
checks = [
    ("Temple Kalasam / Gopuram in Ceremony Venue", "M9.5 21.5v-3.5a2.5 2.5 0 0 1 5 0v3.5" in text),
    ("Vedic Calendar in Ceremony Date", "M13.7 16.7l.8.8" in text),
    ("Brahma Muhurtham Dawn Dial in Ceremony Time", "polyline points=\"12 6.5 12 12 15.5 14.5\"" in text),
    ("Grand Reception Palace / Mandapam Venue", "M10 21.5v-4.5a2 2 0 0 1 4 0v4.5" in text),
    ("Reception Date Calendar Star", "M12 11.5l.9 2 2.1.3" in text),
    ("Reception Evening Gala Time", "M17 7a3 3 0 0 1-2.5 2.5 3 3 0 0 0 2.5-2.5z" in text),
    ("Old stacked layers icon removed", "M12 2L2 7l10 5-10-5-10-5z" not in text),
    ("Old generic house icon removed", "M3 9l9-7 9 7v11" not in text),
    ("3D Falling hearts engine present", "Heart3D" in text and "create3DHeartMesh" in text),
    ("Couple portrait avatar present", "avatar-circle" in text)
]

all_passed = True
for name, passed in checks:
    status = "PASS" if passed else "FAIL"
    print(f"[{status}] {name}")
    if not passed:
        all_passed = False

if all_passed:
    print("\nALL VERIFICATION CHECKS PASSED PERFECTLY!")
else:
    print("\nSOME CHECKS FAILED!")
