import Navbar from "~/components/Navbar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
