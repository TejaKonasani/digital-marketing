const fs = require('fs');
const path = require('path');

const hooks = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useContext', 'useReducer'];

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

['admin/src', 'client/src'].forEach(sub => {
  const dir = path.join(__dirname, '..', sub);
  const files = walk(dir);
  const issues = [];
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    hooks.forEach(hook => {
      const usageRegex = new RegExp(`\\b${hook}\\s*\\(`, 'g');
      if (usageRegex.test(content)) {
        const namedImport = new RegExp(`import\\s*\\{[^}]*\\b${hook}\\b[^}]*\\}\\s*from\\s*['"]react['"]`);
        const defaultWithNamed = new RegExp(`import\\s*React\\s*,\\s*\\{[^}]*\\b${hook}\\b[^}]*\\}\\s*from\\s*['"]react['"]`);
        if (!namedImport.test(content) && !defaultWithNamed.test(content)) {
          issues.push({ file, hook });
        }
      }
    });
  });
  console.log(`[${sub}] Issues found:`, issues.length);
  issues.forEach(iss => console.log(`  ${iss.hook} missing in ${iss.file}`));
});
