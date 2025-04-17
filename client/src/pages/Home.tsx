import styled from '@emotion/styled';
import ProductItem from '../Components/ProductItem/ProductItem';
import Container from '../Components/Common/Container';
import Button from '../Components/Common/Button';
import BroadCastBox from '../Components/ChatBox';
import { useAllProducts } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { data: productList, isLoading, isError } = useAllProducts();
  const nav = useNavigate();
  const handleClick = () => {
    nav('/createProduct');
  };
  return (
    <Container>
      <ProductBox>
        <ProductHeader>
          <Title>상품목록</Title>
          <Button onClick={handleClick}>{'상품 등록하기'}</Button>
        </ProductHeader>
        <ProductList>
          {isLoading && <p>로딩 중...</p>}
          {isError && <p>상품을 불러오는데 실패했습니다.</p>}
          {productList?.length === 0 && <EmptyMessage>등록된 상품이 없습니다.</EmptyMessage>}
          {productList?.map(item => (
            <ProductItem key={item.id} product={item} />
          ))}
        </ProductList>
      </ProductBox>
      <ChatBox>
        <BroadCastBox />
      </ChatBox>
    </Container>
  );
}

const ProductBox = styled.div`
  flex: 7;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  flex: 3;
  height: 100%;
  border-radius: 4px;
`;

const ProductHeader = styled.div`
  flex: 1.5;
  height: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: end;
  border-bottom: 2px solid #ddd;
`;

const ProductList = styled.div`
  flex: 8.5;
  height: 100%;
  padding: 10px;
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 16px;
  overflow-y: auto;
  max-height: calc(155px * 4 + 16px * 3 + 32px);
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: rgb(60, 179, 113);
  margin: 10px;
`;

const EmptyMessage = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 20px;
`;
