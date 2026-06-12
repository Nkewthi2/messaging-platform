import type { ReactNode } from "react";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background">
        <div className="max-w mx-auto w-full">
          <Header />
        </div>
      </header>

      <div className="flex items-center justify-center py-12 ">
        <div className="w-full max-w-md p-8 rounded-2xl bg-background ">
          {children}
        </div>
      </div>
    </div>
  );
}