const { contextBridge, ipcRenderer } = require('electron')
const falopian = require('./falopian')

let server

function serverSatus(){
    if(Boolean(server)){
        statusSer =  server.listening
    } else {
        statusSer =  false
    }
    return statusSer
}

contextBridge.exposeInMainWorld('electronAPI', {
    //myCallback: (data) => ipcRenderer.send('my-event', data),
    serverStatus: serverSatus,
    startServer: (start,callback) => {
        if(start){
            server = falopian.startServer(9000,(s)=>{
                callback(serverSatus())
            })
            server.on('error',(error)=>{
                console.log(error.message)
            })
        } else {
            server.close((error)=>{
                if(error !== undefined){
                    console.log(error)
                }
            })
            callback(serverSatus())
        }
    }
})

window.addEventListener('DOMContentLoaded',()=>{
    console.log(document.querySelector("#falopian-server").value)
})
