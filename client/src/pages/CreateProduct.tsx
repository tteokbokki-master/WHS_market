import styled from '@emotion/styled';
import Container from '../Components/Common/Container';
import Button from '../Components/Common/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCreateProduct } from '../hooks/useProduct';

type FormValues = {
  title: string;
  name: string;
  description: string;
  price: number;
  image: FileList;
};

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate } = useCreateProduct();
  const selectedImage = watch('image');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const file = selectedImage?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('image', data.image[0]);

    mutate(formData);
  };

  return (
    <Container>
      <Form>
        <Header>
          <Title>상품 등록하기</Title>
        </Header>
        <Field>
          <Label>제목</Label>
          <Input {...register('title', { required: '제목을 입력해주세요.' })} placeholder="예시: 최신 아이맥" />
          {errors.title && <Error>{errors.title.message}</Error>}
        </Field>
        <Field>
          <Label>상품명</Label>
          <Input {...register('name', { required: '상품명을 입력해주세요.' })} placeholder="예시: iMac 24 M3" />
          {errors.name && <Error>{errors.name.message}</Error>}
        </Field>
        <Field>
          <Label>설명</Label>
          <Textarea
            {...register('description', { required: '설명을 입력해주세요.' })}
            placeholder="예시: M3 칩 탑재, 블루"
          />
          {errors.description && <Error>{errors.description.message}</Error>}
        </Field>
        <Field>
          <Label>가격</Label>
          <Input
            type="number"
            {...register('price', {
              required: '가격을 입력해주세요.',
              min: { value: 0, message: '0원 이상 입력해주세요.' },
              max: { value: 99999999, message: '최대 99,999,999원까지만 입력 가능합니다.' },
            })}
            placeholder="예시: 1690000"
          />
          {errors.price && <Error>{errors.price.message}</Error>}
        </Field>
        <Field>
          <Label>이미지</Label>
          <Input type="file" accept="image/*" {...register('image')} />
          {imagePreview && <Preview src={imagePreview} alt="미리보기" />}
        </Field>
        <Button onClick={handleSubmit(onSubmit)}>상품 등록</Button>
      </Form>
    </Container>
  );
}

const Form = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 100px;
  resize: none;
`;

const Error = styled.span`
  color: red;
  font-size: 13px;
`;

const Preview = styled.img`
  margin-top: 10px;
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid #eee;
`;
