import { H2 } from '../ui/Heading'
import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'

export const metadata: Metadata = {
  title: '关于',
  description: 'HLAE中文站 —— CS视频制作相关导航与资源集合的中文门户网站',
}

export default async function About() {
  'use cache'
  cacheLife('days') // 静态页面，缓存 1 天
  return (
    <div className="flex flex-col gap-2 text-zinc-900 dark:text-zinc-100 items-center justify-start min-h-screen max-w-screen-lg mx-auto py-32 px-8">
      <H2 className="mb-4">关于</H2>
      <p>HLAE中文站 —— CS视频制作相关导航与资源集合的中文门户网站。</p>
      <p>创办&开发：Purp1e紫</p>
    </div>
  )
}
