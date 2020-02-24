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
  if (!has(formatters, format)) {
    throw new Error(`Unknown output format: ${format}`);
  }
  return formatters[format](obj);
};

export default render;
