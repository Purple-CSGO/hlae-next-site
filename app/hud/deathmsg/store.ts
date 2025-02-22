import { create } from 'zustand'
import { DeathMsg, DefaultDeathMsgs } from './dmsg'
import { persist, createJSONStorage } from 'zustand/middleware'
import html2canvas from 'html2canvas'

interface DMState {
  w: number
  h: number
  hidpi: number
  prefix: string
  dNotices: DeathMsg[]
  mockLayout: boolean
  setW: (w: number) => void
  setH: (h: number) => void
  setHidpi: (hidpi: number) => void
  setPrefix: (prefix: string) => void
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
      prefix: '击杀生成-',
      dNotices: DefaultDeathMsgs,
      mockLayout: true,
      setW: (w: number) => set({ w }),
      setH: (h: number) => set({ h }),
      setHidpi: (hidpi: number) => set({ hidpi }),
      setPrefix: (prefix: string) => set({ prefix }),
      reset: () => set({ w: 1920, h: 1080, hidpi: 2, prefix: '击杀生成-' }),
      setDNotices: (dNotices: DeathMsg[]) => set({ dNotices }),
      setDNotice: (index: number, dNotice: DeathMsg) =>
        set((state: DMState) => ({ dNotices: [...state.dNotices.slice(0, index), dNotice, ...state.dNotices.slice(index + 1)] })),
      addDNotice: (dNotice: DeathMsg) => set((state: DMState) => ({ dNotices: [...state.dNotices, dNotice] })),
      removeDNotice: (index: number) => set((state: DMState) => ({ dNotices: state.dNotices.filter((_, i: number) => i !== index) })),
      resetDNotices: () => set({ dNotices: DefaultDeathMsgs }),
      saveDNotices: () => {
        const jsonData = JSON.stringify({ dNotices: get().dNotices })
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

            // 滚动条置顶解决生成图片不全的问题
            window.scrollY = 0
            document.documentElement.scrollTop = 0
            document.documentElement.scrollLeft = 0
            document.body.scrollTop = 0
            const canvas: HTMLCanvasElement = await html2canvas(e, {
              allowTaint: false,
              useCORS: false,
              backgroundColor: 'rgba(0,0,0,0)',
              scale: dpi,
            })
            const dataURL = canvas.toDataURL('image/png')
            if (dataURL !== '') {
              const link = document.createElement('a')
              const context = canvas.getContext('2d')
              if (context === null) return

              // [重要]关闭抗锯齿
              // context.imageSmoothingEnabled = false;
              link.href = canvas.toDataURL()
              link.setAttribute('download', prefix + i + '.png')
              link.style.display = 'none'

              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
          }

          for (let j = 0; j < dNotices.length; j++) {
            get().setDNotice(j, { ...dNotices[j], hide: false })
          }
        }

        const simpleGeneration = async () => {}

        if (get().mockLayout) {
          mockLayoutGeneration()
        } else {
          simpleGeneration()
        }

        style.remove()
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
