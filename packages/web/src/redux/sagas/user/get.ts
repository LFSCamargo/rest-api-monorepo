import { takeLatest, put, call, select } from 'redux-saga/effects';
import { GET_USER, GET_USER_FAIL, GET_USER_SUCCESS, CLEAR_TOKEN } from '../../../redux/ducks/user/user';
import { eres } from '../../../utils';
import { IGlobalState } from 'src/redux/ducks';

const getMe = async (token: string) => await fetch('http://localhost:4000/api/me', {
  method: 'GET',
  headers: {
    authorization: token,
  }
});

function* get() {
  const { user }: IGlobalState = yield select();
  const { token } = user;

  const localStorageToken = localStorage.getItem('token') || '';

  const [res, err] = yield call(eres, getMe(token || localStorageToken));

  if (err) {
    return yield put({
      type: GET_USER_FAIL,
      error: err.message,
    })
  }

  const { id, name, email, error } = yield res.json();

  if (error) {
    if (error === 'Invalid token') {
      localStorage.removeItem('token');
      yield put({
        type: CLEAR_TOKEN,
      })
    }
    return yield put({
      type: GET_USER_FAIL,
      error,
    })
  }

  if (!error) {
    return yield put({
      type: GET_USER_SUCCESS,
      storedUser: {
        id,
        name,
        email
      }
    })
  }
};

export default function* getUser() {
  yield takeLatest(GET_USER, get);
};