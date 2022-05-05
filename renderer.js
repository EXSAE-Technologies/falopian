
document.querySelector("#falopian-server").addEventListener('change',(event)=>{
    window.electronAPI.startServer(event.target.checked,(status)=>{
        console.log(status)
    })
})