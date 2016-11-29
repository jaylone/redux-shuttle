const SHUTTLE_KEY = '@@redux-shuttle/SHUTTLE_KEY';
const REDUCER_KEY = '@@redux-shuttle/REDUCER_KEY';

const genKey = (key) => Symbol(key);

const defineProperty = (obj, key, value) => Object.defineProperty(obj, key, {value: value});

export default {
  SHUTTLE_KEY,
  REDUCER_KEY,
  genKey,
  defineProperty
}
