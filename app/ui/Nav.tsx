'use client'
import Link from 'next/link'
import { H4 } from './Heading'
import { useScroll } from 'ahooks'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@heroui/react'
import { useState } from 'react'

function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export default function Nav() {
  const scroll = useScroll(isBrowser() ? document : null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const shouldShow = pathname !== '/' || (scroll?.top || 0) > 140

  const menuItems = [
    { name: '主页', href: '/' },
    { name: '击杀生成', href: '/hud/deathmsg' },
    { name: '关于', href: '/about' },
  ]

  return (
    <>
      <nav
        className={twMerge(
          'sticky top-0 z-30 w-full bg-white/75 dark:bg-black/70 backdrop-blur-xl opacity-0 h-0 transition -translate-y-1/4 hover:opacity-100 duration-300',
          (pathname !== '/' || (scroll?.top || 0) > 140) && 'opacity-100 translate-y-0 border-b border-zinc-100 dark:border-zinc-800 h-auto'
        )}
      >
        <div className="flex items-center justify-between w-full max-w-screen-lg gap-4 px-8 py-6 mx-auto">
          <Link href="/">
            <H4 className="font-bold whitespace-nowrap">HLAE中文站</H4>
          </Link>

          <ul className="hidden sm:flex items-center gap-6">
            <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
              主页
            </Link>
            <Link href="/hud/deathmsg" className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
              击杀生成
            </Link>
            <Link href="/about" className="font-semibold text-zinc-900 dark:text-zinc-100 text-md">
              关于
            </Link>
            <Button size="sm" isIconOnly variant="light" onPress={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
              {theme == 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </ul>

          <Button size="sm" isIconOnly variant="light" className="sm:hidden" onPress={() => setIsMenuOpen(true)} aria-label="打开菜单">
            <Menu size={20} />
          </Button>
        </div>
      </nav>

      {/* 移动端菜单 */}
      <>
        {/* 背景遮罩层，点击可关闭 */}
        <div
          className={twMerge(
            'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden transition-opacity duration-300',
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden={!isMenuOpen}
        />
        {/* 侧边栏菜单 */}
        <div
          className={twMerge(
            'fixed top-0 right-0 z-50 w-64 h-full bg-white dark:bg-zinc-900 shadow-xl sm:hidden transition-transform duration-300 ease-in-out',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
              <H4 className="font-bold whitespace-nowrap">菜单</H4>
              <Button size="sm" isIconOnly variant="light" onPress={() => setIsMenuOpen(false)} aria-label="关闭菜单">
                <X size={20} />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <li key={`${item.href}-${index}`}>
                    <Link
                      href={item.href}
                      className={twMerge(
                        'block font-semibold text-zinc-900 dark:text-zinc-100 text-lg py-2 transition-colors',
                        pathname === item.href && 'text-primary'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button size="sm" variant="light" isIconOnly onPress={() => setTheme(theme == 'dark' ? 'light' : 'dark')} aria-label="切换主题">
                    {theme == 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    </>
  )
}
