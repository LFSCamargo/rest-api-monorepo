import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border-radius: 100px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 16px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.primary};
`;

interface IProps {
  onClick?: any;
  title: string,
}

const Button = ({ onClick, title }: IProps) => (
  <Wrapper onClick={onClick}>
    {title}
  </Wrapper>
);

export default Button;