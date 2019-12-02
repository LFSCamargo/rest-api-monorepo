import * as React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ButtonTransparent from '../../components/ButtonTransparent';

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
  }
`;

interface IProps {}

const SignUp: React.FunctionComponent<IProps> = ({}) => (
  <Wrapper>
    <div>
      <h1>Sign Up</h1>
      <p>Fill the fields to do the Sign Up</p>
      <Input placeholder="Email" />
      <Input placeholder="Name" />
      <Input placeholder="Password" />
      <Button title="Sign Up" />
      <ButtonTransparent title="Already have a account? Login here" />
    </div>
  </Wrapper>
);

export default SignUp;
