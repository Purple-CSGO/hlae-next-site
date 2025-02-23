'use client'

import { H2, H3 } from '@/app/ui/Heading'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { DeathMsg, DefaultDeathMsg, PrefixIconValues, SuffixIconValues, Weapon, WeaponMap, WeaponValues } from './dmsg'
import useDMStore from './store'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronsUpDown, Check } from 'lucide-react'
import { Key, use, useState } from 'react'
import { Button, Chip, Input, NumberInput, Switch, Tab, Tabs, cn } from '@heroui/react'

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg gap-8 px-8 py-6 mx-auto">
      <H2>击杀信息生成</H2>

      <GameTypeTabs />
      {/* <p className="text-zinc-900 dark:text-zinc-100">施工中... 功能尚未完善</p> */}

      <div className="flex flex-row flex-wrap gap-6 pt-4">
        <SettingPanel />
        <PreviewPanel />
        <DeathNoticePanel />
      </div>
      <DeathNoticeCanvas />
    </div>
  )
}

function GameTypeTabs() {
  const { gameType, setGameType } = useDMStore()
  return (
    <Tabs selectedKey={gameType} onSelectionChange={(key: Key) => setGameType(key.toString())} aria-label="Game Type Variants" variant="underlined" size="lg">
      <Tab key="cs2" title="CS2 & GO" />
      {/* <Tab key="csgo" title="CSGO" /> */}
      <Tab
        key="cstrike"
        title={
          <div className="flex items-center space-x-2 px-2">
            <span>CStrike</span>
            <Chip size="sm">开发中</Chip>
          </div>
        }
      />
    </Tabs>
  )
}

function SettingPanel() {
  const { w, h, hidpi, prefix, mockLayout, setW, setH, setHidpi, setPrefix, setMockLayout, reset } = useDMStore()

  return (
    <section className="flex gap-6 w-full md:w-auto p-6 border border-zinc-300 bg-white/[.01] dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col flex-wrap flex-grow gap-3">
        <div className="flex gap-4">
          <H3>偏好设置</H3>
          <Button size="sm" onPress={() => reset()} className="font-semibold">
            重置
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">宽</a>
          <NumberInput labelPlacement="outside" size="sm" value={w} onValueChange={e => setW(e)} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">高</a>
          <NumberInput labelPlacement="outside" size="sm" value={h} onValueChange={h => setH(h)} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">渲染倍率</a>
          <NumberInput labelPlacement="outside" size="sm" value={hidpi} onValueChange={hidpi => setHidpi(hidpi)} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">文件名前缀</a>
          <Input variant="flat" size="sm" value={prefix} onChange={prefix => setPrefix(String(prefix.target.value))} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">模拟游戏布局</a>
          <Switch size="sm" isSelected={mockLayout} onValueChange={mockLayout => setMockLayout(mockLayout)} />
        </div>
      </div>
    </section>
  )
}

function PreviewPanel() {
  return (
    <section className="flex flex-col flex-grow gap-6 p-6 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
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
        <Button size="sm" onPress={() => saveDNotices()} className="font-semibold">
          保存数据
        </Button>
        <Button size="sm" onPress={() => loadDNotices('')} className="font-semibold">
          加载数据
        </Button>
        <Button size="sm" onPress={() => resetDNotices()} className="font-semibold">
          恢复默认
        </Button>
        <Button size="sm" onPress={() => generateDNotice()} className="font-semibold">
          生成击杀
        </Button>
        <Button size="sm" color="primary" variant="flat" onPress={() => addDNotice(DefaultDeathMsg)} className="ml-auto font-semibold">
          添加
        </Button>
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
    <ul className="grid items-center grid-cols-1 gap-4 p-4 border dark:border-zinc-800 rounded-md md:grid-cols-6 dark:bg-zinc-900/50">
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>击杀者</p>
        <Input variant="flat" size="sm" value={deathNotice.attacker} onChange={e => setDNotice(index, { ...deathNotice, attacker: e.target.value })} />
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>受害者</p>
        <Input variant="flat" size="sm" value={deathNotice.victim} onChange={e => setDNotice(index, { ...deathNotice, victim: e.target.value })} />
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>武器</p>
        <div className="flex gap-3">
          <SelectSearch
            value={deathNotice.weapon}
            values={WeaponValues}
            valueMap={WeaponMap}
            onChange={(value: string) => setDNotice(index, { ...deathNotice, weapon: value as Weapon })}
          />
          <Button
            size="sm"
            onPress={() => setDNotice(index, { ...deathNotice, redBorder: !deathNotice.redBorder })}
            className={cn('font-semibold ', deathNotice.redBorder && 'border-red-500 border text-red-400 bg-red-100')}
          >
            红框
          </Button>
        </div>
      </li>
      <li className="col-span-5 flex flex-col gap-1.5 flex-grow">
        <p>图标</p>
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
                src={`/cs2/deathnotice/${item}.svg`}
                alt="prefix"
                className={cn(
                  'w-8 h-8 p-1.5 rounded-lg text-black bg-zinc-300 dark:bg-zinc-800 cursor-pointer hover:bg-zinc-400 transition active:scale-95',
                  deathNotice.prefixIcons.includes(item) && 'bg-zinc-500 dark:bg-zinc-400'
                )}
              />
            </li>
          ))}
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
                src={`/cs2/deathnotice/${item}.svg`}
                alt="suffix"
                className={cn(
                  'w-8 h-8 p-1.5 rounded-lg text-black bg-zinc-300 dark:bg-zinc-800 cursor-pointer hover:bg-zinc-400 transition active:scale-95',
                  deathNotice.suffixIcons.includes(item) && 'bg-zinc-500 dark:bg-zinc-400'
                )}
              />
            </li>
          ))}
        </ul>
      </li>
      <li className="col-span-1 mt-auto ml-auto space-x-2">
        <Button onPress={() => removeDNotice(index)} size="sm" className="ml-auto font-semibold hover:bg-red-300 hover:text-white">
          删除
        </Button>
      </li>
    </ul>
  )
}

