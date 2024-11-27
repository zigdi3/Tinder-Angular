import { MATCHES_LOAD, MESSAGES_LOAD } from './matches.actions';
import { initialState } from './matches.state';

function loadMatches(state: any, matches: any) {
  return Object.assign({}, state, { matches });
}

function loadMessages(state: any, messages: any) {
  return Object.assign({}, state, { messages });
}

export function matchesReducer(state = initialState, action: any) {
  switch (action.type) {
    case MATCHES_LOAD:
      return loadMatches(state, action.matches);
    case MESSAGES_LOAD:
      return loadMessages(state, action.messages);
    default:
      return state;
  }
}
