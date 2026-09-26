import sys
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['Dinesh_Kayathri_Wedding_Invitation_Final (1).html', 'wedding-invitation-preview.html', 'Dinesh_Kayathri_Wedding_Invitation_Final.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()
    assert 'Emailed directly to' not in html, f'Found in {fname}'
    assert '<div class="wish-email-note"' not in html, f'Div found in {fname}'
    assert "targetEmail = 'kalaidinesh1999@gmail.com'" in html, f'Email logic missing in {fname}'
    print(f'[PASS] {fname}: Note completely removed from UI, background email dispatch intact!')
