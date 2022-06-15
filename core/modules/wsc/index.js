import EventEmitter from "events"

import {w3cwebsocket as W3CWebSocket} from "websocket"

export default class WSClient extends EventEmitter {
	constructor() {
		super()
		this.connect()
	}

	connect() {
		this.client = new W3CWebSocket("ws://localhost:8080/", "echo-protocol")

		this.client.onerror = function (error) {
			console.log("Connect Error: " + error.toString())
		}

		this.client.onopen = function () {
			console.log("WebSocket Client Connected")
		}

		this.client.onclose = function () {
			console.log("echo-protocol Client Closed")
		}

		this.client.onmessage = this.onMessage.bind(this)
	}

	onMessage(e) {
		if (typeof e.data === "string") {
			this.emit("message", e.data)
		}
	}

	send(data = "") {
		this.client.send(data)
	}
}
