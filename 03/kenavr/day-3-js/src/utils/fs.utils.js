const fs = require('fs');

function loadAndParseInputFile(path) {
  const input = fs
    .readFileSync(path)
    .toString()
    .trim();

  const lines = input.split(/\r?\n/);
  return lines.map(line => line.split(','));
}

module.exports = {
  loadAndParseInputFile
};
