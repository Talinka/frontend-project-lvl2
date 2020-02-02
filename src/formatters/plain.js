import { has } from 'lodash';

const getValueStr = (val) => {
  if (val instanceof Object) {
    return '[complex value]';
  }
  return (typeof val === 'string') ? `'${val}'` : val;
};

const stringify = (key, info) => {
  const base = `Property '${key}' was`;
  switch (info.state) {
    case 'added':
      return `${base} added with value: ${getValueStr(info.value)}`;
    case 'deleted':
      return `${base} deleted`;
    case 'changed':
      return `${base} changed from ${getValueStr(info.oldValue)} to ${getValueStr(info.value)}`;
    default:
      return '';
  }
};

const render = (diffObj) => {
  const iter = (obj, accKey) => {
    const items = Object.entries(obj);
    return items
      .map(([key, info]) => {
        const newKey = (accKey) ? `${accKey}.${key}` : key;
        if (has(info, 'children')) {
          return iter(info.children, newKey);
        }
        return stringify(newKey, info);
      })
      .filter((x) => x)
      .join('\n');
  };

  return iter(diffObj);
};

export default render;
