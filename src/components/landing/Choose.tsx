import { RefreshCw, TrendingUp, Users } from 'lucide-react'

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
          {/* Expert Network */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Network</h3>
            <p className="text-gray-600 leading-relaxed">
              Access a vetted global network of 50,000+ data scientists, industry leaders, and technical researchers ready to tackle your problems.
            </p>
          </div>

          {/* Real-time Collaboration */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
              <RefreshCw className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Collaboration</h3>
            <p className="text-gray-600 leading-relaxed">
              Seamlessly share datasets, notebooks, and code in real-time environments designed for complex technical consultation.
            </p>
          </div>

          {/* Data Insights */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              Transform raw consultations into actionable business intelligence with our automated summary and insight extraction tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
