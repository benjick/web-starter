import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import { Record } from 'immutable';

const initialState = Record({
  value: 0,
});

export default function counter(state = new initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.set('value', state.value + 1);
    case DECREMENT_COUNTER:
      return state.set('value', state.value - 1);
    default:
      return state;
  }
}
