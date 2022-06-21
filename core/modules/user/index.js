const {getColl, ObjectId} = require("../../db")
const bcrypt = require("bcrypt")
const {SALT_ROUNDS} = require("../../constants")

const createError = (error) => {
	return {success: false, error: {message: error}}
}

module.exports = {
	auth: async ({login, password}) => {
		try {
			if (!login && !password) {
				return createError("empty login and password")
			}
			if (!login) {
				return createError("empty login")
			}
			if (!password) {
				return createError("empty password")
			}

			const coll = getColl("users")
			const user = await coll.findOne({login})
			if (!user) {
				return createError("user not exists")
			}

			const isPasswordCompare = await bcrypt.compare(password, user.encryptedPassword)
			if (!isPasswordCompare) {
				return createError("wrong password")
			}

			return {success: true, data: user}
		} catch (error) {
			console.log("auth()", error)
		}
	},
	findUser: async (filter) => {
		try {
			if (!filter) {
				return createError("filter required")
			}

			if (filter._id) {
				filter._id = new ObjectId(filter._id)
			}

			const coll = awaitgetColl("users")
			const user = await coll.findOne({...filter})

			return {success: true, data: user}
		} catch (error) {
			console.log("findUser()", error)
		}
	},
	createUser: async ({login, password}) => {
		try {
			if (!login && !password) {
				return createError("empty login and password")
			}
			if (!login) {
				return createError("empty login")
			}
			if (!password) {
				return createError("empty password")
			}

			const coll = getColl("users")
			const user = await coll.findOne({login})

			if (user) {
				return createError("user already exists")
			}

			const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS)
			const res = await coll.insertOne({login, encryptedPassword})
			return {success: res.acknowledged, data: {...res}}
		} catch (error) {
			console.log("createUser()", error)
		}
	},
	deleteUser: async (_id) => {
		try {
			if (!_id) {
				return createError("_id required")
			}

			const coll = getColl("users")
			const res = await coll.deleteOne({_id: new ObjectId(_id)})
			return {success: res.acknowledged, data: {...res}}
		} catch (error) {
			console.log("deleteUser()", error)
		}
	},
}
