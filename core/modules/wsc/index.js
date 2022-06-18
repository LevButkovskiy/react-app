import EventEmitter from "events"

import {w3cwebsocket as W3CWebSocket} from "websocket"

export default class WSClient extends EventEmitter {
	constructor() {
		super()
		this.user = {}
	}

	connect(user = {}) {
		console.log(user)
		this.user = user
		this.client = new W3CWebSocket("ws://localhost:8080/", "echo-protocol", "a", "b", "c", "d")

		this.client.onerror = function (error) {
			console.log("Connect Error: " + error.toString())
		}

		this.client.onopen = this.onOpen.bind(this)

		this.client.onclose = function () {
			console.log("echo-protocol Client Closed")
		}

		this.client.onmessage = this.onMessage.bind(this)
	}

	onOpen() {
		console.log("WebSocket Client Connected")
		console.log(this.user)
		this.send({type: "auth", client: {id: _.get(this.user, "id", "")}})
	}

	onMessage(e) {
		if (typeof e.data === "string") {
			this.emit("message", JSON.parse(e.data))
		}
	}

	send(data = "") {
		console.log("data", data)
		this.client.send(JSON.stringify(data))
	}
}
