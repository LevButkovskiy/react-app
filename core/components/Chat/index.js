import {Space, message} from "antd"
import _ from "lodash"
import moment from "moment"
import {useEffect, useRef, useState} from "react"

import WSClient from "../../modules/wsc"
import {apiRequest} from "../../utils/request"
import Container from "../UI/Container"
import styles from "./styles.module.scss"

export default function Chat() {
	const [message, setMessage] = useState("")
	const [sender, setSender] = useState("Anonimous")
	const [messages, setMessages] = useState([])
	const wsClient = useRef(null)

	useEffect(() => {
		if (!wsClient.current) {
			wsClient.current = new WSClient()
			wsClient.current.connect()
			wsClient.current.on("message", (data) => {
				setMessages((prev) => [...prev, data])
			})
		}

		const messages = document.getElementById("messages")
		const form = document.getElementById("form")

		if (messages && form) {
			messages.style.height = `calc(100% - ${form.offsetHeight}px)`
		}
	}, [])

	const send = (message = "", from = "") => {
		wsClient.current.send({message, from, createdAt: new Date()})
	}

	useEffect(() => {
		const messages = document.getElementById("messages")
		if (messages) {
			messages.scrollTop = messages.scrollHeight
		}
	}, [messages])

	return (
		<div className={styles.page}>
			<Container>
				<div className={styles.chat}>
					<div className={styles.contacts}>fd</div>
					<div className={styles.messenger}>
						<div className={styles.messages} id='messages'>
							{messages.map(({message, from, createdAt}) => (
								<div className={`${styles.message} ${from === sender ? styles.personal : styles.other}`}>
									<div className={styles.content}>
										<div className={styles.sender}>{from}</div>
										<div>{message}</div>
										<div className={styles.date}>{moment(createdAt).format("HH:mm")}</div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.form} id='form'>
							<input className={styles.input} value={message} onChange={(e) => setMessage(_.get(e, "target.value", ""))} />
							<input value={sender} onChange={(e) => setSender(_.get(e, "target.value", ""))} />

							<button onClick={() => send(message, sender)}>Отправить</button>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
