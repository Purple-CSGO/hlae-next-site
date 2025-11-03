import { toPng } from 'html-to-image'

export async function Canvas2Image(e: HTMLElement, name: string, dpi: number) {
  // 滚动条置顶解决生成图片不全的问题
  window.scrollY = 0
  document.documentElement.scrollTop = 0
  document.documentElement.scrollLeft = 0
  document.body.scrollTop = 0
  
  // 保存原始样式
  const originalPosition = e.style.position
  const originalTop = e.style.top
  const originalBottom = e.style.bottom
  const originalLeft = e.style.left
  const originalRight = e.style.right
  const originalVisibility = e.style.visibility
  
  try {
    // 临时调整元素位置，确保在视口内可见
    e.style.position = 'relative'
    e.style.top = '0'
    e.style.bottom = 'auto'
    e.style.left = '0'
    e.style.right = 'auto'
    e.style.visibility = 'visible'
    
    // 等待样式应用
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const dataUrl = await toPng(e, {
      backgroundColor: null, // 使用 null 来生成透明背景
      pixelRatio: dpi,
      quality: 1.0,
      style: {
        letterSpacing: 'normal',
        lineHeight: 'normal',
      },
    })
    
    if (dataUrl !== '') {
      const link = document.createElement('a')
      link.href = dataUrl
      link.setAttribute('download', name + '.png')
      link.style.display = 'none'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('生成 PNG 失败:', error)
  } finally {
    // 恢复原始样式
    e.style.position = originalPosition
    e.style.top = originalTop
    e.style.bottom = originalBottom
    e.style.left = originalLeft
    e.style.right = originalRight
    e.style.visibility = originalVisibility
  }
}
