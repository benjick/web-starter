import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

export default createLogger({
  predicate: () => process.env.NODE_ENV === `development`,
  stateTransformer: (state) => {
    const newState = {};

    for (const i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  },
});
