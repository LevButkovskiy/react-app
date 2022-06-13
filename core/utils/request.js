import createError from "http-errors"
import _ from "lodash"
import qs from "qs"

/**
 * Создание авторизованного запроса к втроенному API
 *
 * @async
 * @function apiRequest
 * @param {string} path URL к встроенному API
 * @param {object} [query] Query объект
 * @param {object} [options] Параметры запроса
 * @param {("GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH")} [options.method] Метод запроса
 * @param {object} [options.body] Тело запроса
 * @param {object} [options.headers] Заголовки запроса
 * @returns {Promise<object>}
 */
export function apiRequest(path, query, options = {}) {
	const u = new URL(window.location.href)
	u.pathname = `/api${path}`
	u.search = ""
	u.hash = ""
	return jsonRequest(u.toString(), query, options)
}

export async function jsonRequest(url, query, options = {}) {
	const u = new URL(url)

	const {body, headers, ...rest} = options

	const trueHeaders = {
		...headers,
		...(localStorage.getItem("JWT_TOKEN")
			? {
					Authorization: localStorage.getItem("JWT_TOKEN"),
			  }
			: {}),
	}

	u.search += [qs.stringify(query), _.isString(query) ? query : false]
		.filter(Boolean)
		.map((i) => i.replace(/^\?/, ""))
		.join("&")

	const res = await fetch(u.toString(), {
		...(body
			? {
					headers: {
						...trueHeaders,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
			  }
			: {headers: trueHeaders}),
		...rest,
	})

	const json = await res.json()
	if (!res.ok) {
		if (res.status == 401) {
			if (location && !location.pathname.includes("/user/login")) location.replace("/user/login?redirectURL=" + location.pathname + location.search)
		} else {
			throw createError(res.status, res.statusText, json)
		}
	}

	return json
}
