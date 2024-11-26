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
    <li className="p-5 gap-3 rounded-xl bg-[#f6f6f6] hover:bg-[#f1f1f1] bg-opacity-90 transition duration-200 flex flex-col h-full dark:bg-[#333] dark:hover:bg-[#666]">
      <Link href={url} className="flex items-center gap-1 w-fit">
        <div className={twMerge('w-12 h-12 shrink-0 rounded-xl mr-2 flex justify-center items-center', background && 'bg-zinc-200')}>
          {icon && <i className={twMerge('text-2xl', icon)} />}
          {image && !icon && <img src={image} className={twMerge('rounded-xl', className)} />}
        </div>
        <H4 className="cursor-pointer hover:underline underline-offset-4">{title}</H4>
      </Link>

      <p className="text-[#888] flex-grow dark:text-[#9e9e9e]">{desc}</p>

      <div className="flex gap-2">
        {version && <Tag>{version}</Tag>}
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
    </li>
  )
}
