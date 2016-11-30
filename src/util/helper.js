import { isObject } from './validator';

const SHUTTLE_KEY = '@@redux-shuttle/SHUTTLE_KEY';
const REDUCER_KEY = '@@redux-shuttle/REDUCER_KEY';

const genKey = (key) => Symbol(key);

const isGenerator = (fn) => fn.constructor.name === "GeneratorFunction";

const isShuttle = (obj) => {
  return isObject(obj) && Boolean(obj[SHUTTLE_KEY]);
}

const defineProperty = (obj, key, value) => Object.defineProperty(obj, key, {value: value});

const keyMirror = (arr) => {
  const ret = {};

  if (!Array.isArray(arr)) {
    return ret;
  }

  arr.forEach((val) => {
    ret[val] = val;
  });

  return ret;
}

export default {
  SHUTTLE_KEY,
  REDUCER_KEY,
  genKey,
  defineProperty,
  isGenerator,
  isShuttle,
  keyMirror
}
