const getOffset = (level) => ' '.repeat(4 * level);

const stringifyVal = (value, level) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${getOffset(level + 1)}${key}: ${stringifyVal(val, level + 1)}`);
  return `{\n${lines.join('\n')}\n${getOffset(level)}}`;
};

const stringifyItem = (item, level) => {
  const offset = getOffset(level - 1);
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
      throw new Error(`Unknown state: ${item.state}`);
  }
};

const render = (diffObj) => {
  const iter = (obj, level = 1) => {
    const result = obj.map((item) => {
      if (item.type === 'complex') {
        return `${getOffset(level)}${item.key}: ${iter(item.children, level + 1)}`;
      }
      return stringifyItem(item, level);
    });
    return `{\n${result.join('\n')}\n${getOffset(level - 1)}}`;
  };

  return iter(diffObj);
};

export default render;
