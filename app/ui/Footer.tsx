export function Footer() {
  return (
    <footer className="bg-zinc-100 border-t border-zinc-200 text-zinc-700 py-6 px-5 w-full">
      <div className="max-w-screen-xl gap-3 mx-auto flex flex-col justify-between items-center">
        <span className="font-medium tracking-wide text-zinc-500">
          Presented by{' '}
          <a href="https://github.com/Purple-CSGO" className="font-bold text-zinc-700">
            Purple-CSGO
          </a>{' '}
          ©2024
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
    <div className="text-sm tracking-widest items-center font-medium text-[#333336] underline-offset-2 flex flex-col sm:flex-row gap-2">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=34012302000653" rel="noreferrer" className="flex gap-3 hover:underline" target="_blank">
        <img src="/icon/beian.png" alt="beian" className="w-5 h-5" />
        {record}
      </a>
      <span className="sm:block hidden">|</span>
      <a href="http://beian.miit.gov.cn/" target="_blank" className="hover:underline">
        {icp}
      </a>
    </div>
  )
}
