import { CardProps } from '@/app/ui/Card'

export const resourceData: CardProps[] = [
  {
    title: 'HLAE',
    url: 'https://github.com/advancedfx/advancedfx',
    desc: '起源游戏影片制作工具',
    background: true,
    download_cdn: 'https://api.upup.cool/get/hlae',
    download_original: 'https://github.com/advancedfx/advancedfx/releases/latest',
    image: '@/assets/img/hlae.png',
  },
  {
    title: 'FFmpeg',
    url: 'https://ffmpeg.org',
    desc: '免费开源的全能媒体转码工具',
    background: false,
    download_cdn: 'https://api.upup.cool/get/ffmpeg',
    download_original: 'https://github.com/GyanD/codexffmpeg/releases/latest',
    image: '@/assets/img/ffmpeg.webp',
  },
  {
    title: 'CFG预设 For CS2',
    url: 'https://config.upup.cool/v2',
    desc: '适用于CS2各场景的Config预设',
    background: true,
    download_cdn: 'https://api.upup.cool/get/cs2-cfg',
    download_original: 'https://github.com/Purple-CSGO/CS2-Config-Presets/releases/latest',
    icon: 'pi pi-github',
  },
  // ... 其他卡片数据
]
