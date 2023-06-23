import * as fs from 'node:fs'
import { resolve } from 'node:path'

function loadSvgIcons() {
  const files = fs.readFileSync(resolve(__dirname, '../src/assets/icons/svg/add.svg'))
  let dom = files.toString()
  dom = dom.replace('<svg', '<symbol id="icon-add"')
  dom = dom.replace('</svg>', '</symbol>')
  console.log('dom: ', dom)
  return [dom]
}

export default function VitePluginSvgSprite(path, prefix = 'icon') {
  if (path === '')
    return
  const res = loadSvgIcons(path) // 获取处理好的svg内容
  console.log(res)

  return {
    name: 'svg-transform', // 必须的，将会在 warning 和 error 中显示
    transformIndexHtml(html) {
      // 转换 index.html 的专用钩子
      console.log(html)
      html = html.replace(/<title>(.*?)<\/title>/, '<title>Title replaced!</title>')

      return html.replace(
        '<body>',
        `
          <head>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join('')}
            </svg>
        `,
      )
    },
  }
}
