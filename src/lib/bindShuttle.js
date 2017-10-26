import { connect } from 'react-redux';
import { isObject } from '../util/validator';
import { isShuttle } from '../util/helper';
import mapShuttleState from './mapShuttleState';
import mapShuttleDispatch from './mapShuttleDispatch';

export default (shuttles, mergeProps, options = {}) => {
  let mapStateToProps, mapDispatchToProps;

  if (!isObject(shuttles)) {
    throw new Error('bindShuttle required \'shuttle\' or  \'object\'');
  }

  return connect(
    mapShuttleState(isShuttle(shuttles) ? { shuttle: shuttles } : shuttles),
    mapShuttleDispatch(shuttles),
    mergeProps,
    options
  );
}
