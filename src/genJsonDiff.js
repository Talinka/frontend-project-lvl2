import genObjDiff from './genObjDiff';

const genJsonDiff = (config1, config2) => {
  const json1 = JSON.parse(config1);
  const json2 = JSON.parse(config2);
  return genObjDiff(json1, json2);
};


export default genJsonDiff;
