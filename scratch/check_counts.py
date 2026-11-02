import json
import re

with open('admin/src/data/departments.js', 'r', encoding='utf-8') as f:
    dept_text = f.read()

# Extract departments
depts = re.findall(r"id:\s*'([A-Z]{3})',\s*prefix:\s*'([A-Z]{3})',\s*name:\s*'([^']+)',\s*short:\s*'([^']+)',\s*positions:\s*(\d+)", dept_text)
print("Departments found:", len(depts))
total_declared = 0
for d in depts:
    print(f"ID: {d[0]}, Prefix: {d[1]}, Name: {d[2]}, Count: {d[4]}")
    total_declared += int(d[4])

print(f"Total positions declared across departments: {total_declared}")

# Check positionTitles.js
with open('admin/src/data/positionTitles.js', 'r', encoding='utf-8') as f:
    titles_text = f.read()

dept_titles_matches = re.findall(r"([A-Z]{3}):\s*\[", titles_text)
print("Dept sections in positionTitles:", dept_titles_matches)

# Count titles per dept
for d_id in [d[0] for d in depts]:
    # find section for d_id
    pattern = rf"{d_id}:\s*\[(.*?)\](?=,\s*[A-Z]{{3}}:\s*\[|\s*\}})"
    match = re.search(pattern, titles_text, re.DOTALL)
    if match:
        titles = re.findall(r"\{[^}]*t:\s*['\"]([^'\"]+)['\"][^}]*\}", match.group(1))
        print(f"  {d_id} titles count: {len(titles)}")
    else:
        print(f"  {d_id} NOT FOUND!")
