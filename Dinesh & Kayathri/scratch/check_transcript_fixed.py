import json

transcript_path = r"C:\Users\shanm\.gemini\antigravity-ide\brain\5b7472f1-8db7-4b8a-9665-4fdd6196ced5\.system_generated\logs\transcript.jsonl"
with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        data = json.loads(line)
        calls = data.get('tool_calls', [])
        if calls:
            names = [c.get('name') for c in calls]
            print(f"Line {i}: {names}")
            for c in calls:
                if 'replace' in str(c.get('name')):
                    args = c.get('arguments', {})
                    print("   File:", args.get('TargetFile'), args.get('Instruction'))
                elif 'write' in str(c.get('name')):
                    args = c.get('arguments', {})
                    print("   Write File:", args.get('TargetFile'))
