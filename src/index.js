import { readFileSync } from 'fs';
import genJsonDiff from './genJsonDiff';

const encoding = 'utf8';

const genDiff = (file1, file2) => {
  try {
    const config1 = readFileSync(file1, encoding);
    const config2 = readFileSync(file2, encoding);
    return genJsonDiff(config1, config2);
  } catch (err) {
    return null;
  }
};

export default genDiff;
