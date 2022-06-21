import _ from "lodash"

import {auth} from "../../../core/modules/user"
import RequestHandler from "../../../core/utils/RequestHandler"

const handler = new RequestHandler({
	// useQs: false,
})

handler.post(async (req, res) => {
	try {
		const result = await auth(_.get(req, "body"))
		console.log(result)
		if (result.success) {
			res.statusCode = 200
		} else {
			res.statusCode = 500
		}
		return result
	} catch (error) {
		console.error(`error`, error)
		return {success: false, error: {message: error}}
	}
})

export default handler.handle
