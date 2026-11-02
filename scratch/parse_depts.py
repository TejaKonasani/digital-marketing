import re

with open('admin/src/data/departments.js', 'r', encoding='utf-8') as f:
    dept_text = f.read()

# Match each object { ... }
dept_blocks = re.findall(r"\{\s*id:\s*'([A-Z]{3})'.*?positions:\s*(\d+).*?\}", dept_text, re.DOTALL)
print("Depts count:", len(dept_blocks))
total = 0
for d_id, pos in dept_blocks:
    print(f"Dept {d_id}: {pos} positions")
    total += int(pos)

print(f"Total positions: {total}")
