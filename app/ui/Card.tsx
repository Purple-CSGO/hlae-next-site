import { twMerge } from 'tailwind-merge'
import { H4 } from './Heading'
import { Tag } from './Tag'

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
  children?: React.ReactNode
}

export function Card({ title, url, desc, icon, version, background, download_cdn, download_original, image, children }: CardProps) {
  return (
    <li className="p-5 gap-3 rounded-xl bg-[#f6f6f6] hover:bg-[#f1f1f1] bg-opacity-90 transition duration-200 flex flex-col h-full dark:bg-[#333] dark:hover:bg-[#666]">
      <div className="flex items-center gap-1">
        <a href="/" className={twMerge('w-12 h-12 shrink-0 rounded-xl mr-2 flex justify-center items-center', background && 'bg-zinc-200')}>
          {icon && <i className={twMerge('text-2xl', icon)} />}
          {image && !icon && <img src={image} className="rounded-xl" />}
        </a>
        <H4 className="cursor-pointer hover:underline underline-offset-4">{title}</H4>
        <Tag>{version}</Tag>
      </div>

      <p className="text-[#888] flex-grow dark:text-[#9e9e9e]">{desc}</p>

      <div className="flex gap-2">
        {download_cdn && (
          <a href={download_cdn} className="text-blue-500">
            加速下载
          </a>
        )}
        {download_original && (
          <a href={download_original} className="text-blue-500">
            原始下载
          </a>
        )}
      </div>
    </li>
  )
}
