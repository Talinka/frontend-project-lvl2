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

/* test('Comparing ini files', () => {
  const beforeIni = `${fixPath}/before.ini`;
  const afterIni = `${fixPath}/after.ini`;
  expect(gendiff(beforeIni, afterIni)).toEqual(result);
}); */

const json1 = `${fixPath}/before.json`;
const json2 = `${fixPath}/after.json`;
const yml1 = `${fixPath}/before.yml`;
const yml2 = `${fixPath}/after.yml`;
const ini1 = `${fixPath}/before.ini`;
const ini2 = `${fixPath}/after.ini`;


test.each([
  [json1, json2, result],
  [yml1, yml2, result],
  [ini1, ini2, result],
])('comparing(%s, %s)', (before, after, expected) => {
  expect(gendiff(before, after)).toBe(expected);
});
