import styled from '@emotion/styled';
import { ProductType } from '../../dummy/Products';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductItem({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <ImageWrapper>
        {!imgLoaded && <Skeleton />}
        <Image
          src={imgError ? '/no-image.png' : product.imageUrl}
          alt={product.name}
          onError={() => setImgError(true)}
          onLoad={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? 'block' : 'none' }}
        />
      </ImageWrapper>
      <Name>{product.title}</Name>
      <Name>{product.name}</Name>
      <Price>{product.price.toLocaleString()}원</Price>
    </Card>
  );
}

const Card = styled.div`
  width: 80%;
  background: white;
  border-radius: 8px;
  padding: 16px;
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
  margin: 5px;
`;

const Price = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

const Skeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
`;
