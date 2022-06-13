const {_} = require("lodash")
const fetch = require("node-fetch")

const getWindDirection = (deg = 0) => {
	if (deg >= 337.5 || deg < 22.5) {
		return "Северный"
	} else if (deg >= 22.5 && deg < 67.5) {
		return "Северо-восточный"
	} else if (deg >= 67.5 && deg < 112.5) {
		return "Восточный"
	} else if (deg >= 112.5 && deg < 157.5) {
		return "Юго-восточный"
	} else if (deg >= 157.5 && deg < 202.5) {
		return "Южный"
	} else if (deg >= 202.5 && deg < 247.5) {
		return "Юго-западный"
	} else if (deg >= 247.5 && deg < 292.5) {
		return "Западный"
	} else if (deg >= 292.5 && deg < 337.5) {
		return "Северо-западный"
	} else {
		return "Не определено"
	}
}

const getWeather = async ({lat = 0, lon = 0, units = "metric", lang = "ru", API_KEY = process.env.OPEN_WEATHER_API_KEY}) => {
	console.log(lat, lon)
	const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`)
		.then((res) => res.json())
		.then((res) => ({
			...res,
			main: {
				..._.get(res, "main"),
				tempRounded: Math.round(_.get(res, "main.temp", 0)),
				feels_likeRounded: Math.round(_.get(res, "main.feels_like", 0)),
				pressure: (_.get(res, "main.pressure", 0) / 1.33).toFixed(2),
			},
			wind: {
				..._.get(res, "wind"),
				direction: getWindDirection(_.get(res, "wind.deg")),
			},
			sys: {
				..._.get(res, "sys"),
				sunrise: new Date((_.get(res, "sys.sunrise") + _.get(res, "timezone")) * 1000),
				sunset: new Date((_.get(res, "sys.sunset") + _.get(res, "timezone")) * 1000),
			},
		}))
	return data
}

module.exports = {
	getWeather,
}
