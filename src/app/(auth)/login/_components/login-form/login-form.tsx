'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { loginSchema } from './login-form.schema';
import { LoginFormProps, LoginFormValues } from './login-form.types';

export const LoginForm = ({ onSubmit, isLoading = false, defaultValues }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isSubmitted, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    delayError: 1000,
    defaultValues: defaultValues || {
      email: '',
      password: '',
    },
  });

  const isPending = isLoading || isSubmitting;

  const handleFormSubmit = async (data: LoginFormValues) => {
    if (!data.password) return;
    await onSubmit(data);
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const showEmailError = errors.email && (isSubmitted || touchedFields.email || dirtyFields.email);
  const showPasswordError =
    errors.password && (isSubmitted || touchedFields.password || dirtyFields.password);

  const isButtonActive = isValid && dirtyFields.password && !errors.password;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full" noValidate>
      <FieldGroup className="gap-4">
        <Field orientation="vertical" className="gap-1">
          <FieldLabel htmlFor="email" className="text-base font-normal">
            이메일 <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              disabled={isPending}
              className={cn(
                'focus-visible:ring-sosoeat-gray-900 h-12 rounded-[12px] px-4 text-base transition-all duration-200 focus-visible:ring-1',
                showEmailError && 'border-destructive'
              )}
              {...register('email')}
              aria-invalid={Boolean(showEmailError)}
            />
          </FieldContent>
          {showEmailError && (
            <FieldError className="animate-in fade-in slide-in-from-top-1 text-destructive mt-0.5 duration-200">
              {errors.email?.message}
            </FieldError>
          )}
        </Field>

        <Field orientation="vertical" className="gap-1">
          <FieldLabel htmlFor="password" className="text-base font-normal">
            비밀번호 <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              disabled={isPending}
              className={cn(
                'focus-visible:ring-sosoeat-gray-900 h-12 rounded-[12px] px-4 pr-12 text-base transition-all duration-200 focus-visible:ring-1',
                showPasswordError && 'border-destructive'
              )}
              {...register('password')}
              aria-invalid={Boolean(showPasswordError)}
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 focus-visible:outline-none"
              onClick={toggleShowPassword}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            >
              {showPassword ? <Eye className="size-[22px]" /> : <EyeOff className="size-[22px]" />}
            </button>
          </FieldContent>
          {showPasswordError && (
            <FieldError className="animate-in fade-in slide-in-from-top-1 text-destructive pl-1 duration-200">
              {errors.password?.message}
            </FieldError>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            'mt-2 h-14 w-full rounded-[16px] text-base font-semibold transition-all duration-200 hover:opacity-90',
            isButtonActive
              ? 'bg-sosoeat-orange-600 text-white'
              : 'bg-sosoeat-gray-300 text-sosoeat-gray-700'
          )}
        >
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          로그인
        </Button>
      </FieldGroup>
    </form>
  );
};
