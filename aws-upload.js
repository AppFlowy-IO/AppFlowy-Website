const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const AWS = require('aws-sdk');
const mime = require('mime-types');

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  const config = dotenv.config({ path: './.env.local' });
  process.env.AWS_ACCESS_KEY_ID = config.parsed.AWS_ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY = config.parsed.AWS_SECRET_ACCESS_KEY;
  process.env.ENVIRONMENT = config.parsed.ENVIRONMENT;
}

// 'production' | 'test' | 'development'
const environment = process.env.ENVIRONMENT || 'test';

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};
(async () => {
  // Create S3 service object
  const s3 = new AWS.S3({ region: 'us-east-1', credentials });

  // build folder
  const buildFolder = './.next';
  // static assets folder
  const staticAssetsFolder = path.join(buildFolder, 'static');
  // bucket name
  const bucketName = 'appflowy';
  // remote folder path. optional: if you want to upload to a specific folder inside the bucket
  const remoteFolderPath = `website/${environment}/_next/static`;

  console.log(chalk.yellow('Uploading to AWS S3...'));
  // upload build folder to S3
  uploadDirectoryToS3(staticAssetsFolder, bucketName, remoteFolderPath);

  function uploadDirectoryToS3(localPath, bucketName, remotePath = '') {
    console.log(chalk.green(`Uploading ${localPath} to ${bucketName}/${remotePath}`));

    // read all files from local directory
    fs.readdirSync(localPath).forEach((file) => {
      const filePath = `${localPath}/${file}`;
      const key = `${remotePath}/${file}`;
      const ext = path.extname(filePath);
      // if the file is a directory, call the function recursively
      if (fs.lstatSync(filePath).isDirectory()) {
        uploadDirectoryToS3(filePath, bucketName, key);
      } else {
        // read file contents
        const fileContent = fs.readFileSync(filePath);
        const contentType = mime.contentType(ext);
        const params = {
          Bucket: bucketName,
          Key: key,
          Body: fileContent,
          ContentType: contentType,
        };

        s3.upload(params, (err, data) => {
          if (err) {
            console.log(chalk.red(`upload failed: ${key}`, err));
            process.exit(1);
          } else {
            console.log(chalk.green(`upload successfully: ${key}`, data));
          }
        });
      }
    });
  }
})();
