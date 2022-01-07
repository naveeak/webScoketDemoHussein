//https://www.youtube.com/watch?v=2Nt-ZrNP22A
//https://github.com/hnasr/javascript_playground/blob/master/websocket-demo/index.js
const http = require("http")
console.log(http)
const webSocketServer = require("websocket").server

let connection = null

const httpserver = http.createServer((req, res) =>
    console.log("received http respinse ")
)

const websocket = new webSocketServer({
    "httpServer": httpserver
})

httpserver.listen(8080, () => console.log("Started listening 8080"))

websocket.on("request", request => {

    connection = request.accept(null, request.origin)
    connection.on("open", () => console.log("opened"))
    connection.on("close", () => console.log("closed"))
    connection.on("message", message => {
        console.log(`Message received ${message.utf8Data}`)
        connection.send(`got your message !!`)
    })
    repeater()
})

function repeater() {

    connection.send(`Message ${Math.random()}`)
    setTimeout(repeater, 2000)
}