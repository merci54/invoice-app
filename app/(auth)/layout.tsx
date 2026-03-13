import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice App — Account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-wrapper">
      {children}
    </div>
  );
}
