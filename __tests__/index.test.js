import { trim } from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

import gendiff from '../src';

const fixPath = path.join(__dirname, '../__fixtures__');

const json1 = `${fixPath}/before.json`;
const json2 = `${fixPath}/after.json`;
const yml1 = `${fixPath}/before.yml`;
const yml2 = `${fixPath}/after.yml`;
const ini1 = `${fixPath}/before.ini`;
const ini2 = `${fixPath}/after.ini`;

describe('test tree formatter', () => {
  const result = readFileSync(`${fixPath}/result.txt`, 'utf-8');
  test.each([
    [json1, json2, result],
    [yml1, yml2, result],
    [ini1, ini2, result],
  ])('comparing(%s, %s)', (before, after, expected) => {
    expect(gendiff(before, after)).toBe(expected);
  });
});

describe('test plain formatter', () => {
  const plainResult = readFileSync(`${fixPath}/result_plain.txt`, 'utf-8');
  test.each([
    [json1, json2, plainResult],
    [yml1, yml2, plainResult],
    [ini1, ini2, plainResult],
  ])('comparing(%s, %s)', (before, after, expected) => {
    expect(gendiff(before, after, 'plain')).toBe(expected);
  });
});

describe('test json formatter', () => {
  const json = readFileSync(`${fixPath}/result_json.txt`, 'utf-8');
  // delete all spaces
  const jsonResult = json.split('\n').map(trim).join('');

  test.each([
    [json1, json2, jsonResult],
    [yml1, yml2, jsonResult],
    [ini1, ini2, jsonResult],
  ])('comparing(%s, %s)', (before, after, expected) => {
    expect(gendiff(before, after, 'json')).toBe(expected);
  });
});
