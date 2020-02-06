import { has } from 'lodash';

const getValueStr = (val) => {
  if (val instanceof Object) {
    return '[complex value]';
  }
  return (typeof val === 'string') ? `'${val}'` : val;
};

const stringify = (key, { state, value, oldValue }) => {
  const base = `Property '${key.join('.')}' was`;
  switch (state) {
    case 'added':
      return `${base} added with value: ${getValueStr(value)}`;
    case 'deleted':
      return `${base} deleted`;
    case 'changed':
      return `${base} changed from ${getValueStr(oldValue)} to ${getValueStr(value)}`;
    default:
      return '';
  }
};

const render = (diffObj) => {
  const iter = (accKeys, obj) => obj
    .map((item) => {
      const newKey = [...accKeys, item.key];
      return (item.children) ? iter(newKey, item.children) : stringify(newKey, item);
    })
    .filter((x) => x)
    .join('\n');

  return iter([], diffObj);
};

export default render;
