import styled from '@emotion/styled';
import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 100px;
  }
`;
