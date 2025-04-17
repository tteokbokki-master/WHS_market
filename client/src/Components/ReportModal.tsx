import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useProductReport, useUserReport } from '../hooks/useReport';

import Button from './Common/Button';
interface ReportModalProps {
  type: 'product' | 'user';
  productId?: number;
  reportedUserId?: number;
  username?: string;
  onClose: () => void;
}

interface ReportForm {
  content: string;
}

export default function ReportModal({ type, onClose, reportedUserId, productId, username }: ReportModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportForm>();

  const productReport = useProductReport();
  const userReport = useUserReport();

  const onSubmit = (data: ReportForm) => {
    if (type === 'product' && productId) {
      productReport.mutate({ productId, content: data.content });
    } else if (type === 'user' && reportedUserId) {
      userReport.mutate({ reportedUserId, content: data.content });
    }
    onClose();
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>{type === 'product' ? '이 상품을 신고하시겠습니까?' : `작성자 '${username}' 신고`}</Title>
        <Form>
          <Label>신고 사유</Label>
          <Textarea
            {...register('content', { required: '신고 사유를 입력해주세요.' })}
            placeholder="신고 내용을 입력하세요"
          />
          {errors.content && <ErrorText>{errors.content.message}</ErrorText>}
          <Button onClick={handleSubmit(onSubmit)}>신고하기</Button>
        </Form>
        <Close onClick={onClose}>✕</Close>
      </ModalBox>
    </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: relative;
  width: 350px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  height: 100px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 13px;
`;

const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
`;
