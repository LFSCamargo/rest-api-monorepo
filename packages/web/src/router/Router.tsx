import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { IGlobalState } from '../redux/ducks';
import { tokenUpdate } from '../redux/ducks/user/user';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import Loading from '../components/Loading';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  tokenUpdate: (token: string | null) => void;
  token: string | null;
}

const Router: React.FunctionComponent<IProps> = props => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    props.tokenUpdate(token);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (!props.token) {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Route exact={true} path="/" component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default connect(
  (state: IGlobalState) => {
    const { token } = state.user;
    return {
      token,
    };
  },
  (dispatch: Dispatch) => {
    return {
      tokenUpdate: (token: string | null) => dispatch(tokenUpdate(token)),
    };
  },
)(Router);
