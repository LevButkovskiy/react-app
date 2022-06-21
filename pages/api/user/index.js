import _ from "lodash"

import {auth} from "../../../core/modules/user"
import RequestHandler from "../../../core/utils/RequestHandler"

const handler = new RequestHandler({
	// useQs: false,
})

handler.get(async (req, res) => {
	return {
		...req.user,
	}
})

export default handler.handle
