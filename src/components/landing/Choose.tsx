import { RefreshCw, TrendingUp, Users } from 'lucide-react'

const chooses = [
  {
    title: "Expert Network",
    description: "Access a vetted global network of 50,000+ data scientists, industry leaders, and technical researchers ready to tackle your problems.",
    icon: Users,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100"
  },
  {
    title: "Real-time Collaboration",
    description: "Seamlessly share datasets, notebooks, and code in real-time environments designed for complex technical consultation.",
    icon: RefreshCw,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Data Insights",
    description: "Transform raw consultations into actionable business intelligence with our automated summary and insight extraction tools.",
    icon: TrendingUp,
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
            Why do the best companies choose it?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the necessary infrastructure for decision-making.
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
