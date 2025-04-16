import styled from '@emotion/styled';
import ProductItem from '../Components/ProductItem/ProductItem';
import Container from '../Components/Common/Container';
import Button from '../Components/Common/Button';
import BroadCastBox from '../Components/ChatBox';
import { useAllProducts } from '../hooks/useProduct';

export default function Home() {
  const { data: productList, isLoading, isError } = useAllProducts();
  return (
    <Container>
      <ProductBox className=" 상품">
        <ProductHeader className=" 상품목록멘트, 등록하기 버튼">
          <Title>상품목록</Title>
          <Button>{'상품 등록하기'}</Button>
        </ProductHeader>
        <ProductList className=" 상품 리스트">
          {isLoading && <p>로딩 중...</p>}
          {isError && <p>상품을 불러오는데 실패했습니다.</p>}
          {productList?.map(item => (
            <ProductItem key={item.id} product={item} />
          ))}
        </ProductList>
      </ProductBox>
      <ChatBox className=" 전체 채팅">
        <BroadCastBox />
      </ChatBox>
    </Container>
  );
}

const ProductBox = styled.div`
  flex: 7;
  // background: black;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  flex: 3;
  // background: yellow;
  height: 100%;
  border-radius: 4px;
`;

const ProductHeader = styled.div`
  // background: blue;
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
  // background: skyblue;
  height: 100%;
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
