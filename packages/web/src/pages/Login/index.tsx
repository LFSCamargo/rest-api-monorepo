import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ButtonTransparent from '../../components/ButtonTransparent';
import { Dispatch } from 'redux';
import { login } from '../../redux/ducks/user/user';
import { IGlobalState } from '../../redux/ducks';
import Loading from '../../components/Loading';
import { withRouter, RouterProps } from 'react-router';

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

interface IProps extends RouterProps {
  login(email: string, password: string): void;
  loading: boolean;
  error: string | null;
}

const Login: React.FunctionComponent<IProps> = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');

  return (
    <Wrapper>
      <div>
        <h1>Login</h1>
        <p>Fill the fields to do the Login</p>
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {props.loading ? <ul><Loading /></ul> : <Button onClick={() => props.login(email, password)} title="Login" />}
        <ButtonTransparent onClick={() => props.history.push('/signup')} title="Dont have a account? Register here" />
        {props.error && <span>{props.error}</span>}
      </div>
    </Wrapper>
  )
};

export default withRouter(connect(
  (state: IGlobalState) => {
    return {
      loading: state.user.loadingLogin,
      error: state.user.loginError,
    };
  },
  (dispatch: Dispatch) => {
    return {
      login: (email: string, password: string) => dispatch(login(email, password)),
    };
  },
)(Login));
