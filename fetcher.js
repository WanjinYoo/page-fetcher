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
        overwrite(data);
      }
    } catch (err) {
      writefile(data);
    }
  } else {
    console.log(`invalid URL`);
  }
}
);
const writefile = (data) => {
  fs.writeFile(filepath, data, function (err) {
    if (err) console.log(`path not available`);
    else {
      const stats = fs.statSync(filepath);
      console.log(`Downloaded and saved ${stats.size} bytes to ./index.html`);
    }
  });
};

const overwrite = (data) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('File exists Do you want to overwrite? ', (answer) => {
    if (answer === `y` || answer === `Y`) {
      rl.close();
      return writefile(data);
    } else {
      rl.close();
      return false;
    }
  });
};