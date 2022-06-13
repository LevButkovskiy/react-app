const {getWeather} = require(".")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path: path.resolve(__dirname, "../../../.env.local")})

for (let i = 0; i < 5; i++) {
	test("get Weather with rand coordinates " + (i + 1), () => {
		const lat = Math.random() * 180 - 90
		const lon = Math.random() * 360 - 180

		return getWeather({lat, lon, API_KEY: process.env.OPEN_WEATHER_API_KEY}).then((res) => {
			expect(res?.main?.temp).toBeDefined()
		})
	})
}
