with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

import re
for m in re.finditer(r"([^\n]*viewMode[^\n]*)", text, re.IGNORECASE):
    print(m.group(0).strip())
