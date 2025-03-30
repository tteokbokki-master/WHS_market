import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './Header';

export default function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Container>
      <Inner>
        {!isAuthPage && <Header />}
        <Outlet />
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: 70%;
  max-width: 1200px;
  height: 100%;
  background-color: gray; // 배경 체크할 때
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
