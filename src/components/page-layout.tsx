import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto my-8 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
