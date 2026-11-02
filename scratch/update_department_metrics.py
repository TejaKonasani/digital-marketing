with open('admin/src/data/departmentData.js', 'r', encoding='utf-8') as f:
    text = f.read()

if 'SAL:' not in text:
    sbd_idx = text.find('  SBD: {')
    if sbd_idx != -1:
        # duplicate SBD block as SAL block
        end_sbd = text.find('  MKT: {', sbd_idx)
        sbd_block = text[sbd_idx:end_sbd]
        sal_block = sbd_block.replace('  SBD: {', '  SAL: {').replace('PRJ-SBD-', 'PRJ-SAL-').replace('SBD-', 'SAL-')
        text = text[:sbd_idx] + sal_block + text[sbd_idx:]

with open('admin/src/data/departmentData.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated departmentData.js with SAL metrics!')
