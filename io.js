const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('what is your name? ', function(name) {
  console.log('hello ' + name)
  process.exit(0);
});
