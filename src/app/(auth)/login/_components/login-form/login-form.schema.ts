import { z } from 'zod';

export const TEST_ACCOUNT_EMAIL = 'test@test.com';
export const TEST_ACCOUNT_PASSWORD = 'password123!';

export const loginSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string(),
  })
  .refine((data) => data.email === TEST_ACCOUNT_EMAIL || data.email === '', {
    message: '존재하지 않는 아이디입니다.',
    path: ['email'],
  })
  .refine((data) => data.password === TEST_ACCOUNT_PASSWORD || data.password === '', {
    message: '비밀번호가 아이디와 일치하지 않습니다.',
    path: ['password'],
  });
