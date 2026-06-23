const fs = require('fs');

const file = fs.createWriteStream('largeFile.txt');

for (let i = 0; i < 1e6; i++) { // 1 million lines
  const ok = file.write(`This is line number ${i}\n`);

  // Handle backpressure
  if (!ok) {
    file.once('drain', () => {});
  }
}

file.end();

file.on('finish', () => {
  console.log('Large file created successfully!');
});
