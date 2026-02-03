import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Root layout just passes through to locale-specific layout
export default function RootLayout({ children }: Props) {
  return children;
}
