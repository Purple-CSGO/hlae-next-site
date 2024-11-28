'use client'

import { H2, H3, H4 } from '@/app/ui/Heading'
import { useState } from 'react'
import { DeathMsg, DefaultDeathMsg } from './dmsg'

export default function DeathMessage() {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg gap-8 px-8 py-8 mx-auto">
      <H2>击杀信息生成</H2>
      <ul className="flex flex-row gap-4">
        <li>CS1.6</li>
        <li>CSGO</li>
        <li>CS2</li>
      </ul>
      <div className="flex flex-row flex-wrap gap-6 pt-4">
        <SettingPanel />
        <PreviewPanel />
        <DeathNoticePanel />
      </div>
    </div>
  )
}

export function SettingPanel() {
  const [w, setW] = useState(1920)
  const [h, setH] = useState(1080)
  const [hidpi, setHidpi] = useState(2)
  const [prefix, setPrefix] = useState('测试击杀生成')

  return (
    <section className="flex gap-6 border p-6 rounded-md">
      <div className="flex-grow flex-wrap flex flex-col gap-3">
        <H3>偏好设置面板</H3>
        <div className="flex flex-row items-center gap-2">
          <a className="text-sm w-20">宽</a>
          <input className="border rounded-md bg-zinc-50 py-1 px-2" value={w} onChange={e => setW(Number(e.target.value))} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="text-sm w-20">高</a>
          <input className="border rounded-md bg-zinc-50 py-1 px-2" value={h} onChange={h => setH(Number(h.target.value))} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="text-sm w-20">渲染倍率</a>
          <input className="border rounded-md bg-zinc-50 py-1 px-2" value={hidpi} onChange={hidpi => setHidpi(Number(hidpi.target.value))} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="text-sm w-20">文件名前缀</a>
          <input className="border rounded-md bg-zinc-50 py-1 px-2" value={prefix} onChange={prefix => setPrefix(String(prefix.target.value))} />
        </div>
      </div>
    </section>
  )
}

export function PreviewPanel() {
  return (
    <div className="flex flex-col gap-6 border p-6 rounded-md flex-grow">
      <H3>预览面板</H3>
      <div v-show="generating" id="deathnotice" className="flex flex-col items-end gap-[2px] pt-[72px] pr-[10px] absolute top-0 left-0"></div>
    </div>
  )
}

export function DeathNoticePanel() {
  const [dNotices, setDNotices] = useState<DeathMsg[]>(DefaultDeathMsg)

  const updateDNotice = (index: number, updatedDNotice: DeathMsg) => {
    setDNotices(dNotices.map((d, i) => (i === index ? updatedDNotice : d)))
  }

  return (
    <div className="flex w-full flex-col gap-6 border p-6 rounded-md">
      <div className="flex gap-6">
        <H3>击杀信息调整面板</H3>
        <button className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold py-1 px-3 rounded">添加</button>
      </div>
      <ul className="flex flex-col gap-6">
        {dNotices.map((dNotice: DeathMsg, i: number) => (
          <DeathNoticeItem key={i} index={i} deathNotice={dNotice} updateDNotice={updateDNotice} />
        ))}
      </ul>
    </div>
  )
}

type DeathNoticeItemProps = {
  index: number
  deathNotice: DeathMsg
  updateDNotice: (index: number, updatedDNotice: DeathMsg) => void
}
export function DeathNoticeItem({ deathNotice, index, updateDNotice }: DeathNoticeItemProps) {
  return (
    <li className="flex flex-row flex-wrap items-center gap-2 p-4 border rounded-md">
      <H4>{deathNotice.attacker}</H4>
      <input
        className="border rounded-md bg-zinc-50 py-1 px-2"
        value={deathNotice.attacker}
        onChange={e => updateDNotice(index, { ...deathNotice, attacker: e.target.value })}
      />
      <H4>{deathNotice.victim}</H4>
      <input
        className="border rounded-md bg-zinc-50 py-1 px-2"
        value={deathNotice.victim}
        onChange={e => updateDNotice(index, { ...deathNotice, victim: e.target.value })}
      />
      <p>{deathNotice.weapon}</p>
      <p>{deathNotice.prefixIcons}</p>
      <p>{deathNotice.suffixIcons}</p>
      <button className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold py-1 px-3 rounded">删除</button>
    </li>
  )
}
