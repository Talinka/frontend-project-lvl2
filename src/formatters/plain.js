import { flattenDeep } from 'lodash';

const getValueStr = (val) => {
  if (val instanceof Object) {
    return '[complex value]';
  }
  return (typeof val === 'string') ? `'${val}'` : val;
};

const stringify = (nodes, keys) => nodes
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const base = `Property '${[...keys, node.key].join('.')}' was`;
    switch (node.type) {
      case 'added':
        return `${base} added with value: ${getValueStr(node.value)}`;
      case 'deleted':
        return `${base} deleted`;
      case 'changed':
        return `${base} changed from ${getValueStr(node.oldValue)} to ${getValueStr(node.value)}`;
      case 'nested':
        return stringify(node.children, [...keys, node.key]);
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

const render = (diffObject) => {
  const elements = flattenDeep(stringify(diffObject, []));
  return elements.join('\n');
};

export default render;
