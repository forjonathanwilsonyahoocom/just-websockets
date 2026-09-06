replace these strings with your real values:
```bash
find . -type f -exec sed -i 's/\${ENDPNT}/your.endpoint.com/g' {} \;
find . -type f -exec sed -i 's/\${EX_IP}/1.2.3.4/g' {} \;
```
