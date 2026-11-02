import { positions } from '../admin/src/data/positions.js';
import { departments } from '../admin/src/data/departments.js';

console.log('Total positions:', positions.length);
console.log('Total departments:', departments.length);

const deptMap = {};
for (const p of positions) {
  deptMap[p.deptId] = (deptMap[p.deptId] || 0) + 1;
}

for (const d of departments) {
  console.log(`Dept: ${d.id} (${d.name}) -> positions declared: ${d.positions}, positions generated: ${deptMap[d.id] || 0}`);
}
