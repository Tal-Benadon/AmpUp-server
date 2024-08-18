# AmpUp project - server

## How to run

for dev mode 
run 

```sh
   git clone -
   npm i
   npm run watch
```

## config

add .env at top level with 
```sh
MONGO_URL= 
JWT_SECRET=
AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
```



## Uploading Files

In a server or using Postman, you can choose a file (only one at a time!), provide it with a name, and send it. There are different upload options for pictures and general files:

1. **Uploading Pictures**:
   - When you upload a picture, the server stores it in Amazon S3 (Simple Storage Service).
   - The server responds by providing a URL (web address) where the picture can be accessed.

2. **Uploading Other Files**:
   - For general files (non-image files), the process is similar.
   - Along with the URL, the server also sends additional information:
     - **File Name**: The original name of the uploaded file.
     - **File Size**: The size of the uploaded file in bytes.

In summary, regardless of the file type, the server saves the file in Amazon S3 and always returns a URL. Depending on the type of file, it may include extra details.

**Good luck**

**remember**

```sh
git add .
git commit -am 'before merge(example)'
git pull origin dev
git push origin --your-branch
```
if u r crying cz there is conflicts = call Aviad

create a pull request

 