import styled from '@emotion/styled';

export default function Footer() {
  return (
    <Container>
      <Title>2025 WHS-3기 | Secure Coding 과제 | 36반 이용진</Title>
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px auto;
  border-top: 2px solid #ddd;
`;

const Title = styled.p`
  text-align: center;
  font-size: 18px;
  color: #999;
  padding: 16px 0;
  margin-top: 40px;
`;
