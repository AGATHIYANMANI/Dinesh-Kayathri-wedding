import json

tp = r"C:\Users\shanm\.gemini\antigravity-ide\brain\5b7472f1-8db7-4b8a-9665-4fdd6196ced5\.system_generated\logs\transcript_full.jsonl"
with open(tp, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i == 361:
            d = json.loads(line)
            print("Step keys:", list(d.keys()))
            tc = d.get('tool_calls', [])
            if tc:
                print("tc[0]:", json.dumps(tc[0], indent=2)[:500])
