/**
 * @since 2020-03-07 05:46
 * @author vivaxy
 */
const path = require('path');
const fse = require('fs-extra');
const Benchmark = require('benchmark');
const vlq = require('vlq');
const myVlq = require('../lib');

function benchmark(targetName, targetFunction, myName, myFunction) {
  return new Promise(function(resolve) {
    let message = '';
    const suite = new Benchmark.Suite();
    suite
      .add(targetName, targetFunction)
      .add(myName, myFunction)
      .on('cycle', function(event) {
        message += String(event.target) + '\n\n';
      })
      .on('complete', async function() {
        message += 'Fastest is ' + this.filter('fastest').map('name');
        resolve(message);
      })
      .run();
  });
}

async function writeToReadme(content) {
  const readmePath = path.join(__dirname, '..', 'README.md');
  const splitString = '\n## ';
  const readme = await fse.readFile(readmePath, 'utf8');
  const readmes = readme.split(splitString).map((readmeSection) => {
    if (readmeSection.startsWith('Benchmark')) {
      return 'Benchmark\n\n' + content + '\n';
    }
    return readmeSection;
  });
  await fse.writeFile(readmePath, readmes.join(splitString));
}

(async function() {
  const encodeCases = [1, -1, 0, 234, 56, 789, 10, [-1, 23, 456, 7890]];
  function forEachEncodeCase(fn) {
    encodeCases.forEach(fn);
  }
  const encodeResult = await benchmark(
    'vlq#encode',
    function() {
      forEachEncodeCase(vlq.encode);
    },
    '@vivaxy/vlq#encode',
    function() {
      forEachEncodeCase(myVlq.encode);
    },
  );

  const decodeCases = ['A', 'B', 'C', 'D', '3H', 'EAEE'];
  function forEachDecodeCase(fn) {
    decodeCases.forEach(fn);
  }
  const decodeResult = await benchmark(
    'vlq#decode',
    function() {
      forEachDecodeCase(vlq.encode);
    },
    '@vivaxy/vlq#decode',
    function() {
      forEachDecodeCase(myVlq.decode);
    },
  );
  const result = `### decode

${decodeResult}

### encode

${encodeResult}`;
  await writeToReadme(result);
  console.log(result);
})();
