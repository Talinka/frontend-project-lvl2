import { has } from 'lodash';
import plainRender from './plain';
import treeRender from './tree';

const formatters = {
  tree: treeRender,
  plain: plainRender,
};

const render = (obj, format = 'tree') => {
  const provedFormat = has(formatters, format) ? format : 'tree';
  return formatters[provedFormat](obj);
};

export default render;
