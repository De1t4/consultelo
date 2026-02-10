import Choose from "@/client/components/landing/Choose";
import Footer from "@/client/components/landing/Footer";
import Header from "@/client/components/landing/Header";
import Hero from "@/client/components/landing/Hero";

export default function Home() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Choose />
      <Footer />
    </div>
  )
}
