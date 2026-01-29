export default function Footer() {
  return (
    <footer className="w-full px-5 py-8 border-t bg-zinc-100 dark:bg-zinc-950/80 border-zinc-200 dark:border-zinc-700/50 text-zinc-700">
      <div className="flex flex-col items-center justify-between max-w-screen-lg gap-3 mx-auto">
        <span className="font-medium tracking-wider text-zinc-500">
          Presented by{' '}
          <a href="https://github.com/Purple-CSGO" className="font-bold text-zinc-700">
            Purple-CSGO
          </a>{' '}
          ©2026
        </span>

        <Beian record="皖公网安备34012302000653" icp="皖ICP备20002252号-2" />
      </div>
    </footer>
  )
}

type BeianProps = {
  record?: string
  icp?: string
}

function Beian({ record, icp }: BeianProps) {
  return (
    <div className="text-sm tracking-wider items-center font-medium text-zinc-700 underline-offset-2 flex flex-col sm:flex-row gap-2">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=34012302000653" rel="noreferrer" className="flex gap-3 hover:underline" target="_blank">
        <img src="/icon/beian.png" alt="beian" className="w-4 h-4" />
        {record}
      </a>
      <span className="hidden sm:block">|</span>
      <a href="http://beian.miit.gov.cn/" target="_blank" className="hover:underline">
        {icp}
      </a>
    </div>
  )
}
