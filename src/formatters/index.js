import { has } from 'lodash';
import plainRender from './plain';
import treeRender from './tree';
import jsonRender from './json';

const formatters = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

const render = (obj, format) => {
  const provedFormat = has(formatters, format) ? format : 'tree';
  return formatters[provedFormat](obj);
};

export default render;
