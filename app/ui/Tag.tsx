import { twMerge } from 'tailwind-merge'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={twMerge(
        'px-1.5 text-sm flex items-center text-zinc-300 bg-[#eaeaea] dark:bg-white/30 dark:border-white/10 rounded-lg tracking-wider max-w-fit max-h-fit',
        className
      )}
    >
      {children}
    </div>
  )
}
