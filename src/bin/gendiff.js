#! /usr/bin/env node

import program from 'commander';


let firstConfig;
let secondConfig;

// const program = new commander.Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstCongif> <secondConfig>')
  .action((firstConf, secondConf) => {
    firstConfig = firstConf;
    secondConfig = secondConf;
  });

program.parse(process.argv);

if (typeof firstConfig === 'undefined') {
  console.error('error: no configs name given!');
  process.exit(1);
}

console.log('first config:', firstConfig);
console.log('second config:', secondConfig);
if (program.format) {
  console.log('format', program.format);
}
