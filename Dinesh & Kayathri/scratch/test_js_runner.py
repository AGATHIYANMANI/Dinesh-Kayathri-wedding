with open(r"Dinesh_Kayathri_Wedding_Invitation_Final (1).html", "r", encoding="utf-8") as f:
    text = f.read()

idx_s = text.find('<script>')
idx_e = text.find('</script>')
js_code = text[idx_s+8:idx_e]

# Wrap in dummy DOM mocks to test full execution
mock = """
const window = { addEventListener: () => {} };
const document = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ style: {}, appendChild: () => {}, classList: { add: () => {} } }),
  body: { appendChild: () => {}, classList: { add: () => {} } }
};
"""
with open("scratch/test_js.js", "w", encoding="utf-8") as f:
    f.write(mock + js_code)
