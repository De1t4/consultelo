import { RefreshCw, Shield, Users } from 'lucide-react'

const chooses = [
  {
    title: "Detailed Consultations",
    description: "Easily create, categorize, and track your questions and comments in a clear and organized way.",
    icon: Users,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100"
  },
  {
    title: "Fluid Experience",
    description: "Enjoy a lightning-fast, dynamic, and friendly interface perfectly optimized for any smart device.",
    icon: RefreshCw,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Security & Privacy",
    description: "Rest easy knowing that your personal information and all your consultations are always fully protected.",
    icon: Shield,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100"
  }
]
export default function Choose() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why choose Consultelo?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The modern platform to connect professionals with users needing expert advice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {
            chooses.map((chosee) => (
              <div key={chosee.title} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`h-12 w-12 rounded-lg ${chosee.bgColor} flex items-center justify-center mb-6`}>
                  <chosee.icon className={`h-6 w-6 ${chosee.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{chosee.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {chosee.description}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
