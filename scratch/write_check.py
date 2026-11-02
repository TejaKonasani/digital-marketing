import subprocess

# Let's run a node script using the project's own JS
script = """
import { positions } from './admin/src/data/positions.js';
import { departments } from './admin/src/data/departments.js';

console.log('Total positions:', positions.length);
console.log('Total departments:', departments.length);

const deptMap = {};
for (const p of positions) {
  deptMap[p.deptId] = (deptMap[p.deptId] || 0) + 1;
}

for (const d of departments) {
  console.log(`Dept: ${d.id} (${d.name}) -> positions declared: ${d.positions}, positions generated: ${deptMap[d.id] || 0}`);
}
"""

with open('scratch/check_dept_pos.mjs', 'w', encoding='utf-8') as f:
    f.write(script)
print("Wrote check_dept_pos.mjs")
