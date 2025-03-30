import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Container>
      {!isAuthPage && <Header />}
      <Content>
        <Outlet />
      </Content>
      {!isAuthPage && <Footer />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 70%;
  max-width: 1200px;
  flex: 1;
  // background-color: gray;
`;
