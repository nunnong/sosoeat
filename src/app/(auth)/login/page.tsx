'use client';

import { LoginForm, LoginFormValues } from './_components/login-form';
import { LoginLayout } from './_components/login-layout/login-layout';

export default function LoginPage() {
  /**
   * 사용자가 입력한 데이터를 바탕으로 로그인을 시도합니다.
   * 현재는 테스트를 위해 지연 시간이 있는 Mock 함수로 구현되어 있으며,
   * 추후 백엔드 API와의 실제 연동이 필요한 부분입니다.
   *
   * @param {LoginFormValues} data - 사용자가 입력한 이메일 및 비밀번호 데이터
   */
  const handleLogin = async (data: LoginFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Login data:', data);
        resolve();
      }, 1000);
    });
  };

  return (
    <LoginLayout title="로그인">
      <LoginForm onSubmit={handleLogin} />
    </LoginLayout>
  );
}
