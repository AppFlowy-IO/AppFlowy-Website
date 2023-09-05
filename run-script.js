// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

exec(`chmod +x ./start-prod.sh && ./start-prod.sh`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  console.log(stdout);
  console.error(stderr);
});
