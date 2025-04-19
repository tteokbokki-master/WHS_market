import styled from '@emotion/styled';
import ProductItem from '../Components/ProductItem/ProductItem';
import Container from '../Components/Common/Container';
import Button from '../Components/Common/Button';
import BroadCastBox from '../Components/ChatBox';
import { useAllProducts, useSearchProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface Product {
  id: number;
  title: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const { data: searchResults } = useSearchProduct(search);
  const { data: allProducts, isLoading, isError } = useAllProducts();
  const nav = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setSearch('');
    }
  }, [query]);

  const handleClick = () => nav('/createProduct');

  const handleSearch = () => {
    const trimmed = query.trim();
    setSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const isSearching = search !== '';
  const productList = isSearching ? searchResults : allProducts;

  return (
    <Container>
      <ProductBox>
        <ProductHeader>
          <Title>상품목록</Title>
          <Button onClick={handleClick}>상품 등록하기</Button>
        </ProductHeader>

        <SearchBox>
          <SearchInput
            type="text"
            placeholder="상품명으로 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchBox>

        <ProductList>
          {isLoading && <p>로딩 중...</p>}
          {isError && <p>상품을 불러오는데 실패했습니다.</p>}
          {!isSearching && allProducts?.length === 0 && <EmptyMessage>등록된 상품이 없습니다.</EmptyMessage>}
          {isSearching && searchResults?.length === 0 && <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>}
          {productList?.map((item: Product) => (
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

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 10px 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  padding: 10px 16px;
  background-color: #3cb371;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
`;
