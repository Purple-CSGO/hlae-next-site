import { Card } from './ui/Card'
import { portalData } from './data/portal'
import { H1, H2 } from './ui/Heading'
import { resourceData } from './data/resource'
import { FaGithub } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen row-start-2 gap-20 py-32 mx-auto sm:items-start">
      <section className="flex flex-col items-center w-full max-w-screen-lg px-8 py-8 mx-auto text-center">
        <H1>HLAE中文站</H1>

        <Hero />
      </section>

      <section className="flex flex-col items-center justify-center w-full max-w-screen-lg gap-8 px-8 mx-auto">
        <H2>传送门</H2>
        <ul className="grid items-center justify-center w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portalData.map((data, index) => (
            <Card {...data} key={index} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center justify-center w-full max-w-screen-lg gap-8 px-8 mx-auto">
        <H2>资源下载</H2>
        <ul className="grid items-center justify-center w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceData.map((data, index) => (
            <Card {...data} key={index} />
          ))}
        </ul>
      </section>
    </main>
  )
}

function Hero() {
  return (
    <>
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
          href="https://github.com/Purple-CSGO/hlae-next-site"
          target="_blank"
          className="pl-3 pr-4 py-2 flex flex-row justify-center items-center rounded-full font-semibold transition duration-200 active:scale-95 text-[#333] bg-gray-100 hover:bg-gray-200"
        >
          <FaGithub className="w-6 h-6 p-0.5 mr-1" />
          本项目
        </a>
      </div>
    </>
  )
}
