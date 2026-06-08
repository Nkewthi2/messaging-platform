import type { ReactNode } from "react";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w mx-auto w-full">
          <Header />
        </div>
      </header>

      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}