with open("Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find('class="couple-avatar-glow"')
print(text[idx-100:idx+400])
