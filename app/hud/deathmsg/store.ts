import { create } from 'zustand'
import { CStrikeDefaultDeathMsgs, DeathMsg, DefaultDeathMsgs } from './dmsg'
import { persist, createJSONStorage } from 'zustand/middleware'
import html2canvas from 'html2canvas'
import { Canvas2Image } from './canvas'
import { addToast } from '@heroui/react'

interface DMState {
  w: number
  h: number
  hidpi: number
  prefix: string
  gameType: string
  dNotices: DeathMsg[]
  cstrikeDNotices: DeathMsg[]
  mockLayout: boolean
  setW: (w: number) => void
  setH: (h: number) => void
  setHidpi: (hidpi: number) => void
  setPrefix: (prefix: string) => void
  setGameType: (gameType: string) => void
  reset: () => void
  setDNotices: (dNotices: DeathMsg[]) => void
  setDNotice: (index: number, dNotice: DeathMsg) => void
  addDNotice: (dNotice: DeathMsg) => void
  removeDNotice: (index: number) => void
  resetDNotices: () => void
  saveDNotices: () => void
  loadDNotices: (json: string) => void
  generateDNotice: () => void
  setMockLayout: (mockLayout: boolean) => void
}

// 创建 store
const useDMStore = create<DMState>()(
  persist(
    (set, get) => ({
      w: 1920,
      h: 1080,
      hidpi: 2,
      prefix: '击杀生成',
      gameType: 'cs2',
      dNotices: DefaultDeathMsgs,
      cstrikeDNotices: CStrikeDefaultDeathMsgs,
      mockLayout: true,
      setW: (w: number) => set({ w }),
      setH: (h: number) => set({ h }),
      setHidpi: (hidpi: number) => set({ hidpi }),
      setPrefix: (prefix: string) => set({ prefix }),
      setGameType: (gameType: string) => set({ gameType }),
      reset: () => set({ w: 1920, h: 1080, hidpi: 2, prefix: '击杀生成', dNotices: DefaultDeathMsgs, mockLayout: true }),
      setDNotices: (dNotices: DeathMsg[]) => {
        get().gameType === 'cs2' ? set({ dNotices: dNotices }) : set({ cstrikeDNotices: dNotices })
      },
      setDNotice: (index: number, dNotice: DeathMsg) => {
        get().gameType === 'cs2'
          ? set((state: DMState) => ({ dNotices: [...state.dNotices.slice(0, index), dNotice, ...state.dNotices.slice(index + 1)] }))
          : set((state: DMState) => ({ cstrikeDNotices: [...state.cstrikeDNotices.slice(0, index), dNotice, ...state.cstrikeDNotices.slice(index + 1)] }))
      },
      addDNotice: (dNotice: DeathMsg) => {
        get().gameType === 'cs2'
          ? set((state: DMState) => ({ dNotices: [...state.dNotices, dNotice] }))
          : set((state: DMState) => ({ cstrikeDNotices: [...state.cstrikeDNotices, dNotice] }))
      },
      removeDNotice: (index: number) => {
        get().gameType === 'cs2'
          ? set((state: DMState) => ({ dNotices: state.dNotices.filter((_, i: number) => i !== index) }))
          : set((state: DMState) => ({ cstrikeDNotices: state.cstrikeDNotices.filter((_, i: number) => i !== index) }))
      },
      resetDNotices: () => {
        get().gameType === 'cs2' ? set({ dNotices: DefaultDeathMsgs }) : set({ cstrikeDNotices: CStrikeDefaultDeathMsgs })
      },
      saveDNotices: () => {
        const jsonData = JSON.stringify({ dNotices: get().gameType === 'cs2' ? get().dNotices : get().cstrikeDNotices })
        // 弹出下载
        const blob = new Blob([jsonData], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = get().prefix + '_dNotices.json'
        a.click()
        URL.revokeObjectURL(url)
      },
      loadDNotices: (json: string) => {
        // 上传文件并读取json
        // 弹出文件上传对话框
        // set({ dNotices: JSON.parse(json).dNotices })
      },
      generateDNotice: async () => {
        const { w, h, hidpi, prefix, dNotices } = get()

        // html2canvas获取元素、生成图片、并跳转下载
        const e = document.getElementById('deathnotice')
        if (e === null) return

        // 生产环境适配
        const style = document.createElement('style')
        if (process.env.NODE_ENV === 'production') {
          document.head.appendChild(style)
          style.sheet?.insertRule('body > div:last-child img { display: inline-block; }')
        }

        const dpi = hidpi ? hidpi : 1 // 缩放倍率，不随浏览器缩放改变

        const mockLayoutGeneration = async () => {
          // 生成过程 模拟游戏布局
          for (let i = 0; i < dNotices.length; i++) {
            // 隐藏其他击杀条
            for (let j = 0; j < dNotices.length; j++) {
              get().setDNotice(j, { ...dNotices[j], hide: j !== i })
            }

            await sleep(50)

            Canvas2Image(e, prefix + '-' + i, dpi)
          }

          for (let j = 0; j < dNotices.length; j++) {
            get().setDNotice(j, { ...dNotices[j], hide: false })
          }
        }

        const simpleGeneration = async () => {
          // 分别渲染 DeathNoticeRender 的所有 li组件，并下载png
          for (let i = 0; i < dNotices.length; i++) {
            get().setDNotice(i, { ...dNotices[i], hide: false })
          }

          const dnList = e.getElementsByTagName('li')
          let i = 1
          for (const dn of dnList) {
            await sleep(10)
            Canvas2Image(dn, prefix + '-' + i, dpi)
            i++
          }
        }

        if (get().mockLayout) {
          mockLayoutGeneration()
        } else {
          simpleGeneration()
        }

        style.remove()
        addToast({
          title: '生成成功',
          description: '请查看下载文件夹',
        })
      },
      setMockLayout: (mockLayout: boolean) => set({ mockLayout }),
    }),
    {
      name: 'deathmsg',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

function sleep(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

export default useDMStore
