import { Skeleton } from '@heroui/skeleton'

export function ResourceCardListLoading() {
  return (
    <ul className="grid items-center justify-center w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className="p-5 gap-3.5 rounded-xl relative bg-zinc-100 dark:bg-zinc-800 bg-opacity-90 transition duration-200 flex flex-col h-full">
          <div className="flex items-center gap-1">
            <Skeleton className="w-12 h-12 shrink-0 rounded-xl mr-2" />
            <div className="flex gap-x-2 gap-y-1 flex-wrap items-center">
              <Skeleton className="h-5 w-24 rounded" />
            </div>
          </div>
          <Skeleton className="h-3 w-full rounded mt-2" />
          <Skeleton className="h-3 w-3/4 rounded mt-1" />
          <div className="flex gap-2 mt-auto">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </li>
      ))}
    </ul>
  )
}
