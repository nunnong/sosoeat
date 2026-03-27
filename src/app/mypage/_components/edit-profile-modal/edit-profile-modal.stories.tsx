import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PencilLine } from 'lucide-react';

import { EditProfileModal } from './edit-profile-modal';

const meta: Meta<typeof EditProfileModal> = {
  title: 'APP/mypage/edit-profile-modal',
  component: EditProfileModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditProfileModal>;

const ModalWithToggle = (args: React.ComponentProps<typeof EditProfileModal>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex h-[34.45px] w-[104.04px] flex-row">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sosoeat-gray-200 text-sosoeat-gray-700 ring-sosoeat-gray-300 flex h-full w-full items-center justify-center gap-1 rounded-xl text-xs font-bold ring-1"
        >
          <PencilLine className="h-[12.99px] w-[12.99px]"></PencilLine>
          프로필 수정
        </button>
      </div>
      <EditProfileModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// default
export const Default: Story = {
  render: (args) => <ModalWithToggle {...args} />,
  args: {
    initialName: '김민준',
    initialEmail: 'sosoeat@codeit.com',
  },
};

// 모달이 처음부터 열려 있는 상태
export const OpenByDefault: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    initialName: '김민준',
    initialEmail: 'sosoeat@codeit.com',
  },
};
