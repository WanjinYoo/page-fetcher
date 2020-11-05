// node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html
const request = require('request');
const fs = require(`fs`);
const readline = require(`readline`);
const address = process.argv[2];
const filepath = process.argv[3];

request(address, (error, response, body) => {
  const data = body;
  if (!error) {
    try {
      if (fs.existsSync(filepath)) {
        if (overwrite()) writefile(data);
      }
    } catch (err) {
      writefile(data);
    }
    writefile(data);
  } else {
    console.log(`invalid URL`);
  }
}
);
const writefile = (data) => {
  fs.writeFile(filepath, data, function (err) {
    if (err) console.log(`path not available`);
  });
};

const overwrite = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('File exists Do you want to overwrite? ', (answer) => {
    if (answer === `y` || answer === `Y`) {
      rl.close();
      return true;
    } else {
      rl.close();
      return false;
    }
  });
};