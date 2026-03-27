export type LoginFormValues = {
  email: string; // 이메일
  password: string; // 비밀번호
};

export interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void | Promise<unknown>;
  isLoading?: boolean;
  defaultValues?: Partial<LoginFormValues>;
}
