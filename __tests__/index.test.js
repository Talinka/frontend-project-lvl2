import { readFileSync } from 'fs';
import path from 'path';
import gendiff from '../src';

import getDataObj from '../src/parsers';

const fixPath = path.join(__dirname, '../__fixtures__');
const result = readFileSync(`${fixPath}/result.txt`, 'utf-8');
const plainResult = readFileSync(`${fixPath}/result_plain.txt`, 'utf-8');

const json1 = `${fixPath}/before.json`;
const json2 = `${fixPath}/after.json`;
const yml1 = `${fixPath}/before.yml`;
const yml2 = `${fixPath}/after.yml`;
const ini1 = `${fixPath}/before.ini`;
const ini2 = `${fixPath}/after.ini`;

describe('test tree format', () => {
  test.each([
    [json1, json2, result],
    [yml1, yml2, result],
    [ini1, ini2, result],
  ])('comparing(%s, %s)', (before, after, expected) => {
    expect(gendiff(before, after)).toBe(expected);
  });
});

describe('test plain format', () => {
  test.each([
    [json1, json2, plainResult],
    [yml1, yml2, plainResult],
    [ini1, ini2, plainResult],
  ])('comparing(%s, %s)', (before, after, expected) => {
    expect(gendiff(before, after, 'plain')).toBe(expected);
  });
});

describe('test parsers', () => {
  const jsonObj = getDataObj(json2);
  const ymlObj = getDataObj(yml2);
  const iniObj = getDataObj(ini2);
  test('parsers', () => {
    expect(ymlObj).toEqual(jsonObj);
    expect(iniObj).toEqual(jsonObj);
  });
});
