export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
}

export interface ProfileFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
}
