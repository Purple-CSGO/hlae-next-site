import { twMerge } from 'tailwind-merge'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-1.5 text-sm flex items-center text-[#777] bg-[#eaeaea] rounded-lg tracking-wider max-w-fit max-h-fit', className)}>
      {children}
    </div>
  )
}
