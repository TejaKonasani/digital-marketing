with open('client/src/data/clientData.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("with: 'Your Samrudhi team',", "with: 'Mitra (Your Account Lead)',")

with open('client/src/data/clientData.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated clientData.js successfully!')
