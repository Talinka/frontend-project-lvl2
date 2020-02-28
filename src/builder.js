import { has, union } from 'lodash';

const buildSimpleNode = (key, value, type) => ({
  key,
  value,
  type,
});

const buildDiff = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diffs = keys.map((key) => {
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        return { key, children: buildDiff(obj1[key], obj2[key]), type: 'nested' };
      }
      if (obj1[key] !== obj2[key]) {
        const node = buildSimpleNode(key, obj2[key], 'changed');
        return { ...node, oldValue: obj1[key] };
      }
      return buildSimpleNode(key, obj1[key], 'unchanged');
    }
    if (has(obj1, key)) {
      return buildSimpleNode(key, obj1[key], 'deleted');
    }
    return buildSimpleNode(key, obj2[key], 'added');
  });

  return diffs;
};


export default buildDiff;
