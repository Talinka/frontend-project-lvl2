import { union, has } from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diffs = keys.reduce((acc, key) => {
    let newItem;
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        newItem = {
          children: buildDiff(obj1[key], obj2[key]),
          state: 'unchanged',
        };
      } else if (obj1[key] !== obj2[key]) {
        newItem = {
          value: obj2[key],
          oldValue: obj1[key],
          state: 'changed',
        };
      } else {
        newItem = {
          value: obj1[key],
          state: 'unchanged',
        };
      }
    } else if (has(obj1, key)) {
      newItem = {
        value: obj1[key],
        state: 'deleted',
      };
    } else {
      newItem = {
        value: obj2[key],
        state: 'added',
      };
    }
    acc[key] = newItem;
    return acc;
  }, {});
  return diffs;
};

export default buildDiff;
