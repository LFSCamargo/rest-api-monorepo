import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 400px;
    height: 400px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px #c6c6c6;
  }
`;

interface IProps {}

const Home: React.FunctionComponent<IProps> = ({}) => <Wrapper>
  <div />
</Wrapper>

export default Home;