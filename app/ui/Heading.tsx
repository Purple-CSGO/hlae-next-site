import { twMerge } from 'tailwind-merge'

export function H1({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h1 className={twMerge('text-5xl font-bold', className)}>{children}</h1>
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={twMerge('text-3xl font-bold', className)}>{children}</h2>
}

export function H3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={twMerge('text-2xl font-bold', className)}>{children}</h3>
}

export function H4({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h4 className={twMerge('text-xl font-bold', className)}>{children}</h4>
}
