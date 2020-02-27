import path from 'path';
import { readFileSync } from 'fs';
import parse from './parser';
import buildDiff from './builder';
import render from './formatters';

const getConfigData = (configPath) => {
  const ext = path.extname(configPath);
  return {
    dataFormat: ext.slice(1),
    data: readFileSync(configPath, 'utf-8'),
  };
};

const genDiff = (configFilepath1, configFilepath2, format = 'tree') => {
  const configData1 = getConfigData(configFilepath1);
  const configData2 = getConfigData(configFilepath2);
  const configObj1 = parse(configData1.data, configData1.dataFormat);
  const configObj2 = parse(configData2.data, configData2.dataFormat);
  const diff = buildDiff(configObj1, configObj2);
  return render(diff, format);
};

export default genDiff;
