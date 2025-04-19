import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Button from '../Components/Common/Button';
import { useSearchUsers, useUpdateIntroduce, useUpdatePassword } from '../hooks/useAuth';
import { useAuth } from '../hooks/useAuth';
import { useDeleteProduct, useMyProducts } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import { useWalletBalance } from '../hooks/useWallet';
import { useState } from 'react';

interface FormValues {
  introduce: string;
  password: string;
}

export default function Mypage() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const { data: user = '' } = useAuth();
  const { mutate: updateIntroduce } = useUpdateIntroduce();
  const { mutate: updatePassword } = useUpdatePassword();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const { data: searchedUsers = [] } = useSearchUsers(submittedKeyword);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedKeyword(searchKeyword.trim());
  };

  const onIntroduceSubmit = () => {
    const { introduce } = getValues();
    updateIntroduce(introduce);
  };

  const onPasswordSubmit = handleSubmit(data => {
    updatePassword(data.password);
  });

  const { data: myProducts = [], refetch } = useMyProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: wallet } = useWalletBalance();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteProduct(id, {
        onSuccess: () => refetch(),
      });
    }
  };

  return (
    <MypageContainer>
      <MyPageHeader>
        <MainTitle>'{user.username}'님의 마이페이지</MainTitle>
        {wallet && <Balance>잔액: {wallet.balance.toLocaleString()}원</Balance>}
      </MyPageHeader>

      <ProductSection>
        <SubTitle>내 상품 목록</SubTitle>
        {myProducts.map(product => (
          <ProductItem key={product.id} onClick={() => nav(`/product/${product.id}`)}>
            <P1>{product.title}</P1>
            <SmallButton type="button" onClick={e => handleDelete(e, product.id)}>
              삭제
            </SmallButton>
          </ProductItem>
        ))}
      </ProductSection>

      <Introduce>
        <SubTitle>소개</SubTitle>
        <InlineBox>
          <FixedTextarea placeholder={user.introduce} {...register('introduce')} />
          <Button onClick={onIntroduceSubmit}>수정</Button>
        </InlineBox>
      </Introduce>

      <PwChange>
        <SubTitle>비밀번호 수정</SubTitle>
        <InlineBox>
          <Input
            placeholder="비밀번호 수정"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              pattern: {
                value: /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message: '8자 이상, 특수문자를 포함해야 합니다.',
              },
            })}
          />
          <Button onClick={onPasswordSubmit}>수정</Button>
        </InlineBox>
        {typeof errors.password?.message === 'string' && <ErrorText>{errors.password.message}</ErrorText>}
      </PwChange>

      <SearchSection>
        <SubTitle>유저 검색</SubTitle>
        <SearchBox>
          <Input placeholder="닉네임으로 검색" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
          <Button onClick={handleSearchSubmit}>검색</Button>
        </SearchBox>
      </SearchSection>

      {searchedUsers.length > 0 && (
        <UserListSection>
          {searchedUsers.map((user: { id: number; username: string; introduce?: string }) => (
            <UserItem key={user.id}>
              <P1>{user.username}</P1>
              <Intro>{user.introduce || '소개가 없습니다.'}</Intro>
            </UserItem>
          ))}
        </UserListSection>
      )}
    </MypageContainer>
  );
}
const MypageContainer = styled.form`
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

const Introduce = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: none;
`;

const PwChange = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: none;
`;

const InlineBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FixedTextarea = styled.textarea`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  height: 80px;
  line-height: 1.5;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const MainTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #000;
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

const Balance = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #3cb371;
`;

const SearchSection = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const UserListSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserItem = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
`;

const Intro = styled.p`
  margin-top: 6px;
  color: #555;
  font-size: 14px;
`;
