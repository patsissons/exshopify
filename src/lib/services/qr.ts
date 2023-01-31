import QRCode from 'qrcode'

export interface QROptions {
  width?: number
  margin?: number
  imageSrc?: string
  imageWidth?: number
  imageMargin?: number
  imageCrossOrigin?: string
  type?: string
  footer?: string
}

export async function buildQRDataUrl(
  url: string,
  {
    width = 300,
    margin = 50,
    imageSrc,
    imageWidth = Math.floor(width / 4),
    imageMargin = Math.floor(width / 50),
    imageCrossOrigin = 'anonymous',
    type = 'image/png',
    footer,
  }: QROptions = {}
) {
  const layoutWidth = width + margin

  const canvas = document.createElement('canvas')
  QRCode.toCanvas(canvas, url, {
    width,
    margin: 1,
  })

  const layoutCanvas = document.createElement('canvas')
  layoutCanvas.width = layoutCanvas.height = layoutWidth
  const ctx = layoutCanvas.getContext('2d')
  if (!ctx) {
    throw new Error('Unable to create drawing canvas')
  }

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, layoutWidth, layoutWidth)
  ctx.drawImage(canvas, margin / 2, 0)

  if (imageSrc) {
    const image = new Image()
    image.setAttribute('crossOrigin', imageCrossOrigin)
    image.src = imageSrc

    await new Promise((resolve) => {
      image.onload = () => {
        resolve(true)
      }
    })

    const imageX = layoutWidth / 2 - imageWidth / 2
    const imageY = width / 2 - imageWidth / 2
    ctx.fillRect(
      imageX - imageMargin / 2,
      imageY - imageMargin / 2,
      imageWidth + imageMargin,
      imageWidth + imageMargin
    )
    ctx.drawImage(
      image,
      layoutWidth / 2 - imageWidth / 2,
      width / 2 - imageWidth / 2,
      imageWidth,
      imageWidth
    )
  }

  if (footer) {
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.font = '36px sans-serif'
    ctx.fillText(footer, layoutWidth / 2, layoutWidth - 10, layoutWidth)
  }

  return layoutCanvas.toDataURL(type)
}
