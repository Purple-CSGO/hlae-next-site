import { Card } from './ui/Card'
import { portalData } from './data/portal'
import { H1, H2 } from './ui/Heading'
import { resourceData } from './data/resource'

export default function Home() {
  return (
    <main className="flex min-h-screen mx-auto flex-col gap-24 py-28 row-start-2 items-center justify-center sm:items-start">
      <section className="flex flex-col items-center text-center mx-auto py-12">
        <H1>HLAE中文站</H1>

        <p className="py-8 text-[#666] dark:text-[#bbb] text-xl tracking-widest">
          <span className="font-bold text-orange-600">CS</span>等起源引擎游戏的影片制作工具<span className="font-bold text-[#CA4940]">HLAE</span>
          的中文门户网站
        </p>

        <div className="flex flex-row gap-4">
          <a
            href="https://advancedfx.org"
            target="_blank"
            className="pl-3 pr-4 py-2 flex flex-row justify-center items-center rounded-full font-semibold transition duration-200 active:scale-95 text-[#fff] bg-[#CA4940] hover:bg-[#B33B32]"
          >
            <img src="/icon/hlae.svg" alt="project" className="w-6 h-6" />
            官方网站
          </a>
          <a
            href="https://github.com/Purple-CSGO/hlae-site"
            target="_blank"
            className="pl-3 pr-4 py-2 flex flex-row justify-center items-center rounded-full font-semibold transition duration-200 active:scale-95 text-[#333] dark:text-[#222] bg-gray-100 dark:bg-gray-300 hover:bg-gray-200"
          >
            <i className="w-6 pi pi-github" />
            本项目
          </a>
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center justify-center max-w-screen-xl mx-auto px-8 w-full">
        <H2>传送门</H2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-6 w-full">
          {portalData.map((data, index) => (
            <Card {...data} key={index} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8 items-center justify-center max-w-screen-xl mx-auto px-8 w-full">
        <H2>资源下载</H2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-6 w-full">
          {resourceData.map((data, index) => (
            <Card {...data} key={index} />
          ))}
        </ul>
      </section>
    </main>
  )
}
