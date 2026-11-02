import sys

with open('client/src/data/clientData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect if roadmap is already defined
print("Has roadmap keyword:", "roadmap:" in content)
