import { has } from 'lodash';

const indent = '    ';

const stringifyVal = (value, level) => {
  const i = indent.repeat(level);
  if (!(value instanceof Object)) {
    return value;
  }
  const lines = Object.entries(value).map(([key, val]) => `${i}${indent}${key}: ${stringifyVal(val, level + 1)}`);
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
  const iter = (node, level = 1) => {
    const result = node.map((item) => {
      if (has(item, 'children')) {
        const i = indent.repeat(level);
        return `${i}${item.key}: {\n${iter(item.children, level + 1)}\n${i}}`;
      }
      return stringifyItem(item, level);
    });
    return result.join('\n');
  };
  return `{\n${iter(diffObj)}\n}`;
};

export default render;
