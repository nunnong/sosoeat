import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { LoginForm } from './login-form';
import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PASSWORD } from './login-form.schema';

describe('LoginForm (로그인 폼)', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('로그인 폼이 올바르게 렌더링되어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  test('필수 입력값이 비어있을 때 로그인 버튼 클릭 시 이메일 에러 메시지를 표시해야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole('button', { name: /로그인/i });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('올바르지 않은 이메일 형식 입력 후 포커스 이동(blur) 시 1초 뒤 에러 메시지를 표시해야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(
      () => {
        expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('존재하지 않는 이메일 입력 시 "존재하지 않는 아이디입니다." 에러를 표시해야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    fireEvent.change(emailInput, { target: { value: 'notfound@test.com' } });
    fireEvent.blur(emailInput);

    await waitFor(
      () => {
        expect(screen.getByText('존재하지 않는 아이디입니다.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('틀린 비밀번호 입력 시 "비밀번호가 아이디와 일치하지 않습니다." 에러를 표시해야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.blur(passwordInput);

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 아이디와 일치하지 않습니다.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('비밀번호 표시/숨기기 버튼 클릭 시 input 타입이 변경되어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    const toggleButton = screen.getByRole('button', { name: /비밀번호 표시/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('입력 박스에 포커스 시 테두리 색상 변경 클래스(ring)가 포함되어 있어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    expect(emailInput).toHaveClass('focus-visible:ring-sosoeat-gray-900');
  });

  test('로딩 중일 때 모든 입력 요소가 비활성화되어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} isLoading={true} />);

    expect(screen.getByLabelText(/이메일/i)).toBeDisabled();
    expect(screen.getByLabelText(/비밀번호/i, { selector: 'input' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeDisabled();
  });

  test('유효한 데이터 입력 시 로그인 버튼이 활성화되고 클릭 시 onSubmit이 호출되어야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    const submitButton = screen.getByRole('button', { name: /로그인/i });

    expect(submitButton).toHaveClass('bg-sosoeat-gray-300');

    fireEvent.change(emailInput, { target: { value: TEST_ACCOUNT_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: TEST_ACCOUNT_PASSWORD } });

    await waitFor(
      () => {
        expect(submitButton).toHaveClass('bg-sosoeat-orange-600');
      },
      { timeout: 3000 }
    );

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: TEST_ACCOUNT_EMAIL,
        password: TEST_ACCOUNT_PASSWORD,
      });
    });
  });
});
