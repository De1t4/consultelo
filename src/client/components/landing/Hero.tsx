import { Button } from "@/client/ui/Button";
import { ChartNoAxesCombined } from "lucide-react";

export default function Hero() {
  return (
    <section className=" bg-linear-to-br my-12 from-teal-50 via-teal-25 to-background dark:from-teal-950/40 dark:via-teal-900/20 dark:to-background py-20  dark:border-gray-800 max-md:h-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl lg:text-6xl max-md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Get answers to your most <span className="text-teal-600">complex questions</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
              Connect with top experts and data-driven communities to solve challenges faster. Access specialized knowledge and actionable insights immediately.
            </p>
            <div className="flex gap-4 justify-center ">
              <Button variant="primary" className="flex items-center gap-2 w-60 max-md:w-48 text-lg max-md:text-base font-semibold  h-14 max-md:h-12 cursor-pointer text-white">
                Register with Email
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
                    <ChartNoAxesCombined className="text-2xl text-zinc-300" />
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
  )
}
