import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LoginForm } from './login-form';

const meta = {
  title: 'pages/auth/login/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit: async (data) => console.log('Form submitted:', data),
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
