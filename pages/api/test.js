const {spawn} = require("child_process")

import RequestHandler from "../../core/utils/RequestHandler"

const handler = new RequestHandler({
	// useQs: false,
})

handler.get(async (req, res) => {
	try {
		const ls = spawn("ls", ["-la"])

		ls.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`)
		})

		ls.stderr.on("data", (data) => {
			console.log(`stderr: ${data}`)
		})

		ls.on("error", (error) => {
			console.log(`error: ${error.message}`)
		})

		ls.on("close", (code) => {
			console.log(`child process exited with code ${code}`)
		})
	} catch (error) {
		console.error(`error`, error)
	}
})

export default handler.handle
