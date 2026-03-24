import Contact from "@/components/landing/Contact";
import Choose from "@components/landing/Choose";
import Footer from "@components/landing/Footer";
import Header from "@components/landing/Header";
import Hero from "@components/landing/Hero";

export default function Home() {

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <Hero />
      <Choose />
      <Contact />
      <Footer />
    </div>
  )
}
