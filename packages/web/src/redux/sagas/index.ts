import { Saga } from 'redux-saga'
import { all, spawn } from 'redux-saga/effects';
import login from './user/login';

const sagas: Saga[] = [
  login
];

export default function* root() {
  yield all(sagas.map(saga => spawn(saga)))
};