import { Saga } from 'redux-saga'
import { all, spawn } from 'redux-saga/effects';
import login from './user/login';
import signUp from './user/signup';
import getMe from './user/get';

const sagas: Saga[] = [
  login,
  signUp,
  getMe,
];

export default function* root() {
  yield all(sagas.map(saga => spawn(saga)))
};