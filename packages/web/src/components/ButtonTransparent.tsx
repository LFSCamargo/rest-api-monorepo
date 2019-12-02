import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border-radius: 100px;
  background-color: transparent;
  color: black;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 16px;
  margin-top: 15px;
  box-shadow: 0px 0px 10px 0px transparent;
`;

interface IProps {
  onClick?: any;
  title: string,
}

const ButtonTransparent = ({ onClick, title }: IProps) => (
  <Wrapper onClick={onClick}>
    {title}
  </Wrapper>
);

export default ButtonTransparent;