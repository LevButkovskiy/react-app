import {Space, message} from "antd"
import _ from "lodash"
import moment from "moment"
import {useEffect, useRef, useState} from "react"

import WSClient from "../../modules/wsc"
import {apiRequest} from "../../utils/request"
import Container from "../UI/Container"
import Header from "./Header.js"
import styles from "./styles.module.scss"

export default function Chat() {
	const [user, setUser] = useState({})
	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState([])
	const [to, setTo] = useState("")
	const wsClient = useRef(null)

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		const id = params.get("user")
		setUser({id})
		if (!wsClient.current) {
			wsClient.current = new WSClient()
			wsClient.current.connect({id: id})
			wsClient.current.on("message", (data) => {
				console.log(data)
				setMessages((prev) => [...prev, data])
			})
		}

		const messages = document.getElementById("messages")
		const form = document.getElementById("form")
		const header = document.getElementById("header")

		if (messages && header) {
			messages.style.height = `calc(100% - ${form.offsetHeight}px - ${header.offsetHeight}px)`
		}
	}, [])

	const send = (message = "", to = "") => {
		if (message) {
			const data = {message, from: _.get(user, "id"), to: to, createdAt: new Date()}
			setMessages((prev) => [...prev, data])
			wsClient.current.send(data)
			setMessage("")
		}
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
						<Header name={to} />
						<div className={styles.messages} id='messages'>
							{messages.map(({message, from, createdAt}) => (
								<div className={`${styles.message} ${from === _.get(user, "id") ? styles.personal : styles.other}`}>
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
							<input value={to} onChange={(e) => setTo(_.get(e, "target.value", ""))} />

							<button onClick={() => send(message, to)}>Отправить</button>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
