#!/usr/bin/env python3
"""Claude Code hook. Reads hook JSON on stdin.

- PostToolUse (Edit/Write/MultiEdit): if docs/TASKS.md changed, regenerate docs/PROGRESS.md.
- SessionStart: print a short task summary into the session context.
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SCRIPT = ROOT / "scripts" / "task_progress.py"

try:
    data = json.load(sys.stdin)
except Exception:
    data = {}

event = data.get("hook_event_name", "")
if event == "SessionStart":
    subprocess.run([sys.executable, str(SCRIPT), "--summary"])
else:
    path = (data.get("tool_input") or {}).get("file_path", "")
    if path.endswith("docs/TASKS.md"):
        subprocess.run([sys.executable, str(SCRIPT)])
