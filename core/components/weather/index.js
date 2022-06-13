import {Space, message} from "antd"
import _ from "lodash"
import {useEffect, useState} from "react"

import {apiRequest} from "../../utils/request"

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
	}, [])

	return (
		<Space direction='vertical'>
			{params.map(({title, key, measure}) => (
				<div>
					<b>{title}: </b>
					{_.get(weather, key, "")} {measure}
				</div>
			))}
		</Space>
	)
}
