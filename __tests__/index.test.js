import { readFileSync } from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml', 'ini'];

describe('test tree formatter', () => {
  const expected = readFile('result.txt');
  test.each(formats)('compare %s files', (format) => {
    const before = getFixturePath(`before.${format}`);
    const after = getFixturePath(`after.${format}`);
    expect(gendiff(before, after)).toBe(expected);
  });
});

describe('test plain formatter', () => {
  const expected = readFile('result_plain.txt');
  test.each(formats)('compare %s files', (format) => {
    const before = getFixturePath(`before.${format}`);
    const after = getFixturePath(`after.${format}`);
    expect(gendiff(before, after, 'plain')).toBe(expected);
  });
});

describe('test json formatter', () => {
  const jsonResult = readFile('result_json.txt');
  const expected = JSON.parse(jsonResult);
  test.each(formats)('compare %s files', (format) => {
    const before = getFixturePath(`before.${format}`);
    const after = getFixturePath(`after.${format}`);
    const diff = gendiff(before, after, 'json');
    expect(JSON.parse(diff)).toEqual(expected);
  });
});
