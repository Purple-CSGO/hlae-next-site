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
    <li className="p-5 gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:brightness-110 bg-opacity-90 transition duration-200 flex flex-col h-full">
      <Link href="/" className="flex items-center gap-1">
        <div className={twMerge('w-12 h-12 shrink-0 rounded-xl mr-2 flex justify-center items-center', background && 'bg-zinc-200')}>
          {icon && <i className={twMerge('text-2xl', icon)} />}
          {image && !icon && <img src={image} className={twMerge('rounded-xl', className)} />}
        </div>
        <H4 className="cursor-pointer hover:underline underline-offset-4 text-zinc-950 dark:text-zinc-200">{title}</H4>
      </Link>

      <p className="text-zinc-500 flex-grow dark:text-[#9e9e9e]">{desc}</p>

      <div className="flex gap-2 relative">
        {download_cdn && (
          <Link href={download_cdn} className="text-blue-500">
            加速下载
          </Link>
        )}
        {download_original && (
          <Link href={download_original} className="text-blue-500">
            原始下载
          </Link>
        )}
      </div>
      {version && <div className="aboslute top-0 right-0">{version} 1</div>}
    </li>
  )
}
