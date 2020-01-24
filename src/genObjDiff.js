import { union, has } from 'lodash';

const formatStr = (key, val, sign = ' ') => `${sign} ${key}: ${val}`;

const genObjDiff = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));

  const diffs = keys.reduce((acc, key) => {
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        acc.push(formatStr(key, obj1[key], '-'));
        acc.push(formatStr(key, obj2[key], '+'));
      } else {
        acc.push(formatStr(key, obj2[key]));
      }
    } else if (has(obj1, key)) {
      acc.push(formatStr(key, obj1[key], '-'));
    } else {
      acc.push(formatStr(key, obj2[key], '+'));
    }
    return acc;
  }, []);

  const resultString = diffs.join('\n');
  return `{\n${resultString}\n}`;
};


/* const genObjDiff = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));
  const diffs = [];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        diffs.push(formatStr(key, obj1[key], '-'));
        diffs.push(formatStr(key, obj2[key], '+'));
      } else {
        diffs.push(formatStr(key, obj2[key]));
      }
    } else if (has(obj1, key)) {
      diffs.push(formatStr(key, obj1[key], '-'));
    } else {
      diffs.push(formatStr(key, obj2[key], '+'));
    }
  }

  const resultString = diffs.join('\n');
  return `{\n${resultString}\n}`;
};
*/
export default genObjDiff;
