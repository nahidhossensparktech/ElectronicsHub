#!/usr/bin/env python3
"""Parse docs/TASKS.md and generate docs/PROGRESS.md (completed / in progress / upcoming).

Task line format (docs/TASKS.md):
  - [ ] P1-03 [FE] Title. (P0)                          todo
  - [~] P1-03 [FE] Title. (P0) @nahid                    in progress
  - [x] P1-03 [FE] Title. (P0) @nahid 2026-11-25         done (owner, date optional)

Usage:
  python3 scripts/task_progress.py            # write docs/PROGRESS.md
  python3 scripts/task_progress.py --summary  # print short summary to stdout
"""
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TASKS = ROOT / "docs" / "TASKS.md"
OUT = ROOT / "docs" / "PROGRESS.md"

TASK_RE = re.compile(
    r"^- \[(?P<s>[ ~xX])\] (?P<id>[A-Z]+\d*-\d+)\s+(?:\[(?P<tag>[A-Z]+)\]\s+)?(?P<title>.*)$"
)
OWNER_RE = re.compile(r"\s@(?P<who>[\w.-]+)")
DATE_RE = re.compile(r"\s(?P<d>\d{4}-\d{2}-\d{2})\s*$")
PRIO_RE = re.compile(r"\((P[0-2])\)")


def parse():
    tasks, phase = [], "Unsorted"
    for line in TASKS.read_text(encoding="utf-8").splitlines():
        if line.startswith("## "):
            phase = line[3:].strip()
            continue
        m = TASK_RE.match(line)
        if not m:
            continue
        title = m["title"]
        d = DATE_RE.search(title)
        done_on = d["d"] if d else ""
        if d:
            title = title[: d.start()]
        o = OWNER_RE.search(title)
        who = o["who"] if o else ""
        if o:
            title = title[: o.start()] + title[o.end():]
        p = PRIO_RE.search(title)
        prio = p[1] if p else ""
        if p:
            title = (title[: p.start()] + title[p.end():]).strip()
        status = {"x": "done", "X": "done", "~": "doing", " ": "todo"}[m["s"]]
        tasks.append(dict(id=m["id"], tag=m["tag"] or "", title=title.strip(), prio=prio,
                          who=who, done_on=done_on, status=status, phase=phase))
    return tasks


def bar(done, total, width=20):
    n = round(width * done / total) if total else 0
    return "█" * n + "░" * (width - n)


def pct(done, total):
    return f"{(100 * done // total) if total else 0}%"


def summary(tasks):
    t = len(tasks)
    d = sum(x["status"] == "done" for x in tasks)
    w = sum(x["status"] == "doing" for x in tasks)
    return t, d, w


def render(tasks):
    t, d, w = summary(tasks)
    todo = t - d - w
    phases = {}
    for x in tasks:
        phases.setdefault(x["phase"], []).append(x)

    L = ["# Project Progress", "",
         f"_Auto-generated from [TASKS](TASKS.md) on {date.today().isoformat()}. Do not edit by hand._", "",
         "## Overall", "",
         f"`{bar(d, t)}` **{pct(d, t)}**  ({d}/{t} done)", "",
         "| Done | In progress | Upcoming | Total |", "|---:|---:|---:|---:|",
         f"| {d} | {w} | {todo} | {t} |", ""]

    L += ["## By phase", "", "| Phase | Progress | Done | In progress | Upcoming |", "|---|---|---:|---:|---:|"]
    for name, xs in phases.items():
        pd_ = sum(x["status"] == "done" for x in xs)
        pw = sum(x["status"] == "doing" for x in xs)
        L.append(f"| {name} | `{bar(pd_, len(xs), 10)}` {pct(pd_, len(xs))} | {pd_} | {pw} | {len(xs) - pd_ - pw} |")
    L.append("")

    L += ["## By area", "", "| Area | Done | Total |", "|---|---:|---:|"]
    tags = {}
    for x in tasks:
        tags.setdefault(x["tag"] or "-", []).append(x)
    for tag, xs in sorted(tags.items()):
        L.append(f"| {tag} | {sum(x['status'] == 'done' for x in xs)} | {len(xs)} |")
    L.append("")

    doing = [x for x in tasks if x["status"] == "doing"]
    L += ["## In progress", ""]
    if doing:
        L += ["| ID | Area | Task | Owner |", "|---|---|---|---|"]
        L += [f"| {x['id']} | {x['tag']} | {x['title']} | {('@' + x['who']) if x['who'] else '-'} |" for x in doing]
    else:
        L.append("_Nothing in progress._")
    L.append("")

    upcoming = [x for x in tasks if x["status"] == "todo" and not x["id"].startswith("B-")]
    upcoming.sort(key=lambda x: (x["prio"] or "P9"))
    nxt = [x for x in tasks if x["status"] == "todo" and not x["id"].startswith("B-")][:10]
    L += ["## Up next (next 10 in plan order)", "", "| ID | Area | Task | Priority |", "|---|---|---|---|"]
    L += [f"| {x['id']} | {x['tag']} | {x['title']} | {x['prio']} |" for x in nxt] or ["| - | - | All planned tasks started | - |"]
    L.append("")

    done = [x for x in tasks if x["status"] == "done"]
    L += ["## Completed", ""]
    if done:
        L += ["| ID | Area | Task | Completed by | Date |", "|---|---|---|---|---|"]
        L += [f"| {x['id']} | {x['tag']} | {x['title']} | {('@' + x['who']) if x['who'] else '-'} | {x['done_on'] or '-'} |"
              for x in sorted(done, key=lambda x: x["done_on"], reverse=True)]
    else:
        L.append("_No tasks completed yet._")
    L.append("")

    L += ["## Full plan by phase", ""]
    icon = {"done": "✅", "doing": "🔧", "todo": "⬜"}
    for name, xs in phases.items():
        L += [f"### {name}", "", "| | ID | Area | Task | Priority | Owner |", "|---|---|---|---|---|---|"]
        L += [f"| {icon[x['status']]} | {x['id']} | {x['tag']} | {x['title']} | {x['prio']} | {('@' + x['who']) if x['who'] else ''} |"
              for x in xs]
        L.append("")
    return "\n".join(L)


def main():
    tasks = parse()
    t, d, w = summary(tasks)
    if "--summary" in sys.argv:
        nxt = [x for x in tasks if x["status"] == "todo" and not x["id"].startswith("B-")][:3]
        print(f"Task progress: {d}/{t} done ({pct(d, t)}), {w} in progress.")
        for x in tasks:
            if x["status"] == "doing":
                print(f"  in progress: {x['id']} {x['title']}")
        for x in nxt:
            print(f"  next: {x['id']} {x['title']}")
        return
    OUT.write_text(render(tasks), encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}: {d}/{t} done, {w} in progress.")


if __name__ == "__main__":
    main()
