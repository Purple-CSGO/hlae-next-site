import html2canvas from 'html2canvas'

export async function Canvas2Image(e: HTMLElement, name: string, dpi: number) {
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
    link.setAttribute('download', name + '.png')
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
