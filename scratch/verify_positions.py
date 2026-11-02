import re

# Read positions
with open('admin/src/data/positions.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract position codes
pos_ids = re.findall(r"id:\s*['\"]([A-Z]{3}-\d{3})['\"]", text)
print(f"Total positions found in admin/src/data/positions.js: {len(pos_ids)}")

dept_counts = {}
for p in pos_ids:
    d = p.split('-')[0]
    dept_counts[d] = dept_counts.get(d, 0) + 1

for d, count in sorted(dept_counts.items()):
    print(f"{d}: {count}")

# Check departments.js
with open('admin/src/data/departments.js', 'r', encoding='utf-8') as f:
    dtext = f.read()

print("Departments file length:", len(dtext))
