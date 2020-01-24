import { readFileSync } from 'fs';
import path from 'path';
import gendiff from '../src';

const fixPath = path.join(__dirname, '../__fixtures__');
const result = readFileSync(`${fixPath}/result.txt`, 'utf-8');

test('Comparing json files', () => {
  const beforeJson = `${fixPath}/before.json`;
  const afterJson = `${fixPath}/after.json`;
  expect(gendiff(beforeJson, afterJson)).toEqual(result);
});

test('Comparing yaml files', () => {
  const beforeYml = `${fixPath}/before.yml`;
  const afterYml = `${fixPath}/after.yml`;
  expect(gendiff(beforeYml, afterYml)).toEqual(result);
});
