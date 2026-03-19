'use client';

import Link from 'next/link';

import { GoogleIcon, KakaoIcon } from './_components/icons';
import { LoginForm, LoginFormValues } from './_components/login-form';

export default function LoginPage() {
  const handleLogin = async (data: LoginFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Login data:', data);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="bg-sosoeat-gray-100 flex h-[592px] min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-[568px] flex-col rounded-[24px] bg-white px-4 py-6 shadow-sm transition-all duration-200 ease-in-out sm:rounded-[40px] sm:px-[56px] sm:pt-[48px] sm:pb-[44px]">
        <h1 className="mb-10 text-center text-2xl font-bold">로그인</h1>

        <LoginForm onSubmit={handleLogin} />

        <div className="relative mt-10 flex items-center justify-center">
          <div className="border-sosoeat-gray-400 absolute w-full border-t"></div>
          <span className="text-sosoeat-gray-600 relative bg-white px-4 text-base font-medium">
            SNS 계정으로 로그인
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center gap-[12px] sm:flex-row sm:gap-[16px]">
          <button
            type="button"
            className="flex h-[48px] w-full items-center justify-center gap-[12px] rounded-[12px] border border-gray-300 bg-white text-base font-semibold text-slate-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 focus:outline-none sm:flex-1"
          >
            <GoogleIcon />
            구글로 계속하기
          </button>

          <button
            type="button"
            className="flex h-[48px] w-full items-center justify-center gap-[12px] rounded-[12px] bg-[#FFEE01] text-base font-semibold text-slate-800 opacity-90 hover:opacity-100 focus:ring-2 focus:ring-[#FFEE01] focus:ring-offset-1 focus:outline-none sm:flex-1"
          >
            <KakaoIcon />
            카카오로 계속하기
          </button>
        </div>

        <p className="text-sosoeat-gray-800 pt-10 text-center text-base font-medium">
          같이달램이 처음이신가요?{' '}
          <Link href="/signup" className="text-sosoeat-orange-600 underline underline-offset-4">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
