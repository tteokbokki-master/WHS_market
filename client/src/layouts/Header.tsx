import styled from '@emotion/styled';
import Logo from '../../public/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(`/`);
  };

  const handleMypageClick = () => {
    navigate(`/mypage`);
  };

  return (
    <Container>
      <LogoBox onClick={handleLogoClick}>
        <LogoImg src={Logo} alt="logo" draggable="false" />
        <Title>화햇마켓</Title>
      </LogoBox>
      <InfoBox>
        <Title onClick={handleMypageClick}>마이페이지</Title>
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
  // border-bottom: 2px solid #ddd;
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
`;
