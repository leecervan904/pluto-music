import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, '../dist-electron/preload.js'), // 需要引用js文件
    },
    width: 1002,
    height: 670,
    minWidth: 1002,
    minHeight: 670,
  })

  win.webContents.openDevTools()

  if (app.isPackaged) {
    // 如果打包了，渲染 dist/index.html
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  } else {
    // 本地启动的vue项目路径
    win.loadURL('http://localhost:8030')
  }
}

app.whenReady().then(() => {
  createWindow() // 创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
