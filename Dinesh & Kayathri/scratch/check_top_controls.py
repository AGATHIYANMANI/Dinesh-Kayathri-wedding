with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find('class="top-controls"')
print(text[idx-50:idx+900])
