import { useForm } from 'react-hook-form';
import { useCheckUsername, useRegisterUser } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect } from 'react';

interface UserData {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserData>();

  const password = watch('password');
  const username = watch('username');

  useEffect(() => {
    checkUsername.reset();
  }, [username]);

  const checkUsername = useCheckUsername();
  const registerUser = useRegisterUser();

  const onSubmit = (data: UserData) => {
    if (checkUsername.data === undefined) {
      alert('아이디 중복 확인을 먼저 해주세요.');
      return;
    }

    if (checkUsername.data.isTaken) {
      alert('이미 사용 중인 아이디입니다.');
      return;
    }

    registerUser.mutate({ username: data.username, password: data.password });
  };

  const handleCheckUsername = () => {
    if (!username || username.trim() === '') {
      alert('아이디를 입력해 주세요.');
      return;
    }
    checkUsername.mutate(username);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Text>회원가입</Text>
      </Box>
      <InputGroup>
        <Row>
          <Input placeholder="아이디" {...register('username', { required: '아이디를 입력해 주세요.' })} />
          <CheckButton type="button" onClick={handleCheckUsername} disabled={checkUsername.isPending}>
            {checkUsername.isPending ? '확인 중...' : '중복 확인'}
          </CheckButton>
        </Row>
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      </InputGroup>

      <InputGroup>
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
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Input
          placeholder="비밀번호 확인"
          type="password"
          {...register('confirmPassword', {
            required: '비밀번호를 한 번 더 입력해 주세요.',
            validate: value => value === password || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
      </InputGroup>

      <Button type="submit">회원가입</Button>

      <Box>
        <SignupLink to="/login">← 로그인으로 돌아가기</SignupLink>
      </Box>
    </Form>
  );
}
const Form = styled.form`
  max-width: 350px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  gap: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
  }
`;

const CheckButton = styled.button`
  padding: 10px 14px;
  font-size: 13px;
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
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
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;
