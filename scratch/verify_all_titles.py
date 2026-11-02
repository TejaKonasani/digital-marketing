import re

with open('admin/src/data/positionTitles.js', 'r', encoding='utf-8') as f:
    text = f.read()

expected = {
    'CEO': 6,
    'SAL': 13,
    'MKT': 16,
    'CEX': 16,
    'OPS': 18,
    'CRT': 22,
    'PMG': 20,
    'DAT': 19,
    'FIN': 20,
    'TEC': 24,
    'GOV': 20
}

# Parse titles
for dept, exp_cnt in expected.items():
    pattern = rf"{dept}:\s*\[(.*?)\](?=,\s*[A-Z]{{3}}:\s*\[|\s*\}})"
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        print(f"ERROR: Dept {dept} not found in deptTitles!")
        continue
    items = re.findall(r"\{[^\}]*?t:\s*['\"]([^'\"]+)['\"][^\}]*?\}", m.group(1))
    print(f"Dept {dept}: expected {exp_cnt}, found {len(items)} titles")
    if len(items) != exp_cnt:
        print(f"  MISMATCH IN {dept}!")
