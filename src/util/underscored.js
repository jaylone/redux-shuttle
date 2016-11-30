import { toUpper, toLower, pipe } from 'ramda';

const underscored = (str) => {
  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/([A-Z\d])([A-Z\d][a-z])/g, '$1_$2')
            .replace(/[-\s]+/g, '_');
}

const upperSnakeCase = pipe(underscored, toUpper);

const lowerSnakeCase = pipe(underscored, toLower);

export default {
  underscored,
  upperSnakeCase,
  lowerSnakeCase
}
