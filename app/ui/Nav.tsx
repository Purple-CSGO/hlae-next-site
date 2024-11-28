'use client'
import Link from 'next/link'
import { H4 } from './Heading'
import { useScroll } from 'ahooks'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'

function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export default function Nav() {
  const scroll = useScroll(isBrowser() ? document : null)
  const pathname = usePathname()

  return (
    <nav
      className={twMerge(
        'sticky top-0 z-30 w-full bg-white/75 dark:bg-black/70 backdrop-blur-xl opacity-0 h-0 transition -translate-y-1/4 hover:opacity-100 duration-300',
        (pathname !== '/' || (scroll?.top || 0) > 140) && 'opacity-100 translate-y-0 border-b border-zinc-100 dark:border-zinc-800 h-auto'
      )}
    >
      <div className="flex items-center justify-between w-full max-w-screen-lg gap-4 px-8 py-6 mx-auto">
        <Link href="/">
          <H4 className="font-bold">HLAE中文站</H4>
        </Link>

        <ul className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
            主页
          </Link>
          <Link href="/hud/deathmsg" className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
            击杀生成
          </Link>
          <Link href="/about" className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
            关于
          </Link>
        </ul>
      </div>
    </nav>
  )
}
