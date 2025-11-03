'use client'

import { H2, H3 } from '@/app/ui/Heading'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  DeathMsg,
  DefaultDeathMsg,
  CS2PrefixIconValues,
  CS2SuffixIconValues,
  CS2Weapon,
  CS2WeaponMap,
  CS2WeaponValues,
  CStrikeWeaponMap,
  CStrikeWeaponValues,
  CStrikePrefixIconValues,
  CStrikeSuffixIconValues,
  Camp,
  CampValues,
} from './dmsg'
import useDMStore from './store'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronsUpDown, Check, Save, RefreshCcw, Loader, RotateCcw, Plus, Sparkles, Trash2, Square } from 'lucide-react'
import { Key, useState } from 'react'
import { Button, Chip, Input, NumberInput, Switch, Tab, Tabs, cn } from '@heroui/react'
import { IoSwapHorizontal } from 'react-icons/io5'

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
            <Chip size="sm">测试中</Chip>
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
          <Button size="sm" variant="flat" onPress={() => reset()} className="font-semibold gap-1">
            <RotateCcw size={14} />
            重置
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">宽</a>
          <NumberInput labelPlacement="outside" size="sm" value={w} onValueChange={e => setW(e)} aria-label="宽度" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">高</a>
          <NumberInput labelPlacement="outside" size="sm" value={h} onValueChange={h => setH(h)} aria-label="高度" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">渲染倍率</a>
          <NumberInput labelPlacement="outside" size="sm" value={hidpi} onValueChange={hidpi => setHidpi(hidpi)} aria-label="渲染倍率" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">文件名前缀</a>
          <Input variant="flat" size="sm" value={prefix} onChange={prefix => setPrefix(String(prefix.target.value))} aria-label="文件名前缀" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <a className="min-w-24 text-sm">模拟游戏布局</a>
          <Switch size="sm" isSelected={mockLayout} onValueChange={mockLayout => setMockLayout(mockLayout)} aria-label="模拟游戏布局" />
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
  const { dNotices, setDNotice, cstrikeDNotices, saveDNotices, loadDNotices, resetDNotices, addDNotice, generateDNotice, gameType } = useDMStore()
  const [parent /* , enableAnimations */] = useAutoAnimate(/* optional config */)

  return (
    <section className="flex flex-col w-full gap-6 p-6 border border-zinc-300 bg-white/[.01] dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-wrap items-start gap-2">
        <H3>击杀信息调整</H3>
        <Button size="sm" variant="flat" onPress={() => saveDNotices()} className="font-semibold gap-1">
          <Save size={14} />
          保存数据
        </Button>
        <Button size="sm" variant="flat" onPress={() => loadDNotices('')} className="font-semibold gap-1">
          <Loader size={14} />
          加载数据
        </Button>
        <Button size="sm" variant="flat" onPress={() => resetDNotices()} className="font-semibold gap-1">
          <RefreshCcw size={14} />
          恢复默认
        </Button>
        <Button size="sm" color="primary" variant="flat" onPress={() => addDNotice(DefaultDeathMsg)} className="ml-auto font-semibold gap-1">
          <Plus size={14} />
          添加
        </Button>
        <Button size="sm" color="secondary" variant="flat" onPress={() => generateDNotice()} className="font-semibold gap-1">
          <Sparkles size={14} />
          生成击杀
        </Button>
      </div>
      <ul className="flex flex-col gap-6" ref={parent}>
        {(gameType === 'cs2' ? dNotices : cstrikeDNotices).map((dNotice: DeathMsg, i: number) => (
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
  const { removeDNotice, gameType } = useDMStore()
  const PrefixIconValues = gameType == 'cs2' ? CS2PrefixIconValues : CStrikePrefixIconValues
  const SuffixIconValues = gameType == 'cs2' ? CS2SuffixIconValues : CStrikeSuffixIconValues

  return (
    <ul className="grid items-center grid-cols-1 gap-4 p-4 border dark:border-zinc-800 rounded-md md:grid-cols-6 dark:bg-zinc-900/50">
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>击杀者</p>
        <div className="flex gap-2">
          <Input
            variant="flat"
            size="sm"
            value={deathNotice.attacker}
            onChange={e => setDNotice(index, { ...deathNotice, attacker: e.target.value })}
            aria-label="击杀者"
            className="flex-grow"
          />
          <CampButton value={deathNotice.attackerCamp} onChange={camp => setDNotice(index, { ...deathNotice, attackerCamp: camp })} />
        </div>
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p className="w-full flex  items-center justify-between">受害者</p>
        <div className="flex gap-2">
          <Input
            variant="flat"
            size="sm"
            value={deathNotice.victim}
            onChange={e => setDNotice(index, { ...deathNotice, victim: e.target.value })}
            aria-label="受害者"
            className="flex-grow"
          />
          <CampButton value={deathNotice.victimCamp} onChange={camp => setDNotice(index, { ...deathNotice, victimCamp: camp })} />
        </div>
      </li>
      <li className="col-span-2 flex flex-col gap-1.5 flex-grow">
        <p>武器</p>
        <div className="flex gap-3">
          <SelectSearch
            value={deathNotice.weapon}
            values={gameType == 'cs2' ? CS2WeaponValues : CStrikeWeaponValues}
            valueMap={gameType == 'cs2' ? CS2WeaponMap : CStrikeWeaponMap}
            onChange={(value: string) => setDNotice(index, { ...deathNotice, weapon: value as CS2Weapon })}
          />
        </div>
      </li>
      <li className="col-span-4 flex flex-col gap-1.5">
        <p>图标</p>
        <ul className="flex gap-2 rounded-lg">
          {PrefixIconValues.map(item => {
            const isSelected = deathNotice.prefixIcons.includes(item)
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() =>
                    isSelected
                      ? setDNotice(index, { ...deathNotice, prefixIcons: deathNotice.prefixIcons.filter(i => i !== item) })
                      : setDNotice(index, { ...deathNotice, prefixIcons: [...deathNotice.prefixIcons, item] })
                  }
                  aria-label={`切换前缀图标 ${item}`}
                  aria-pressed={isSelected}
                  className={cn(
                    'w-8 h-8 p-1.5 rounded-lg cursor-pointer transition active:scale-95 border',
                    isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
                      : 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                  )}
                >
                  <img
                    src={`/cs2/deathnotice/${item}.svg`}
                    alt={`前缀图标 ${item}`}
                    className="w-full h-full transition-all"
                    style={
                      isSelected
                        ? {
                            filter: 'brightness(0) saturate(100%) invert(45%) sepia(60%) saturate(800%) hue-rotate(180deg) brightness(95%) grayscale(20%)',
                          }
                        : {
                            filter:
                              'brightness(0) saturate(100%) invert(45%) sepia(60%) saturate(800%) hue-rotate(180deg) brightness(95%) grayscale(20%) opacity(0.2)',
                          }
                    }
                  />
                </button>
              </li>
            )
          })}
          {SuffixIconValues.map(item => {
            const isSelected = deathNotice.suffixIcons.includes(item)
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() =>
                    isSelected
                      ? setDNotice(index, { ...deathNotice, suffixIcons: deathNotice.suffixIcons.filter(i => i !== item) })
                      : setDNotice(index, { ...deathNotice, suffixIcons: [...deathNotice.suffixIcons, item] })
                  }
                  aria-label={`切换后缀图标 ${item}`}
                  aria-pressed={isSelected}
                  className={cn(
                    'w-8 h-8 p-1.5 rounded-lg cursor-pointer transition active:scale-95 border',
                    isSelected
                      ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
                      : 'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-800/50 hover:bg-orange-100 dark:hover:bg-orange-900/40'
                  )}
                >
                  <img
                    src={`/cs2/deathnotice/${item}.svg`}
                    alt={`后缀图标 ${item}`}
                    className="w-full h-full transition-all"
                    style={
                      isSelected
                        ? {
                            filter:
                              'brightness(0) saturate(100%) invert(55%) sepia(50%) saturate(700%) hue-rotate(350deg) brightness(90%) contrast(98%) grayscale(25%)',
                          }
                        : {
                            filter:
                              'brightness(0) saturate(100%) invert(55%) sepia(50%) saturate(700%) hue-rotate(350deg) brightness(90%) contrast(98%) grayscale(25%) opacity(0.25)',
                          }
                    }
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </li>
      <li className="col-span-2 mt-auto ml-auto space-x-2 flex">
        <Button variant="flat" onPress={() => removeDNotice(index)} size="sm" className="font-semibold hover:bg-red-300 hover:text-white gap-1">
          <Trash2 size={14} />
          删除
        </Button>
        <Button
          variant="flat"
          size="sm"
          className=" gap-1 font-semibold"
          onPress={() => setDNotice(index, { ...deathNotice, attacker: deathNotice.victim, victim: deathNotice.attacker })}
        >
          <IoSwapHorizontal size={14} />
          交换
        </Button>
        {gameType == 'cs2' && (
          <Button
            variant="flat"
            size="sm"
            onPress={() => setDNotice(index, { ...deathNotice, redBorder: !deathNotice.redBorder })}
            className={cn('font-semibold gap-1', deathNotice.redBorder && 'border-red-500 border text-red-400 bg-red-100 dark:bg-red-900/30')}
          >
            <Square size={14} />
            红框
          </Button>
        )}
      </li>
    </ul>
  )
}

type CampButtonProps = {
  value: Camp
  onChange: (value: Camp) => void
  label?: string
}

function CampButton({ value, onChange, label }: CampButtonProps) {
  const { gameType } = useDMStore()

  const getNextCamp = (current: Camp): Camp => {
    return current === 'CT' ? 'T' : 'CT'
  }

  const getCampColor = (camp: Camp) => {
    if (camp === '') return 'border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400'
    if (gameType === 'cs2') {
      return camp === 'CT' ? 'border-[#6F9CE6] text-[#6F9CE6]' : 'border-[#EABE54] text-[#EABE54]'
    } else {
      return camp === 'CT' ? 'border-[#a8d5fe] text-[#a8d5fe]' : 'border-[#f84444] text-[#f84444]'
    }
  }

  const displayValue = value || '—'

  return (
    <Button
      size="sm"
      variant="bordered"
      onPress={() => onChange(getNextCamp(value))}
      className={cn('font-semibold min-w-12 border-1.5', getCampColor(value))}
      aria-label={`切换阵营，当前：${value === 'CT' ? '反恐精英' : value === 'T' ? '恐怖分子' : '无'}`}
    >
      {displayValue}
    </Button>
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
        <Button variant="flat" size="sm" role="combobox" aria-expanded={open} aria-label="选择武器" className="justify-between w-full px-1.5">
          {value && (
            <img
              src={gameType === 'cs2' ? `/cs2/weapon/${value}.svg` : `/cstrike/weapon/${value}.png`}
              alt={value ? `武器 ${valueMap[value] || value}` : '未选择武器'}
              className={cn(gameType === 'cs2' ? 'h-6 p-0.5 invert-[0.7] dark:invert-[0.2]' : 'h-6 p-0', 'rounded')}
            />
          )}
          <span className="flex-grow text-left font-medium">{value ? valueMap[value] || value : '选择武器'}</span>
          <ChevronsUpDown className="w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="搜索武器装备..." aria-label="搜索武器装备" />
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
                  <span className="min-w-10">
                    <img
                      src={gameType === 'cs2' ? `/cs2/weapon/${v}.svg` : `/cstrike/weapon/${v}.png`}
                      alt="weapon"
                      className={cn(gameType === 'cs2' ? 'h-6 max-w-10 p-0.5 invert-[0.7] dark:invert-[0.2]' : 'h-6 w-16 p-0', 'bg-contain rounded ')}
                    />
                  </span>
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
  const { dNotices, cstrikeDNotices, gameType } = useDMStore()
  const [parent /* , enableAnimations */] = useAutoAnimate(/* optional config */)

  return (
    <ul className="flex flex-col items-end gap-1 pr-2.5 transition-transform" ref={parent}>
      {(gameType === 'cs2' ? dNotices : cstrikeDNotices).map((dNotice: DeathMsg, index: number) =>
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
        'flex flex-row items-center justify-center gap-1 px-2 py-2 h-8 text-sm leading-6 backdrop-blur font-bold font-[Stratum2] rounded text-white bg-black/65',
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
  // TODO 图片后处理
  return (
    <li
      key={index}
      className={cn(
        'flex flex-row items-center justify-center gap-1 px-2 py-1 h-8 text-sm leading-6 backdrop-blur font-light font-[Verdana] rounded text-white',
        hide && dNotice.hide && 'invisible'
      )}
    >
      {dNotice.prefixIcons &&
        dNotice.prefixIcons.map((prefixIcon: string, i: number) => (
          <img src={`/cstrike/deathnotice/${prefixIcon}.png`} alt="prefix" className="h-6 sepia" key={i} />
        ))}
      <p className={cn('drop-shadow-[1px_0.5px_0_rgba(0,0,0,1)]', dNotice.attackerCamp === 'CT' ? 'text-[#a8d5fe]' : 'text-[#f84444]')}>{dNotice.attacker}</p>
      <img src={`/cstrike/weapon/${dNotice.weapon}.png`} alt="weapon" className="h-6 py-0.5 sepia" />
      {dNotice.suffixIcons &&
        dNotice.suffixIcons.map((suffixIcon: string, i: number) => (
          <img src={`/cstrike/deathnotice/${suffixIcon}.png`} alt="suffix" className="h-6 py-0.5 sepia" key={i} />
        ))}

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
