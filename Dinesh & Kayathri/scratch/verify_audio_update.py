import os

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

assert 'function startAudio' in js, "startAudio missing"
assert 'function pauseAudio' in js, "pauseAudio missing"
assert 'function toggleAudio' in js, "toggleAudio missing"
assert 'function initAudio' in js, "initAudio missing"
assert 'playTempleChime' not in js, "playTempleChime still in js"
assert 'dom.weddingAudio' in js, "dom.weddingAudio missing"
print("All script.js assertions passed!")

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

assert 'id="weddingAudio"' in html, "weddingAudio tag missing in index.html"
assert 'data-tip="Play Wedding Music"' in html, "data-tip missing"
assert 'Temple Chime' not in html, "Temple Chime still in index.html"
print("All index.html assertions passed!")

with open('Dinesh_Kayathri_Wedding_Invitation_Final.html', 'r', encoding='utf-8') as f:
    final = f.read()

assert 'id="weddingAudio"' in final, "weddingAudio missing in final"
assert 'data:audio/mp3;base64,' in final, "base64 audio missing in final"
print("All final file assertions passed!")
