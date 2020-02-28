#! /usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstCongif> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, program.format);
    console.log(result);
  });

try {
  program.parse(process.argv);
} catch (error) {
  if (!(error instanceof program.CommanderError)) {
    console.error(error.message);
  }
  process.exit(1);
}
