import styled from '@emotion/styled';

export default function Footer() {
  return (
    <Container>
      <Title>ㅎㅇ</Title>
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
  border-top: 2px solid #ddd;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
