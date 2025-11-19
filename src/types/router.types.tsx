import { JSX } from "@/alias";

// الرابط
export type T_Link = {
  id: number;
  to: string;
  label: string;
  icon?: JSX.Element | string | null;
  content?: React.ReactNode;
};
