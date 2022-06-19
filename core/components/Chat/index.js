import {Space, message} from "antd"
import _ from "lodash"
import moment from "moment"
import {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"

import WSClient from "../../modules/wsc"
import {apiRequest} from "../../utils/request"
import Avatar from "../UI/Avatar"
import Container from "../UI/Container"
import Form from "./Form"
import Header from "./Header/"
import styles from "./styles.module.scss"

export default function Chat() {
	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState([])
	const [onlineUsers, setOnlineUsers] = useState([])
	const [to, setTo] = useState("")
	const wsClient = useRef(null)

	const user = useSelector((state) => state.user.profile)

	useEffect(() => {
		console.log(wsClient.current)
		if (!_.get(wsClient, "current.user.id") && user.id) {
			wsClient.current = new WSClient()
			wsClient.current.connect({id: _.get(user, "id")})
			wsClient.current.on("message", (data) => {
				console.log("message", data)
				setMessages((prev) => [...prev, data])
			})
			wsClient.current.on("online", (data) => {
				setOnlineUsers((data || []).filter((id) => id !== _.get(user, "id")))
			})
		}

		const messages = document.getElementById("messages")
		const form = document.getElementById("form")
		const header = document.getElementById("header")

		if (messages && form && header) {
			messages.style.height = `calc(100% - ${form.offsetHeight}px - ${header.offsetHeight}px)`
		}
	}, [user])

	const send = (message = "") => {
		if (message) {
			const data = {message, from: _.get(user, "id"), to, createdAt: new Date()}
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
			<div className={styles.chat}>
				<div className={styles.contacts}>
					{onlineUsers.map((contact) => (
						<div className={styles.contact} onClick={() => setTo(contact)}>
							<Avatar />
							<div className={styles.info}>
								<div className={styles.name}>{contact}</div>
								<div className={styles.lastMessage}>Last message</div>
							</div>
						</div>
					))}
				</div>
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
					{/* <div className={styles.form} id='form'>
							<input className={styles.input} value={message} onChange={(e) => setMessage(_.get(e, "target.value", ""))} />
							<button onClick={() => send(message)}>Отправить</button>
						</div> */}
					<Form id='form' value={message} setValue={setMessage} onFinish={() => send(message)} />
				</div>
			</div>
		</div>
	)
}
