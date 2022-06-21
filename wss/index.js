var WebSocketServer = require("websocket").server
var http = require("http")
const _ = require("lodash")

const {ObjectID, client, collections, dbName, getColl, connection: mongoConnection} = require("../core/db")

var server = http.createServer(function (request, response) {
	console.log(new Date() + " Received request for " + request.url)
	response.writeHead(404)
	response.end()
})
server.listen(8080, function () {
	console.log(new Date() + " Server is listening on port 8080")
})

const wsServer = new WebSocketServer({
	httpServer: server,
	// You should not use autoAcceptConnections for production
	// applications, as it defeats all standard cross-origin protection
	// facilities built into the protocol and the browser.  You should
	// *always* verify the connection's origin and decide whether or not
	// to accept it.
	autoAcceptConnections: false,
})

function originIsAllowed(origin) {
	// put logic here to detect whether the specified origin is allowed.
	return true
}

const prepareData = (type, data) => {
	return JSON.stringify({type, data})
}

const updateOnline = () => {
	const connections = _.get(wsServer, "connections", [])
	const onlineUsers = connections.map((e) => e._id)
	connections.map((conn) => conn.sendUTF(prepareData("online", onlineUsers)))
}

wsServer.on("request", function (request) {
	// new Promise(async (resolve, reject) => {
	// 	await mongoConnection
	// 	const coll = await getColl("online")
	// 	const data = await coll.find({}).toArray()
	// 	await coll.insertOne({user: "f"})
	// 	resolve(data)
	// })
	// 	.then((data) => {
	// 		console.log(data)
	// 	})
	// 	.catch(console.log)
	if (!originIsAllowed(request.origin)) {
		// Make sure we only accept requests from an allowed origin
		request.reject()
		console.log(new Date() + " Connection from origin " + request.origin + " rejected.")
		return
	}

	var connection = request.accept("echo-protocol", request.origin)

	console.log(new Date() + " Connection accepted.")
	connection.on("message", function (message) {
		if (message.type === "utf8") {
			try {
				console.log("Received Message: " + message.utf8Data)

				const jsonMessage = JSON.parse(message.utf8Data)

				if (_.get(jsonMessage, "type", "") === "auth") {
					connection._id = _.get(jsonMessage, "client._id")
					updateOnline()
				} else {
					const reciever = _.get(wsServer, "connections", []).find((e) => e._id === _.get(jsonMessage, "to", ""))
					reciever?.sendUTF(prepareData("message", jsonMessage))
				}
			} catch (error) {
				console.log(error)
			}
		} else if (message.type === "binary") {
			console.log("Received Binary Message of " + message.binaryData.length + " bytes")
			connection.sendBytes(message.binaryData)
		}
	})

	connection.on("close", function (reasonCode, description) {
		updateOnline()
	})
})
