export default (arr) => {
  const ret = {};

  if (!Array.isArray(arr)) {
    return ret;
  }

  arr.forEach((val) => {
    ret[val] = val;
  });

  return ret;
};
