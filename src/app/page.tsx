import Choose from "@components/landing/Choose";
import Footer from "@components/landing/Footer";
import Header from "@components/landing/Header";
import Hero from "@components/landing/Hero";

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
