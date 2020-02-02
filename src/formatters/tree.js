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

const stringifyItem = ([key, info], level) => {
  const offset = indent.repeat(level - 1);
  const infoStr = (value) => `${key}: ${stringifyVal(value, level)}`;
  switch (info.state) {
    case 'added':
      return `${offset}  + ${infoStr(info.value)}`;
    case 'deleted':
      return `${offset}  - ${infoStr(info.value)}`;
    case 'unchanged':
      return `${offset}    ${infoStr(info.value)}`;
    case 'changed':
      return `${offset}  + ${infoStr(info.value)}\n`
        + `${offset}  - ${infoStr(info.oldValue)}`;
    default:
      return null;
  }
};

const render = (diffObj) => {
  const iter = (node, level = 1) => {
    const result = Object.entries(node).map(([key, info]) => {
      if (has(info, 'children')) {
        const i = indent.repeat(level);
        return `${i}${key}: {\n${iter(info.children, level + 1)}\n${i}}`;
      }
      return stringifyItem([key, info], level);
    });
    return result.join('\n');
  };
  return `{\n${iter(diffObj)}\n}`;
};

export default render;
