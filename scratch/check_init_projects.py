import re

# We will read client/src/data/clientData.js and enrich initialProjects with roadmap objects
with open('client/src/data/clientData.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's inspect where initialProjects is defined
match = re.search(r'export const initialProjects = \[', code)
print("Found initialProjects:", bool(match))
