import { IsString, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[!@#$%^&*()_+\-=[{};':"\\|,.<>/?]).+$/, {
    message: '비밀번호는 특수문자를 포함해야 합니다.',
  })
  password: string;
}
