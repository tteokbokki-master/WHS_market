import styled from '@emotion/styled';
import LoginForm from '../Components/LoginForm/Index';
import Logo from '../../public/logo.png';

export default function LoginPage() {
  return (
    <Container>
      <Header>
        <LogoImg src={Logo} alt="logo" draggable="false" />
        <Title>화햇마켓</Title>
      </Header>
      <LoginForm />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80%;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  gap: 8px;
`;

const LogoImg = styled.img`
  width: 80px;
  height: auto;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
