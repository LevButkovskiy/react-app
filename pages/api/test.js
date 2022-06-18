const {spawn} = require("child_process")

import RequestHandler from "../../core/utils/RequestHandler"

const handler = new RequestHandler({
	// useQs: false,
})

handler.get(async (req, res) => {
	try {
	} catch (error) {
		console.error(`error`, error)
	}
})

export default handler.handle
