import { History } from 'history';
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'user/GET_USER_FAIL';
export const GET_USER = 'user/GET_USER';

export const LOGIN = 'user/LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'user/LOGIN_FAIL';

export const SIGNUP = 'user/SIGNUP';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'user/SIGNUP_FAIL';

export const TOKEN_UPDATE = 'user/TOKEN_UPDATE';
export const CLEAR_TOKEN = 'user/CLEAR_TOKEN';

export const tokenUpdate = (token: string | null) => ({
  type: TOKEN_UPDATE,
  token,
});

export const getUser = () => ({
  type: GET_USER,
});

export const login = (email: string, password: string) => ({
  type: LOGIN,
  email,
  password
});

export const signup = (email: string, name: string, password: string, history: History) => ({
  type: SIGNUP,
  email,
  name,
  password,
  history
});

export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface IUserState {
  storedUser: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  loadingLogin: boolean;
  loginError: string | null;
  loadingSignUp: boolean;
  signUpError: string | null;
}

export interface IUserAction {
  type: string;
  error: string;
  storedUser: IUser;
  email: string;
  password: string;
  name: string;
  token: string;
  history: History,
}

const initialState = {
  storedUser: null,
  isLoading: false,
  loadingLogin: false,
  loadingSignUp: false,
  loginError: null,
  signUpError: null,
  error: null,
  token: null,
};

export default (state: IUserState = initialState, action: IUserAction) => {
  switch (action.type) {
    case TOKEN_UPDATE: {
      const { token } = action;
      return {
        ...state,
        token,
      }
    }

    case CLEAR_TOKEN: {
      return {
        ...initialState
      }
    }

    case SIGNUP: {
      return {
        ...state,
        loadingSignUp: true,
        signUpError: null,
      };
    }
    case SIGNUP_SUCCESS: {
      const { token } = action;
      return {
        ...state,
        loadingSignUp: false,
        token,
        signUpError: null,
      };
    }
    case SIGNUP_FAIL: {
      const { error } = action;
      return {
        ...state,
        loadingSignUp: false,
        signUpError: error,
      };
    }

    case LOGIN: {
      return {
        ...state,
        loadingLogin: true,
        signUpError: null,
      };
    }
    case LOGIN_SUCCESS: {
      const { token } = action;
      return {
        ...state,
        loadingLogin: false,
        token,
        signUpError: null,
      };
    }
    case LOGIN_FAIL: {
      const { error } = action;
      return {
        ...state,
        loadingLogin: false,
        loginError: error,
      };
    }

    case GET_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_SUCCESS: {
      const { storedUser } = action;
      return {
        ...state,
        isLoading: false,
        storedUser,
      };
    }
    case GET_USER_FAIL: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
