const {_} = require("lodash")
const fetch = require("node-fetch")

const getWeather = async ({lat = 0, lon = 0, units = "metric", lang = "ru", API_KEY = process.env.OPEN_WEATHER_API_KEY}) => {
	console.log(lat, lon)
	const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`)
		.then((res) => res.json())
		.then((res) => ({
			...res,
			sys: {
				..._.get(res, "sys"),
				sunrise: new Date((_.get(res, "sys.sunrise") + _.get(res, "timezone")) * 1000),
				sunset: new Date((_.get(res, "sys.sunset") + _.get(res, "timezone")) * 1000),
			},
		}))
	return data
}

module.exports = {
	getWeather: getWeather,
}
