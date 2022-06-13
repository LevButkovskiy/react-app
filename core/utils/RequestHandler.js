import createError from "http-errors"
import qs from "qs"

export default class RequestHandler {
	constructor(props) {
		this._fns = []
		this.handle = this.handle.bind(this)
		this._props = {
			useQs: true,
			...props,
		}
	}
	use(...fns) {
		this._fns = [...this._fns, ...fns]
		return this
	}
	_getHandlers(method) {
		const fns = this[`_${method.toLowerCase()}`]
		if (!fns) throw createError(404)
		return fns
	}
	async handle(...args) {
		let req = args[0],
			res = args[1]
		let ctx = args[0]
		let method = req.method
		let ssr = false
		if (this._props.useQs && req.url.indexOf("?") > -1) req.query = qs.parse(req.url.replace(/.+\?/, ""))
		if (args.length < 2) {
			ssr = true
			req = ctx.req
			res = ctx.res
			method = "ssr"
			req.query = {...ctx.query, ...ctx.params}
		}

		res.set = (...args) => res.setHeader(...args)
		if (ssr)
			res.status = (status) => {
				res.statusCode = status
				return {send: () => res.end("")}
			}

		try {
			const handlers = [
				...this._fns,
				...this._getHandlers(method).map((fn) => async (req, res, next) => {
					try {
						const r = await fn(req, res, next)
						next()
						return r
					} catch (e) {
						next(e)
					}
				}),
			]
			let result
			for (const fn of handlers) {
				let r
				await new Promise((resolve, reject) => {
					r = fn(req, res, (e) => {
						if (e) return reject(e)
						resolve()
					})
				})
				if (handlers.indexOf(fn) === handlers.length - 1) result = await r
			}

			if (!(res.headersSent || res.writableEnded) && !ssr) res.json(result)

			if (ssr) return {props: result}
		} catch (e) {
			if (!e.statusCode) if (ssr || res.headersSent || res.writableEnded) throw e
			const err = e.expose ? e : createError(500)
			res.status(err.statusCode)
			res.json({
				statusCode: err.statusCode,
				message: err.message,
				...(err.details
					? {
							details: err.details,
					  }
					: {}),
			})
		}
	}
	get(...fns) {
		this._get = [...fns]
		return this
	}
	put(...fns) {
		this._put = [...fns]
		return this
	}
	patch(...fns) {
		this._patch = [...fns]
		return this
	}
	post(...fns) {
		this._post = [...fns]
		return this
	}
	delete(...fns) {
		this._delete = [...fns]
		return this
	}
	ssr(...fns) {
		this._ssr = [...fns]
		return this
	}
}
