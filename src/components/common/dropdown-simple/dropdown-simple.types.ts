export interface DropdownSimpleProp {
  options: string[];
  placeholder?: React.ReactNode;
  value: string | null;
  onChange: (value: string | null) => void;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}
