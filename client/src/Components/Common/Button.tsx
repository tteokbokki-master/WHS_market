import styled from '@emotion/styled';
import { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <RegisterButton onClick={onClick} type="button">
      {children}
    </RegisterButton>
  );
}

const RegisterButton = styled.button`
  font-size: 16px;
  padding: 12px 18px;
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
  }
`;
