import { flatten } from 'lodash';

const getOffset = (level) => ' '.repeat(4 * level);

const stringifyVal = (value, level) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${getOffset(level + 1)}${key}: ${stringifyVal(val, level + 1)}`);
  return `{\n${lines.join('\n')}\n${getOffset(level)}}`;
};

const stringify = (nodes, level) => {
  const offset = getOffset(level - 1);
  const lines = nodes.map((node) => {
    const infoStr = (value) => `${node.key}: ${stringifyVal(value, level)}`;
    switch (node.type) {
      case 'added':
        return `${offset}  + ${infoStr(node.value)}`;
      case 'deleted':
        return `${offset}  - ${infoStr(node.value)}`;
      case 'unchanged':
        return `${offset}    ${infoStr(node.value)}`;
      case 'changed':
        return [
          `${offset}  + ${infoStr(node.value)}`,
          `${offset}  - ${infoStr(node.oldValue)}`,
        ];
      case 'nested':
        return `${getOffset(level)}${node.key}: ${stringify(node.children, level + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return `{\n${flatten(lines).join('\n')}\n${offset}}`;
};

const render = (diffObject) => stringify(diffObject, 1);

export default render;
