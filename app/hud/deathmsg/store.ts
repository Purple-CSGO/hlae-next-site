import { create } from 'zustand'
import { DeathMsg, DefaultDeathMsgs } from './dmsg'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DMState {
  w: number
  h: number
  hidpi: number
  prefix: string
  dNotices: DeathMsg[]
  setW: (w: number) => void
  setH: (h: number) => void
  setHidpi: (hidpi: number) => void
  setPrefix: (prefix: string) => void
  setDNotices: (dNotices: DeathMsg[]) => void
  setDNotice: (index: number, dNotice: DeathMsg) => void
  addDNotice: (dNotice: DeathMsg) => void
  removeDNotice: (index: number) => void
  resetDNotices: () => void
  saveDNotices: () => void
  loadDNotices: (json: string) => void
}

// 创建 store
const useDMStore = create<DMState>()(
  persist(
    (set, get) => ({
      w: 1920,
      h: 1080,
      hidpi: 2,
      prefix: '测试击杀生成',
      dNotices: DefaultDeathMsgs,
      setW: (w: number) => set({ w }),
      setH: (h: number) => set({ h }),
      setHidpi: (hidpi: number) => set({ hidpi }),
      setPrefix: (prefix: string) => set({ prefix }),
      setDNotices: (dNotices: DeathMsg[]) => set({ dNotices }),
      setDNotice: (index: number, dNotice: DeathMsg) =>
        set((state: any) => ({ dNotices: [...state.dNotices.slice(0, index), dNotice, ...state.dNotices.slice(index + 1)] })),
      addDNotice: (dNotice: DeathMsg) => set((state: any) => ({ dNotices: [...state.dNotices, dNotice] })),
      removeDNotice: (index: number) => set((state: any) => ({ dNotices: state.dNotices.filter((_: any, i: number) => i !== index) })),
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
    }),
    {
      name: 'deathmsg',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useDMStore
