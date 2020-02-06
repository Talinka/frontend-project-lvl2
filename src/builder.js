import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const common = _.intersection(keys1, keys2)
    .map((key) => {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        return { key, children: buildDiff(obj1[key], obj2[key]) };
      }
      return (obj1[key] === obj2[key])
        ? { key, value: obj1[key], state: 'unchanged' }
        : {
          key, value: obj2[key], oldValue: obj1[key], state: 'changed',
        };
    });
  const deleted = _.difference(keys1, keys2)
    .map((key) => ({ key, value: obj1[key], state: 'deleted' }));
  const added = _.difference(keys2, keys1)
    .map((key) => ({ key, value: obj2[key], state: 'added' }));
  return _.sortBy([...common, ...added, ...deleted], 'key');
};

// const buildDiff = (obj1, obj2) => {
//   const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

//   const diffs = keys.map((key) => {
//     if (has(obj1, key) && has(obj2, key)) {
//       if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
//         return {
//           key,
//           children: buildDiff(obj1[key], obj2[key]),
//           state: 'unchanged',
//         };
//       }
//       if (obj1[key] !== obj2[key]) {
//         return {
//           key,
//           value: obj2[key],
//           oldValue: obj1[key],
//           state: 'changed',
//         };
//       }
//       return {
//         key,
//         value: obj1[key],
//         state: 'unchanged',
//       };
//     }
//     if (has(obj1, key)) {
//       return {
//         key,
//         value: obj1[key],
//         state: 'deleted',
//       };
//     }
//     return {
//       key,
//       value: obj2[key],
//       state: 'added',
//     };
//   });
//   return diffs;
// };

export default buildDiff;
