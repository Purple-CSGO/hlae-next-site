import { twMerge } from 'tailwind-merge'
import { H4 } from './Heading'
import { Tag } from './Tag'
import Link from 'next/link'

export interface CardProps {
  title: string
  url: string
  desc: string
  icon?: string
  version?: string
  background: boolean
  download_cdn?: string
  download_original?: string
  image?: string
  className?: string
  children?: React.ReactNode
}

export function Card({ title, url, desc, icon, version, background, download_cdn, download_original, image, className, children }: CardProps) {
  return (
    <li className="p-5 gap-3 rounded-xl relative bg-zinc-100 dark:bg-zinc-800 hover:brightness-[.98] dark:hover:brightness-110 bg-opacity-90 transition duration-200 flex flex-col h-full">
      <Link href={url} className="flex items-center gap-1">
        <div className={twMerge('w-12 h-12 shrink-0 rounded-xl mr-2 flex justify-center items-center', background && 'bg-zinc-200 dark:bg-zinc-300')}>
          {icon && <i className={twMerge('text-2xl', icon)} />}
          {image && !icon && <img src={image} className={twMerge('rounded-xl', className)} />}
        </div>
        <div className="flex gap-x-2 gap-y-1 flex-wrap items-center">
          <H4 className="cursor-pointer hover:underline underline-offset-4 text-zinc-950 dark:text-zinc-200">{title}</H4>
          {version && (
            <div className="px-1.5 text-xs flex items-center text-zinc-500 bg-zinc-200 dark:bg-white/30 dark:border-white/10 rounded-lg tracking-wider max-w-fit max-h-fit">
              {version}
            </div>
          )}
        </div>
      </Link>

      <p className="text-zinc-500 flex-grow dark:text-[#9e9e9e]">{desc}</p>

      <div className="flex gap-2 relative">
        {download_cdn && (
          <Link
            href={download_cdn}
            className="transition text-white rounded-lg bg-[#ca4940] dark:bg-white/10 dark:hover:brightness-110 hover:brightness-90 py-1 px-3 active:scale-95"
          >
            加速下载
          </Link>
        )}
        {download_original && (
          <Link
            href={download_original}
            className="transition text-zinc-700 bg-zinc-200 dark:bg-white/10 dark:hover:brightness-110 rounded-lg hover:brightness-95 py-1 px-3 active:scale-95"
          >
            原始下载
          </Link>
        )}
      </div>
    </li>
  )
}
