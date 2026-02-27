export default function SkeletonConsult() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
      {/* Left Column - Main Content */}
      <section className="lg:col-span-2 space-y-6">

        {/* PrincipalConsult Skeleton - Matches design of PrincipalConsult.tsx */}
        <article className="bg-card border-border rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 max-md:flex-col max-md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-8" />

          <div className="flex items-start gap-4 mb-6">
            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
              <div className="h-4 w-56 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2 ml-auto">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
          </div>
        </article>

        {/* CommentsConsult Skeleton - Matches design of CommentsConsult.tsx */}
        <article className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-5 w-10 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${i > 1 ? 'pt-6 border-t border-border' : ''} flex items-start gap-4`}>
                <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-3 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* FeedbackConsult Skeleton - Matches design of FeedbackConsult.tsx */}
        <article className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="h-5 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-600 rounded-lg mb-4" />
          <div className="flex items-center justify-between pt-4 max-md:flex-col max-md:items-start gap-4">
            <div className="h-4 w-full max-w-sm bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-lg shrink-0 max-md:w-full" />
          </div>
        </article>
      </section>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* ShareConsult Skeleton */}
        <aside className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
          <div className="space-y-4">
            <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded-lg" />
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-lg" />
          </div>
        </aside>

        {/* CaseInfoConsult Skeleton - Matches design of CaseInfoConsult.tsx */}
        <aside className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
          <div className="space-y-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded font-bold" />
          </div>
        </aside>
      </div>
    </div>
  )
}
