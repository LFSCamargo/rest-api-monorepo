import { takeLatest, put, call } from 'redux-saga/effects';
import { SIGNUP, IUserAction, SIGNUP_FAIL, SIGNUP_SUCCESS } from '../../../redux/ducks/user/user';
import { eres } from '../../../utils';

interface IResponse {
  token?: string;
  error?: string;
}

const trySignUp = async (email: string, name: string, password: string) => await fetch('http://localhost:4000/api/signUp',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4000'
  },
  body: JSON.stringify({
    email,
    password,
    name
  })
})

function* signUp(action: IUserAction) {
  const { email, password, name } = action;

  if (!email || !password || !name) {
    return yield put({
      type: SIGNUP_FAIL,
      error: 'Please fill all the fields',
    })
  }

  const [res, err] = yield call(eres, trySignUp(email, name, password));

  if (err) {
    return yield put({
      type: SIGNUP_FAIL,
      error: err.message,
    })
  }

  const { token, error }: IResponse = yield res.json();

  if (error) {
    return yield put({
      type: SIGNUP_FAIL,
      error,
    })
  }

  yield action.history.push('/');

  if (token) {
    localStorage.setItem('token', token);
    return yield put({
      type: SIGNUP_SUCCESS,
      token,
    })
  }
};

export default function* signUpSaga() {
  yield takeLatest(SIGNUP, signUp)
};