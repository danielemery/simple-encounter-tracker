import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import party, { partyEpic } from './party';

export const rootEpic = combineEpics(
  partyEpic,
);

export const rootReducer = combineReducers({
  party
});