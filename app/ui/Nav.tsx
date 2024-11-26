import Link from 'next/link'
import { H4 } from './Heading'

export function Nav() {
  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-lg w-full">
      <div className="flex items-center justify-between gap-4 max-w-screen-xl mx-auto px-8 py-6 w-full">
        <H4 className="font-bold">HLAE中文站</H4>

        <ul className="flex items-center gap-4">
          <Link href="/" className="text-md font-semibold text-gray-800">
            主页
          </Link>
          <Link href="/about" className="text-md font-semibold text-gray-800">
            关于
          </Link>
        </ul>
      </div>
    </nav>
  )
}
