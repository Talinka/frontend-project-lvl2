import { has } from 'lodash';

const indent = '    ';

const stringifyVal = (value, level) => {
  const i = indent.repeat(level);
  if (!(value instanceof Object)) {
    return value;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${i}${indent}${key}: ${stringifyVal(val, level + 1)}`);
  return `{\n${lines.join('\n')}\n${i}}`;
};

const stringifyItem = (item, level) => {
  const offset = indent.repeat(level - 1);
  const infoStr = (value) => `${item.key}: ${stringifyVal(value, level)}`;
  switch (item.state) {
    case 'added':
      return `${offset}  + ${infoStr(item.value)}`;
    case 'deleted':
      return `${offset}  - ${infoStr(item.value)}`;
    case 'unchanged':
      return `${offset}    ${infoStr(item.value)}`;
    case 'changed':
      return `${offset}  + ${infoStr(item.value)}\n`
        + `${offset}  - ${infoStr(item.oldValue)}`;
    default:
      return null;
  }
};

const render = (diffObj) => {
  const iter = (obj, level = 1) => {
    const i = indent.repeat(level);
    const result = obj.map((item) => {
      if (has(item, 'children')) {
        return `${i}${item.key}: ${iter(item.children, level + 1)}`;
      }
      return stringifyItem(item, level);
    });
    return `{\n${result.join('\n')}\n${indent.repeat(level - 1)}}`;
  };

  return iter(diffObj);
};

export default render;
