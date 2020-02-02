import parse from './parsers';
import buildDiff from './builder';
import render from './formatters';

const genDiff = (file1, file2, format = 'tree') => {
  try {
    const config1 = parse(file1);
    const config2 = parse(file2);
    const diff = buildDiff(config1, config2);
    return render(diff, format);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export default genDiff;
