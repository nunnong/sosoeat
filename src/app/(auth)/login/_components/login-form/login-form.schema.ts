import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, '').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '').min(8, '비밀번호가 8자 이상이 되도록 해 주세요.'),
});
