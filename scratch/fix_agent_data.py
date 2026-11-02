with open('admin/src/data/agentActivityData.js', 'r', encoding='utf-8') as f:
    content = f.read()

bad1 = "'SAL-001', 'SBD-001': {"
bad2 = "'SAL-002', 'SBD-002': {"

print("bad1 found:", bad1 in content)
print("bad2 found:", bad2 in content)

if bad1 in content:
    content = content.replace(bad1, "'SBD-001': {")
if bad2 in content:
    content = content.replace(bad2, "'SAL-002': {")

with open('admin/src/data/agentActivityData.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
