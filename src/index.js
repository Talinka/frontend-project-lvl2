import getDataObj from './parsers';
import genObjDiff from './genObjDiff';

const genDiff = (file1, file2) => {
  try {
    const config1 = getDataObj(file1);
    const config2 = getDataObj(file2);
    return genObjDiff(config1, config2);
  } catch (err) {
    return err.message;
  }
};

export default genDiff;
