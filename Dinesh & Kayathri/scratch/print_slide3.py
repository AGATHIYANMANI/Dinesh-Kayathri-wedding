import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

idx1 = text.find('id="slide-2"')
idx2 = text.find('id="slide-3"')
print(text[idx1:idx2])
