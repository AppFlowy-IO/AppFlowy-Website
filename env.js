const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const envFilePriority = ['.env', '.env.production', '.env.development', '.env.local'];

let envFilePath = null;
for (const envFileName of envFilePriority) {
  const filePath = path.join(__dirname, `./${envFileName}`);

  if (fs.existsSync(filePath)) {
    envFilePath = filePath;
    break; // stop searching if found first env file
  }
}

if (!envFilePath) {
  console.log(chalk.red('No .env file found'));
}
const config = dotenv.config({ path: envFilePath });
if (config.error) {
  console.log(chalk.red('Error loading .env file'));
}
