#! /usr/bin/env node

import program from 'commander';

// const program = new commander.Command();
program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');

program.parse(process.argv);

console.log('Hello!');
