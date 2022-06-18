import {Space, message} from "antd"
import _ from "lodash"
import {useEffect, useRef, useState} from "react"

import WSClient from "../../modules/wsc"
import {apiRequest} from "../../utils/request"
import styles from "./styles.module.scss"

const params = [
	{title: "Местоположение", key: "name"},
	{title: "Погода", key: "weather[0].description"},
	{title: "Температура", key: "main.tempRounded"},
	{title: "Ощущается", key: "main.feels_likeRounded"},
	{title: "Ветер", key: "wind.speed", measure: "м/c"},
	{title: "Направление", key: "wind.direction"},
	{title: "Давление", key: "main.pressure", measure: "мм.рт.ст"},
	{title: "Влажность", key: "main.humidity", measure: "%"},
]

export default function WeatherPage() {
	const [weather, setWeather] = useState({})
	const [messages, setMessages] = useState([])
	const wsClient = useRef(null)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position, error) => {
			const {latitude: lat, longitude: lon} = _.get(position, "coords")
			apiRequest("/weather", {lat, lon})
				.then(setWeather)
				.catch((e) => {
					console.error(e)
					message.error(e)
				})
		})

		if (!wsClient.current) {
			wsClient.current = new WSClient()
			wsClient.current.connect()
			wsClient.current.on("message", (data) => {
				setMessages((prev) => [...prev, data])
			})
		}
	}, [])

	const send = () => {
		wsClient.current.send("SFSF")
	}

	return (
		<Space direction='vertical'>
			<div className={styles.weather}>
				{params.map(({title, key, measure}) => (
					<div onClick={send}>
						<b>{title}: </b>
						{_.get(weather, key, "")} {measure}
					</div>
				))}
			</div>
			{messages}
		</Space>
	)
}
