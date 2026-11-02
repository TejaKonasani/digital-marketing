import os

with open('admin/src/data/departments.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace CEO lead
content = content.replace("lead: 'Vikram',\n    leadRole: 'Chief of Staff & Strategy Coordinator'", "lead: 'Arjun',\n    leadRole: 'AI Chief Executive Officer'")
content = content.replace("lead: 'Vikram',\r\n    leadRole: 'Chief of Staff & Strategy Coordinator'", "lead: 'Arjun',\r\n    leadRole: 'AI Chief Executive Officer'")

# Replace SBD with SAL
content = content.replace("id: 'SBD',\n    prefix: 'SBD'", "id: 'SAL',\n    prefix: 'SAL',\n    alias: 'SBD'")
content = content.replace("id: 'SBD',\r\n    prefix: 'SBD'", "id: 'SAL',\r\n    prefix: 'SAL',\r\n    alias: 'SBD'")

content = content.replace("lead: 'Karthik',\n    leadRole: 'Head of Business Development'", "lead: 'Vikram',\n    leadRole: 'AI Chief Growth Officer'")
content = content.replace("lead: 'Karthik',\r\n    leadRole: 'Head of Business Development'", "lead: 'Vikram',\r\n    leadRole: 'AI Chief Growth Officer'")

# Replace MKT lead
content = content.replace("lead: 'Meera',\n    leadRole: 'Brand & Demand Lead'", "lead: 'Prerna',\n    leadRole: 'Head of Brand & Marketing Strategy'")
content = content.replace("lead: 'Meera',\r\n    leadRole: 'Brand & Demand Lead'", "lead: 'Prerna',\r\n    leadRole: 'Head of Brand & Marketing Strategy'")

# Replace CEX lead
content = content.replace("lead: 'Divya',\n    leadRole: 'Client Experience Lead'", "lead: 'Mitra',\n    leadRole: 'AI Chief Client Experience Officer'")
content = content.replace("lead: 'Divya',\r\n    leadRole: 'Client Experience Lead'", "lead: 'Mitra',\r\n    leadRole: 'AI Chief Client Experience Officer'")

# Replace OPS lead
content = content.replace("lead: 'Ravi',\n    leadRole: 'Delivery Operations Lead'", "lead: 'Daksh',\n    leadRole: 'AI Chief Operating Officer'")
content = content.replace("lead: 'Ravi',\r\n    leadRole: 'Delivery Operations Lead'", "lead: 'Daksh',\r\n    leadRole: 'AI Chief Operating Officer'")

# Replace CRT lead
content = content.replace("lead: 'Ananya',\n    leadRole: 'Creative & Content Lead'", "lead: 'Aarya',\n    leadRole: 'AI Chief Creative Officer'")
content = content.replace("lead: 'Ananya',\r\n    leadRole: 'Creative & Content Lead'", "lead: 'Aarya',\r\n    leadRole: 'AI Chief Creative Officer'")

# Replace PMG lead
content = content.replace("lead: 'Sandeep',\n    leadRole: 'Growth & Paid Media Lead'", "lead: 'Tejas',\n    leadRole: 'AI Head of Client Performance'")
content = content.replace("lead: 'Sandeep',\r\n    leadRole: 'Growth & Paid Media Lead'", "lead: 'Tejas',\r\n    leadRole: 'AI Head of Client Performance'")

# Replace DAT lead
content = content.replace("lead: 'Priya',\n    leadRole: 'Analytics & Data Governance Lead'", "lead: 'Medha',\n    leadRole: 'AI Chief Data & Analytics Officer'")
content = content.replace("lead: 'Priya',\r\n    leadRole: 'Analytics & Data Governance Lead'", "lead: 'Medha',\r\n    leadRole: 'AI Chief Data & Analytics Officer'")

# Replace FIN lead
content = content.replace("lead: 'Lakshmi',\n    leadRole: 'Finance & Administration Lead'", "lead: 'Niti',\n    leadRole: 'AI Chief Financial Officer'")
content = content.replace("lead: 'Lakshmi',\r\n    leadRole: 'Finance & Administration Lead'", "lead: 'Niti',\r\n    leadRole: 'AI Chief Financial Officer'")

# Replace TEC lead
content = content.replace("lead: 'Arjun',\n    leadRole: 'Technology & AgentOps Lead'", "lead: 'Sutra',\n    leadRole: 'AI Chief Technology Officer'")
content = content.replace("lead: 'Arjun',\r\n    leadRole: 'Technology & AgentOps Lead'", "lead: 'Sutra',\r\n    leadRole: 'AI Chief Technology Officer'")

# Replace GOV lead
content = content.replace("lead: 'Satya',\n    leadRole: 'Independent Assurance Lead'", "lead: 'Satya',\n    leadRole: 'AI Chief Assurance Officer'")
content = content.replace("lead: 'Satya',\r\n    leadRole: 'Independent Assurance Lead'", "lead: 'Satya',\r\n    leadRole: 'AI Chief Assurance Officer'")

# Update deptById to handle SBD alias
alias_logic = """export const deptById = (id) => {
  if (!id) return null
  const clean = String(id).toUpperCase().trim()
  if (clean === 'SBD') return departments.find((d) => d.id === 'SAL')
  return departments.find(
    (d) => d.id.toUpperCase() === clean || d.prefix.toUpperCase() === clean || d.short.toUpperCase() === clean || (d.alias && d.alias.toUpperCase() === clean)
  ) || null
}"""

content = content.replace("""export const deptById = (id) => {
  if (!id) return null
  const clean = String(id).toUpperCase().trim()
  return departments.find(
    (d) => d.id.toUpperCase() === clean || d.prefix.toUpperCase() === clean || d.short.toUpperCase() === clean
  ) || null
}""", alias_logic)

with open('admin/src/data/departments.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated departments.js successfully!')
