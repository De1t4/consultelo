'use client'
import { Button } from "@/client/ui/Button";
import { ChartNoAxesCombined, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/client/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gray-100 dark:border-gray-800 bg-background">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-foreground">Consultelo</span>
            </Link>
            {/* Navigation */}

            <div className="flex items-center gap-4">
              <div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-foreground"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Sun className="h-5 w-5 text-gray-900" />
                  ) : (
                    <Moon className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="primary" className="flex items-center gap-2 w-32 cursor-pointer ">
                  Login
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 w-32 cursor-pointer border-gray-100 dark:border-gray-800 border-2 max-md:hidden">
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-linear-to-br from-teal-50 via-teal-25 to-background dark:from-teal-950/40 dark:via-teal-900/20 dark:to-background py-20 h-screen dark:border-gray-800 max-md:h-auto">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Get answers to your most <span className="text-teal-600">complex questions</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                Connect with top experts and data-driven communities to solve challenges faster. Access specialized knowledge and actionable insights immediately.
              </p>
              <div className="flex gap-4 justify-center ">
                <Button variant="primary" className="flex items-center gap-2 w-60 text-xl font-semibold  h-16 cursor-pointer text-white">
                  Start a Consultation
                </Button>
              </div>
            </div>
            {/* Right Visual */}
            <div className="relative bg-conic/[from_var(--border-angle)] from-teal-200/20 via-teal-400 to-teal-200/20 from-30% to-60% animate-rotate-border rounded-2xl p-[2px]">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                {/* Chart Visual */}
                <div className="mb-6  rounded-2xl  bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded bg-teal-500 flex items-center justify-center cursor-pointer">
                      <ChartNoAxesCombined className="text-2xl" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      +26% Growth
                    </span>
                  </div>
                  <div className="flex items-end gap-3 h-32">
                    <div className="bg-teal-100 rounded-t-lg w-full h-16 hover:h-18 transition-all duration-200 cursor-pointer"></div>
                    <div className="bg-teal-200 rounded-t-lg w-full h-20 hover:h-22 transition-all duration-200 cursor-pointer"></div>
                    <div className="bg-teal-300 rounded-t-lg w-full h-24 hover:h-26 transition-all duration-200 cursor-pointer"></div>
                    <div className="bg-teal-500 rounded-t-lg w-full h-32 hover:h-34 transition-all duration-200 cursor-pointer"></div>
                  </div>
                </div>
                <p className=" text-gray-400 dark:text-gray-500 max-w-xl leading-relaxed">
                  Improve decision-making thanks to quick responses from your customers and employees.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
