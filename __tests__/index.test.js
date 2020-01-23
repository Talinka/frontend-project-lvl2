import { readFileSync } from 'fs';
import path from 'path';
import gendiff from '../src';

const fixPath = path.join(__dirname, '../__fixtures__');

test('Comparing json files', () => {
  const beforeJson = `${fixPath}/before.json`;
  const afterJson = `${fixPath}/after.json`;
  const result = readFileSync(`${fixPath}/result.txt`, 'utf-8');
  expect(gendiff(beforeJson, afterJson)).toEqual(result);
});
