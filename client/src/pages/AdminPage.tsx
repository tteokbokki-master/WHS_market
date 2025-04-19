import styled from '@emotion/styled';
import dayjs from 'dayjs';
import {
  useAdminUsers,
  useAdminProducts,
  useDeleteUser,
  useDeleteProductByAdmin,
  useUpdateUser,
} from '../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AdminPage() {
  const nav = useNavigate();
  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      nav('/');
    }
  }, [user, isLoading, nav]);

  const { data: products = [], refetch: refetchProducts } = useAdminProducts();
  const { data: users = [], refetch: refetchUsers } = useAdminUsers();
  const { mutate: deleteProduct } = useDeleteProductByAdmin();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();

  const [userInputs, setUserInputs] = useState<
    Record<number, { username: string; introduce: string; banUntil: string }>
  >({});

  const handleDeleteProduct = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
      deleteProduct(id, { onSuccess: () => refetchProducts() });
    }
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('정말 이 유저를 삭제하시겠습니까?')) {
      deleteUser(id, { onSuccess: () => refetchUsers() });
    }
  };

  const handleInputChange = (id: number, field: 'username' | 'introduce' | 'banUntil', value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdateUser = (id: number) => {
    const update = userInputs[id];
    if (!update) return;
    updateUser(
      {
        id,
        update,
      },
      {
        onSuccess: () => refetchUsers(),
      }
    );
  };

  return (
    <MypageContainer>
      <MyPageHeader>
        <MainTitle>관리자 페이지</MainTitle>
      </MyPageHeader>

      <ProductSection>
        <SubTitle>전체 상품 목록</SubTitle>
        {products.map(product => (
          <ProductItem key={product.id} onClick={() => nav(`/product/${product.id}`)}>
            <P1>{product.title}</P1>
            <SmallButton type="button" onClick={e => handleDeleteProduct(e, product.id)}>
              삭제
            </SmallButton>
          </ProductItem>
        ))}
      </ProductSection>

      <UserSection>
        <SubTitle>유저 목록</SubTitle>
        {users.map(user => (
          <UserItem key={user.id}>
            <InfoRow>
              <Label>닉네임</Label>
              <P1>{user.username}</P1>
            </InfoRow>
            <InfoRow>
              <Label>자기소개</Label>
              <P1>{user.introduce || '소개 없음'}</P1>
            </InfoRow>
            <InfoRow>
              <Label>정지기간</Label>
              <P1>
                {user.banUntil && dayjs(user.banUntil).isAfter(dayjs())
                  ? dayjs(user.banUntil).format('YYYY년 MM월 DD일 HH시 mm분 ss초')
                  : '정지 없음'}
              </P1>
            </InfoRow>
            <EditBox>
              <Input
                placeholder="유저 닉네임 수정"
                value={userInputs[user.id]?.username || ''}
                onChange={e => handleInputChange(user.id, 'username', e.target.value)}
              />
              <Input
                placeholder="유저 소개 수정"
                value={userInputs[user.id]?.introduce || ''}
                onChange={e => handleInputChange(user.id, 'introduce', e.target.value)}
              />
              <Input
                type="datetime-local"
                value={userInputs[user.id]?.banUntil || ''}
                onChange={e => handleInputChange(user.id, 'banUntil', e.target.value)}
              />
            </EditBox>
            <ButtonBox>
              <SmallButton type="button" onClick={() => handleUpdateUser(user.id)}>
                수정 적용
              </SmallButton>
              <SmallButton type="button" onClick={() => handleDeleteUser(user.id)}>
                유저삭제
              </SmallButton>
            </ButtonBox>
          </UserItem>
        ))}
      </UserSection>
    </MypageContainer>
  );
}

const MypageContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const MyPageHeader = styled.div`
  flex: 1.5;
  height: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: end;
  border-bottom: 2px solid #ddd;
`;

const MainTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: red;
  margin: 10px;
`;

const SubTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
  align-self: start;
`;

const ProductSection = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductItem = styled.div`
  width: 80%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const P1 = styled.p`
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
`;

const SmallButton = styled.button`
  font-size: 16px;
  padding: 6px;
  margin: 6px;
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
  }
`;

const UserSection = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserItem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
`;

const EditBox = styled.div`
  display: flex;
  gap: 10px;
  margin: 8px 0;
  flex-wrap: wrap;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  min-width: 180px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Label = styled.div`
  width: 80px;
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;
