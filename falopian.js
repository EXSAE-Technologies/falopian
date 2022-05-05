const net = require('net')

function handleClient(connection){
    console.log("\nClient connected")
    console.log(`${connection.remoteAddress} - ${connection.remotePort}`)

    connection.on('end',()=>{
        console.log(`Client ${connection.remoteAddress} - ${connection.remotePort} disconnected`)
    })

    connection.on("error",(error)=>{
        console.log(error.message)
        console.log(`Client ${connection.remoteAddress} - ${connection.remotePort} disconnected`)
    })

    connection.on("data",(data)=>{
        console.log(data.toString())
    })
}

exports.startServer = function (port,callback){
    const server = net.createServer((connection)=>{
        handleClient(connection)
    })
    
    return server.listen({host:'0.0.0.0',port:port},()=>{
        callback(server)
    })

}

