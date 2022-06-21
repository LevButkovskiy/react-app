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
		// this.client = new W3CWebSocket("ws://109.107.174.238:8080/", "echo-protocol")
		this.client = new W3CWebSocket(process.env.NEXT_PUBLIC_WSS, "echo-protocol")

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
		this.send({type: "auth", client: {_id: _.get(this.user, "_id", "")}})
	}

	onMessage(e) {
		if (typeof e.data === "string") {
			console.log("data", e.data)
			const res = JSON.parse(e.data)
			this.emit(res.type, res.data)
		}
	}

	send(data = "") {
		console.log("data", data)
		this.client.send(JSON.stringify(data))
	}
}
