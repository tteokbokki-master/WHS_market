import styled from '@emotion/styled';
import { ProductType } from '../../dummy/Products';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductItem({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Image src={product.imageUrl} alt={product.name} />
      <Name>{product.title}</Name>
      <Price>{product.price.toLocaleString()}원</Price>
    </Card>
  );
}

const Card = styled.div`
  width: 70%;
  background: white;
  border-radius: 8px;
  padding: 16px;
  // border: 1px solid #e0f2ef;
  box-shadow: 0 2px 8px rgba(60, 179, 113, 0.2);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 14px;
  color: #666;
`;
