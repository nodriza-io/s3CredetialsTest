# s3CredetialsTest
Validate if AWS S3 credentials are ok for Nodriza account.

1. npm install
2. cp manifest.json.tmpl manifest.json
3. Modify your credentials
4. to make a full test -> node index.js acme
5. to validate if file manager is working -> node list.js acme

### To enable custom credentials in ENV VARS:
ENABLE_FILE_MANAGER=true
S3FILES_BUCKET=acme
S3FILES_ACCESS_KEY=xxxxxxxxxxxx
S3FILES_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
S3FILES_REGION=us-east-1