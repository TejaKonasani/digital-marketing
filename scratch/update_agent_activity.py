import re

with open('admin/src/data/agentActivityData.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace CEO seeds
text = text.replace("'CEO-001': {\n    name: 'Vikram',", "'CEO-001': {\n    name: 'Arjun',")
text = text.replace("'CEO-001': {\r\n    name: 'Vikram',", "'CEO-001': {\r\n    name: 'Arjun',")

text = text.replace("'CEO-002': {\n    name: 'Shruti',", "'CEO-002': {\n    name: 'Sankalp',")
text = text.replace("'CEO-002': {\r\n    name: 'Shruti',", "'CEO-002': {\r\n    name: 'Sankalp',")

text = text.replace("'CEO-003': {\n    name: 'Anvesh',", "'CEO-003': {\n    name: 'Lakshya',")
text = text.replace("'CEO-003': {\r\n    name: 'Anvesh',", "'CEO-003': {\r\n    name: 'Lakshya',")

text = text.replace("'CEO-004': {\n    name: 'Lekha',", "'CEO-004': {\n    name: 'Samanvay',")
text = text.replace("'CEO-004': {\r\n    name: 'Lekha',", "'CEO-004': {\r\n    name: 'Samanvay',")

text = text.replace("'CEO-005': {\n    name: 'Chitra',", "'CEO-005': {\n    name: 'Nirnay',")
text = text.replace("'CEO-005': {\r\n    name: 'Chitra',", "'CEO-005': {\r\n    name: 'Nirnay',")

text = text.replace("'CEO-006': {\n    name: 'Karthik',", "'CEO-006': {\n    name: 'Pragati',")
text = text.replace("'CEO-006': {\r\n    name: 'Karthik',", "'CEO-006': {\r\n    name: 'Pragati',")

# Replace SBD-001 seed
text = text.replace("'SBD-001': {\n    name: 'Sankalan',", "'SAL-001': {\n    name: 'Vikram',\n    model: 'Claude 3.5 (secure-runtime)',\n    operationalStatus: 'Running',\n    runtimeHealth: 'Healthy',\n    currentTask: 'Commercial pipeline review',\n    currentProject: 'Enterprise Growth Outreach',\n    lastRunTime: '29 Oct 2026, 10:14 AM',\n    lastRunResult: 'Success',\n    lastRunDuration: '1m 34s',\n    version: 'v2.1',\n    nextHandoff: 'Sales Proposal (SAL-009)',\n    todayCompleted: 4,\n    todayFailed: 0,\n    todayWaitingReview: 1,\n    todayBlocked: 0,\n    todayRuntime: '1.9h'\n  },\n  'SBD-001': {\n    name: 'Vikram',")

text = text.replace("'SBD-001': {\r\n    name: 'Sankalan',", "'SAL-001': {\r\n    name: 'Vikram',\r\n    model: 'Claude 3.5 (secure-runtime)',\r\n    operationalStatus: 'Running',\r\n    runtimeHealth: 'Healthy',\r\n    currentTask: 'Commercial pipeline review',\r\n    currentProject: 'Enterprise Growth Outreach',\r\n    lastRunTime: '29 Oct 2026, 10:14 AM',\r\n    lastRunResult: 'Success',\r\n    lastRunDuration: '1m 34s',\r\n    version: 'v2.1',\r\n    nextHandoff: 'Sales Proposal (SAL-009)',\r\n    todayCompleted: 4,\r\n    todayFailed: 0,\r\n    todayWaitingReview: 1,\r\n    todayBlocked: 0,\r\n    todayRuntime: '1.9h'\r\n  },\r\n  'SBD-001': {\r\n    name: 'Vikram',")

# Ensure SAL in sets
text = text.replace("'SBD-002'", "'SAL-002', 'SBD-002'")
text = text.replace("'SBD-006'", "'SAL-006', 'SBD-006'")
text = text.replace("'SBD-001'", "'SAL-001', 'SBD-001'")
text = text.replace("'SBD-009'", "'SAL-009', 'SBD-009'")

with open('admin/src/data/agentActivityData.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated agentActivityData.js with canonical identities!')
