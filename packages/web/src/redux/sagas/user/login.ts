// tslint:disable: no-console
import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN, IUserAction, LOGIN_FAIL, LOGIN_SUCCESS } from '../../../redux/ducks/user/user';
import { eres } from '../../../utils';

interface IResponse {
  token?: string;
  error?: string;
}

const tryLogin = async (email: string, password: string) => await fetch('http://localhost:4000/api/login',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4000'
  },
  body: JSON.stringify({
    email,
    password
  })
})

function* login(action: IUserAction) {
  const { email, password } = action;

  if (!email || !password) {
    return yield put({
      type: LOGIN_FAIL,
      error: 'Please fill all the fields',
    })
  }

  const [res, err] = yield call(eres, tryLogin(email, password));

  if (err) {
    console.log('err', err);
    
    return yield put({
      type: LOGIN_FAIL,
      error: err.message,
    })
  }

  const { token, error }: IResponse = yield res.json();

  if (error) {
    return yield put({
      type: LOGIN_FAIL,
      error,
    })
  }

  if (token) {
    return yield put({
      type: LOGIN_SUCCESS,
      token,
    })
  }
};

export default function* loginSaga() {
  yield takeLatest(LOGIN, login)
};