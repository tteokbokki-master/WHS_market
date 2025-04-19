import styled from '@emotion/styled';
import Logo from '../../public/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth, useLogoutUser } from '../hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const logout = useLogoutUser();
  const { data: user } = useAuth();
  const route = user?.isAdmin ? '/admin' : '/mypage';
  const handleLogoClick = () => {
    navigate(`/`);
  };

  const handleMypageClick = () => {
    navigate(route);
  };

  return (
    <Container>
      <LogoBox onClick={handleLogoClick}>
        <LogoImg src={Logo} alt="logo" draggable="false" />
        <Title>화햇마켓 {user?.isAdmin && '[관리자용]'}</Title>
      </LogoBox>
      <InfoBox>
        <Title onClick={handleMypageClick}>{user?.isAdmin ? '관리자 페이지' : '마이페이지'}</Title>
        <Title onClick={() => logout.mutate()}>로그아웃</Title>
      </InfoBox>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  width: 70%;
  max-width: 1200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px auto;
`;

const LogoBox = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 16px;
  cursor: pointer;
`;
const LogoImg = styled.img`
  width: 80px;
  height: auto;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-bottom: 16px;
  gap: 20px;
`;
