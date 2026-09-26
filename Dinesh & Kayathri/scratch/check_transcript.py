import json

transcript_path = r"C:\Users\shanm\.gemini\antigravity-ide\brain\5b7472f1-8db7-4b8a-9665-4fdd6196ced5\.system_generated\logs\transcript.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'PLANNER_RESPONSE':
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                fn = tc.get('function', {}).get('name')
                args = tc.get('function', {}).get('arguments', {})
                if 'file' in str(fn):
                    print(fn, args.get('TargetFile'))
