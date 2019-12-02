import * as React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { IGlobalState } from '../../redux/ducks';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUser, IUser, CLEAR_TOKEN } from '../../redux/ducks/user/user';
import Loading from 'src/components/Loading';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 20px;
    padding-left: 8px;
    font-size: 30px;
  }
  p {
    font-weight: lighter;
    margin-top: 0px;
    margin-bottom: 20px;
    padding-left: 8px;
    font-size: 18px;
  }
  div {
    width: 400px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #c6c6c6;
    display: flex;
    flex-direction: column;
    padding: 30px;
    ul {
      align-items: center;
      justify-content: center;
      width: 80%;
      height: 80%;
      display: flex;
      margin-top: 10px;
    }
  }
  span {
    font-weight: lighter;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 8px;
    font-size: 18px;
    color: red;
    width: 100%;
    text-align: center;
  }
`;

interface IProps {
  loading: boolean;
  error: string | null;
  user: IUser | null;
  getMe: () => void;
  clearToken: () =>  void;
}

const Home: React.FunctionComponent<IProps> = props => {
  React.useEffect(() => {
    props.getMe();
  }, []);

  if (props.error) {
    return (
      <Wrapper>
        <div>
          <span>{props.error}</span>
        </div>
      </Wrapper>
    );
  }

  if (props.loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h1>Welcome</h1>
        <p>Name - {props.user && props.user.name}</p>
        <p>Email - {props.user && props.user.email}</p>
        <Button title="Logout" onClick={() => {
          localStorage.removeItem('token');
          props.clearToken();
        }} />
      </div>
    </Wrapper>
  );
};

export default connect(
  (state: IGlobalState) => {
    return {
      user: state.user.storedUser,
      loading: state.user.isLoading,
      error: state.user.error,
    };
  },
  (dispatch: Dispatch) => {
    return {
      getMe: () => dispatch(getUser()),
      clearToken: () => dispatch({ type: CLEAR_TOKEN }),
    };
  },
)(Home);
