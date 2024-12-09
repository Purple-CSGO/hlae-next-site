'use client'

import { H2, H3 } from '@/app/ui/Heading'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { DeathMsg, DefaultDeathMsg, prefixIcon, PrefixIconValues, suffixIcon, SuffixIconValues, Weapon, WeaponValues } from './dmsg'
import useDMStore from './store'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg gap-8 px-8 py-8 mx-auto">
      <H2>击杀信息生成</H2>
      {/* <ul className="flex flex-row gap-4 text-zinc-900 dark:text-zinc-100">
        <li>CS1.6</li>
        <li>CSGO</li>
        <li>CS2</li>
      </ul> */}
      <p className="text-zinc-900 dark:text-zinc-100">施工中... 功能尚未完善</p>
      <div className="flex flex-row flex-wrap gap-6 pt-4">
        <SettingPanel />
        <PreviewPanel />
        <DeathNoticePanel />
      </div>
      <DeathNoticeCanvas />
    </div>
  )
}

function SettingPanel() {
  const { w, h, hidpi, prefix, setW, setH, setHidpi, setPrefix, reset } = useDMStore()

  return (
    <section className="flex gap-6 w-full md:w-auto p-6 border border-zinc-300 bg-white/[.01] dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col flex-wrap flex-grow gap-3">
        <div className="flex gap-4">
          <H3>偏好设置</H3>
          <button onClick={() => reset()} className="px-3 py-1 font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800">
            重置
          </button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="w-20 text-sm">宽</a>
          <input
            className="px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 bg-zinc-50"
            value={w}
            onChange={e => setW(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="w-20 text-sm">高</a>
          <input
            className="px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 bg-zinc-50"
            value={h}
            onChange={h => setH(Number(h.target.value))}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="w-20 text-sm">渲染倍率</a>
          <input
            className="px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 bg-zinc-50"
            value={hidpi}
            onChange={hidpi => setHidpi(Number(hidpi.target.value))}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="w-20 text-sm">文件名前缀</a>
          <input
            className="px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 bg-zinc-50"
            value={prefix}
            onChange={prefix => setPrefix(String(prefix.target.value))}
          />
        </div>
      </div>
    </section>
  )
}

function PreviewPanel() {
  return (
    <section className="flex flex-col flex-grow gap-6 p-6 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white/[.01] text-zinc-900 dark:text-zinc-100">
      <H3>预览</H3>
      <DeathNoticeRender />
    </section>
  )
}

function DeathNoticePanel() {
  const { dNotices, setDNotice, saveDNotices, loadDNotices, resetDNotices, addDNotice, generateDNotice } = useDMStore()
  const [parent /* , enableAnimations */] = useAutoAnimate(/* optional config */)

  return (
    <section className="flex flex-col w-full gap-6 p-6 border border-zinc-300 bg-white/[.01] dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-wrap items-start gap-4">
        <H3>击杀信息调整</H3>
        <button onClick={() => saveDNotices()} className="px-3 py-1 font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800">
          保存数据
        </button>
        <button onClick={() => loadDNotices('')} className="px-3 py-1 font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800">
          加载数据
        </button>
        <button onClick={() => resetDNotices()} className="px-3 py-1 font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800">
          恢复默认
        </button>
        <button onClick={() => generateDNotice()} className="px-3 py-1 font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800">
          生成击杀
        </button>
        <button onClick={() => addDNotice(DefaultDeathMsg)} className="px-3 py-1 ml-auto font-semibold rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800">
          添加
        </button>
      </div>
      <ul className="flex flex-col gap-6" ref={parent}>
        {dNotices.map((dNotice: DeathMsg, i: number) => (
          <DeathNoticeItem key={i} index={i} deathNotice={dNotice} setDNotice={setDNotice} />
        ))}
      </ul>
    </section>
  )
}

type DeathNoticeItemProps = {
  index: number
  deathNotice: DeathMsg
  setDNotice: (index: number, dNotice: DeathMsg) => void
}
function DeathNoticeItem({ index, deathNotice, setDNotice }: DeathNoticeItemProps) {
  const { removeDNotice } = useDMStore()

  return (
    <li className={twMerge('grid items-center grid-cols-2 gap-4 p-4 border rounded-md md:grid-cols-6 dark:border-zinc-600')}>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>击杀者</p>
        <input
          className="px-2 py-1 border rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700"
          value={deathNotice.attacker}
          onChange={e => setDNotice(index, { ...deathNotice, attacker: e.target.value })}
        />
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>受害者</p>
        <input
          className="px-2 py-1 border rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700"
          value={deathNotice.victim}
          onChange={e => setDNotice(index, { ...deathNotice, victim: e.target.value })}
        />
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>武器</p>
        <div className="flex gap-3">
          <input
            className="flex-grow px-2 py-1 border rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700"
            value={deathNotice.weapon}
            onChange={e => setDNotice(index, { ...deathNotice, weapon: e.target.value as Weapon })}
          />
          <button
            onClick={() => setDNotice(index, { ...deathNotice, redBorder: !deathNotice.redBorder })}
            className={twMerge(
              'px-3 py-1 font-semibold transition rounded flex-nowrap bg-zinc-100 border hover:bg-red-400 hover:text-white text-zinc-800',
              deathNotice.redBorder && 'border-red-500 border bg-red-50'
            )}
          >
            红框
          </button>
        </div>
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>前缀图标</p>
        <ul className="flex gap-2 rounded-lg">
          {PrefixIconValues.map(item => (
            <li
              key={item}
              onClick={() =>
                deathNotice.prefixIcons.includes(item)
                  ? setDNotice(index, { ...deathNotice, prefixIcons: deathNotice.prefixIcons.filter(i => i !== item) })
                  : setDNotice(index, { ...deathNotice, prefixIcons: [...deathNotice.prefixIcons, item] })
              }
            >
              <img
                src={`/dnFix/${item}.svg`}
                alt="prefix"
                className={twMerge(
                  'w-9 h-9 p-1.5 rounded-lg text-black bg-zinc-300 cursor-pointer hover:bg-zinc-400 transition active:scale-95',
                  deathNotice.prefixIcons.includes(item) && 'bg-zinc-500'
                )}
              />
            </li>
          ))}
        </ul>
      </li>
      <li className="col-span-3 flex flex-col gap-1.5 flex-grow">
        <p>后缀图标</p>
        <ul className="flex gap-2 rounded-lg">
          {SuffixIconValues.map(item => (
            <li
              key={item}
              onClick={() =>
                deathNotice.suffixIcons.includes(item)
                  ? setDNotice(index, { ...deathNotice, suffixIcons: deathNotice.suffixIcons.filter(i => i !== item) })
                  : setDNotice(index, { ...deathNotice, suffixIcons: [...deathNotice.suffixIcons, item] })
              }
            >
              <img
                src={`/dnFix/${item}.svg`}
                alt="suffix"
                className={twMerge(
                  'w-9 h-9 p-1.5 rounded-lg text-black bg-zinc-300 cursor-pointer hover:bg-zinc-400 transition active:scale-95',
                  deathNotice.suffixIcons.includes(item) && 'bg-zinc-500'
                )}
              />
            </li>
          ))}
        </ul>
        {/* <input
          className="px-2 py-1 border rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700"
          value={deathNotice.suffixIcons}
          onChange={e => setDNotice(index, { ...deathNotice, suffixIcons: e.target.value as suffixIcon })}
        /> */}
      </li>
      <li className="col-span-1 mt-auto ml-auto space-x-2">
        <button
          onClick={() => removeDNotice(index)}
          className="px-3 py-1 mt-auto ml-auto font-semibold transition rounded bg-zinc-100 hover:bg-red-400 hover:text-white text-zinc-800"
        >
          删除
        </button>
      </li>
    </li>
  )
}

type DeathNoticeRenderProps = {
  hide?: boolean
}

function DeathNoticeRender({ hide = false }: DeathNoticeRenderProps) {
  const { dNotices } = useDMStore()
  const [parent /* , enableAnimations */] = useAutoAnimate(/* optional config */)

  return (
    <ul className="flex flex-col items-end gap-1 pr-2.5 transition-transform" ref={parent}>
      {dNotices.map((dNotice: DeathMsg, index: number) => (
        <li
          key={index}
          className={twMerge(
            'flex flex-row items-center justify-center gap-1 px-2 py-1 h-8 text-sm leading-6 backdrop-blur font-bold font-[Stratum2] rounded text-white bg-black/65',
            dNotice.redBorder && 'border-2 border-[#e10000]',
            hide && dNotice.hide && 'invisible'
          )}
        >
          <p className={twMerge(dNotice.attackerCamp === 'CT' ? 'text-[#6F9CE6]' : 'text-[#EABE54]')}>{dNotice.attacker}</p>
          {dNotice.prefixIcons &&
            dNotice.prefixIcons.map((prefixIcon: string, i: number) => <img src={`/dnFix/${prefixIcon}.svg`} alt="prefix" className="h-6" key={i} />)}
          <img src={`/weapon/${dNotice.weapon}.svg`} alt="weapon" className="h-6" />
          {dNotice.suffixIcons &&
            dNotice.suffixIcons.map((suffixIcon: string, i: number) => <img src={`/dnFix/${suffixIcon}.svg`} alt="prefix" className="h-6" key={i} />)}

          <p className={twMerge(dNotice.victimCamp === 'CT' ? 'text-[#6F9CE6]' : 'text-[#EABE54]')}>{dNotice.victim}</p>
        </li>
      ))}
    </ul>
  )
}

function DeathNoticeCanvas() {
  const { w, h } = useDMStore()
  const dw = `${w}px`
  const dh = `${h}px`

  return (
    <section className={`pt-[72px] pr-[10px] pointer-events-none absolute bottom-full render-fix`} style={{ width: dw, height: dh }} id="deathnotice">
      <DeathNoticeRender hide={true} />
    </section>
  )
}
