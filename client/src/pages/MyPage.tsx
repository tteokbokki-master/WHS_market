import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Button from '../Components/Common/Button';
import { useUpdateIntroduce, useUpdatePassword } from '../hooks/useAuth';
import { useAuth } from '../hooks/useAuth';

interface FormValues {
  introduce: string;
  password: string;
}

export default function Mypage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const { data: user = '' } = useAuth();
  const { mutate: updateIntroduce } = useUpdateIntroduce();
  const { mutate: updatePassword } = useUpdatePassword();

  const onIntroduceSubmit = () => {
    const { introduce } = getValues();
    updateIntroduce(introduce);
  };

  const onPasswordSubmit = handleSubmit(data => {
    updatePassword(data.password);
  });

  return (
    <MypageContainer>
      <MyPageHeader>
        <MainTitle>'{user.username}'님의 마이페이지</MainTitle>
      </MyPageHeader>

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
            placeholder="비밀번호"
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
`;
