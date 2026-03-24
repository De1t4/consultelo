
export default function SkeletonRelated() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-foreground text-sm">RELATED CONSULT</h2>
        </div>
        <ul className="flex flex-col">
          {[1, 2, 3].map((i) => (
            <li key={i} className="bg-card border border-border shadow rounded-lg p-4 mt-2 animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded w-1/2 mb-4"></div>
              <div className="flex gap-2 items-center mt-2">
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full"></div>
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>)
}