type SelectSearchProps = {
  value: string
  onChange: (value: string) => void
  values: string[]
  valueMap: Record<string, string>
}

function SelectSearch({ value, onChange, values, valueMap }: SelectSearchProps) {
  const [open, setOpen] = useState(false)
  const { gameType } = useDMStore()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button variant="flat" size="sm" role="combobox" aria-expanded={open} className="justify-between w-full px-1.5">
          <img src={`/${gameType || 'cs2'}/weapon/${value}.svg`} alt="suffix" className="w-6 h-6 p-1 rounded bg-zinc-400 dark:bg-zinc-600" />
          <span className="flex-grow text-left">{value ? valueMap[value] || value : '选择武器'}</span>
          <ChevronsUpDown className="w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜索武器装备..." />
          <CommandList>
            <CommandEmpty>没有找到武器装备</CommandEmpty>
            <CommandGroup>
              {values.map(v => (
                <CommandItem
                  key={v}
                  value={v}
                  onSelect={(currentValue: string) => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  className="p-1 cursor-pointer"
                >
                  <img src={`/${gameType || 'cs2'}/weapon/${value}.svg`} alt="suffix" className="w-6 h-6 p-1 rounded bg-zinc-400" />
                  {valueMap[v] || v}
                  <Check className={cn('ml-auto', value === v ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type DeathNoticeRenderProps = {
  hide?: boolean
}

function DeathNoticeRender({ hide = false }: DeathNoticeRenderProps) {
  const { dNotices, gameType } = useDMStore()
  const [parent /* , enableAnimations */] = useAutoAnimate(/* optional config */)

  return (
    <ul className="flex flex-col items-end gap-1 pr-2.5 transition-transform" ref={parent}>
      {dNotices.map((dNotice: DeathMsg, index: number) =>
        gameType === 'cs2' ? (
          <CS2DeathNoticeItem key={index} dNotice={dNotice} index={index} hide={hide} />
        ) : (
          <CStrikeDeathNoticeItem key={index} dNotice={dNotice} index={index} hide={hide} />
        )
      )}
    </ul>
  )
}

function CS2DeathNoticeItem({ dNotice, index, hide }: { dNotice: DeathMsg; index: number; hide: boolean }) {
  return (
    <li
      key={index}
      className={cn(
        'flex flex-row items-center justify-center gap-1 px-2 py-1 h-8 text-sm leading-6 backdrop-blur font-bold font-[Stratum2] rounded text-white bg-black/65',
        dNotice.redBorder && 'border-2 border-[#e10000]',
        hide && dNotice.hide && 'invisible'
      )}
    >
      <p className={cn(dNotice.attackerCamp === 'CT' ? 'text-[#6F9CE6]' : 'text-[#EABE54]')}>{dNotice.attacker}</p>
      {dNotice.prefixIcons &&
        dNotice.prefixIcons.map((prefixIcon: string, i: number) => <img src={`/cs2/deathnotice/${prefixIcon}.svg`} alt="prefix" className="h-6" key={i} />)}
      <img src={`/cs2/weapon/${dNotice.weapon}.svg`} alt="weapon" className="h-6" />
      {dNotice.suffixIcons &&
        dNotice.suffixIcons.map((suffixIcon: string, i: number) => <img src={`/cs2/deathnotice/${suffixIcon}.svg`} alt="suffix" className="h-6" key={i} />)}

      <p className={cn(dNotice.victimCamp === 'CT' ? 'text-[#6F9CE6]' : 'text-[#EABE54]')}>{dNotice.victim}</p>
    </li>
  )
}

function CStrikeDeathNoticeItem({ dNotice, index, hide }: { dNotice: DeathMsg; index: number; hide: boolean }) {
  // TODO 修改cstrike击杀样式
  // TODO 补充cstrike相关图标
  return (
    <li
      key={index}
      className={cn(
        'flex flex-row items-center justify-center gap-1 px-2 py-1 h-8 text-sm leading-6 backdrop-blur font-light font-[Verdana] rounded text-white',
        hide && dNotice.hide && 'invisible'
      )}
    >
      {dNotice.prefixIcons &&
        dNotice.prefixIcons.map((prefixIcon: string, i: number) => <img src={`/cstrike/deathnotice/${prefixIcon}.svg`} alt="prefix" className="h-6" key={i} />)}
      <p className={cn('drop-shadow-[1px_0.5px_0_rgba(0,0,0,1)]', dNotice.attackerCamp === 'CT' ? 'text-[#a8d5fe]' : 'text-[#f84444]')}>{dNotice.attacker}</p>
      <img src={`/cstrike/weapon/${dNotice.weapon}.svg`} alt="weapon" className="h-6" />
      {dNotice.suffixIcons &&
        dNotice.suffixIcons.map((suffixIcon: string, i: number) => <img src={`/cstrike/deathnotice/${suffixIcon}.svg`} alt="suffix" className="h-6" key={i} />)}

      <p className={cn('drop-shadow-[1px_0.5px_0_rgba(0,0,0,1)]', dNotice.victimCamp === 'CT' ? 'text-[#a8d5fe]' : 'text-[#f84444]')}>{dNotice.victim}</p>
    </li>
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
