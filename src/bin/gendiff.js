#! /usr/bin/env node

import program from 'commander';
import genDiff from '..';

let firstConfig;
let secondConfig;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstCongif> <secondConfig>')
  .action((firstConf, secondConf) => {
    firstConfig = firstConf;
    secondConfig = secondConf;
    const result = genDiff(firstConfig, secondConfig, program.format);
    console.log(result);
  });

program.parse(process.argv);

if (typeof firstConfig === 'undefined') {
  console.error('error: no config names given!');
  process.exit(1);
}
