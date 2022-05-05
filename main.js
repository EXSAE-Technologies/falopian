const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow(){
    win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file:',
        slashes:true
    }))
}

app.on('ready',()=>{
    createWindow()
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin') app.quit()
})