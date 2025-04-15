import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useLoginUser } from '../../hooks/useAuth';

interface LoginData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const loginUser = useLoginUser();

  const onSubmit = (data: LoginData) => {
    loginUser.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Text>로그인</Text>
      </Box>
      <InputGroup>
        <Label></Label>
        <Input placeholder="아이디" type="text" {...register('username', { required: '아이디를 입력해 주세요.' })} />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label></Label>
        <Input
          placeholder="비밀번호"
          type="password"
          {...register('password', { required: '비밀번호를 입력해 주세요.' })}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </InputGroup>

      <Button type="submit">로그인</Button>
      <Box>
        <SignupLink to="/signup">회원가입</SignupLink>
      </Box>
    </Form>
  );
}

const Form = styled.form`
  max-width: 350px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  // background-color: red;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #lightgray;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #66cdaa;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const Box = styled.div`
  width: 100%;
  text-align: center;
`;
const SignupLink = styled(Link)`
  margin-top: 12px;
  font-size: 14px;
  color: #555;
  color: #lightgray;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;
