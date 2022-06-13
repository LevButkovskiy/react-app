import _ from "lodash"

import getWeather from "../../core/modules/weather"
import RequestHandler from "../../core/utils/RequestHandler"

const handler = new RequestHandler({
	// useQs: false,
})

handler.get(async (req, res) => {
	try {
		return await getWeather({..._.get(req, "query")})
	} catch (error) {
		console.error(`error`, error)
	}
})

export default handler.handle
