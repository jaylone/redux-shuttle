import { connect } from 'react-redux';
import { isObject } from 'src/util/validator';
import { isShuttle } from 'src/util/helper';
import mapShuttleState from './mapShuttleState';
import mapShuttleDispatch from './mapShuttleDispatch';

export default (shuttles, mergeProps, options = {}) => {
  let mapStateToProps, mapDispatchToProps;

  if (!isObject(shuttles)) {
    throw new Error('bindShuttle required \'shuttle\' or  \'object\'');
  }

  return connect(mapShuttleState(shuttles), mapShuttleDispatch(shuttles), mergeProps, options = {});
}
