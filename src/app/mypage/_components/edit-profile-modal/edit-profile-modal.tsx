import { useState } from 'react';

import Image from 'next/image';

import { Pencil, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type {
  EditProfileModalProps,
  ModalActionButtonsProps,
  ProfileFieldProps,
} from './edit-profile-modal.types';

const styles = {
  input: 'focus:border-sosoeat-gray-700 border border-transparent focus:ring-0 focus:outline-none',
  fieldLabel: 'text-sm font-semibold',
  actionButton: 'w-fill h-15 flex-1 rounded-2xl py-3 text-xl font-semibold',
} as const;

// 프로필 이미지
function ProfileImageEditor() {
  return (
    <div className="flex justify-center py-10">
      <div className="relative">
        <Image
          src="/"
          alt="프로필 이미지"
          width={116}
          height={119}
          className="ring-sosoeat-gray-300 rounded-full object-cover ring-1"
        />
        <Button className="ring-sosoeat-gray-300 absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 ring-1">
          <Pencil className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

// 이름, 이메일 input
function ProfileField({ id, label, type = 'text', value, onChange }: ProfileFieldProps) {
  return (
    <Field orientation="vertical" className="gap-2">
      <FieldLabel htmlFor={id} className={styles.fieldLabel}>
        {label}
      </FieldLabel>
      <FieldContent>
        <Input id={id} type={type} value={value} onChange={onChange} className={styles.input} />
      </FieldContent>
    </Field>
  );
}

// 취소,수정하기 button
function ModalActionButtons({ onCancel, onSubmit }: ModalActionButtonsProps) {
  return (
    <div className="flex gap-3 py-15">
      <Button
        onClick={onCancel}
        className={`${styles.actionButton} border-sosoeat-gray-300 border bg-white text-gray-700 hover:bg-gray-50`}
      >
        취소
      </Button>
      <Button
        onClick={onSubmit}
        className={`${styles.actionButton} bg-sosoeat-orange-600 text-white`}
      >
        수정하기
      </Button>
    </div>
  );
}

export function EditProfileModal({
  isOpen,
  onClose,
  initialName = '',
  initialEmail = '',
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // 수정 API 호출
    console.log('수정하기:', { name, email });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div className="relative h-[627px] w-[544px] rounded-4xl bg-white p-12 shadow-xl">
        <div className="p-2">
          <Button
            onClick={onClose}
            className="absolute top-9 right-7 bg-white text-gray-400"
            aria-label="닫기"
          >
            <XIcon className="size-6" strokeWidth={1.8} />
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">프로필 수정하기</h2>
        </div>

        <ProfileImageEditor />

        <FieldGroup className="gap-4 py-2">
          <ProfileField
            id="name"
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ProfileField
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FieldGroup>

        <ModalActionButtons onCancel={onClose} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
