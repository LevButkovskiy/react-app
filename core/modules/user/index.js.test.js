const {auth, createUser, deleteUser} = require(".")

const testData = {
	user_empty: {},
	user_empty_login: {
		password: "sample password",
	},
	user_empty_password: {
		login: "sample login",
	},
	user_non_exists: {
		login: "sample login not exists",
		password: "sample password not exists",
	},
	user_wrong_password: {
		login: "sample login",
		password: "wrong password",
	},
	user_test: {
		login: "sample login",
		password: "sample password",
	},
	user_new: {
		login: "new login",
		password: "new password",
	},
}

const updatedData = {
	insertedId: "",
}

test("createUser() user emtpty data ", async () => {
	const res = await createUser(testData.user_empty)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("empty login and password")
})

test("createUser() empty login", async () => {
	const res = await createUser(testData.user_empty_login)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("empty login")
})

test("createUser() empty password", async () => {
	const res = await createUser(testData.user_empty_password)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("empty password")
})

test("createUser()", async () => {
	const res = await createUser(testData.user_new)
	expect(res).toBeDefined()
	expect(res.success).toBe(true)
	expect(res.data.insertedId).toBeDefined()
	updatedData.insertedId = res.data.insertedId
})

test("createUser() user already exists", async () => {
	const res = await createUser(testData.user_test)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("user already exists")
})

test("auth() empty login and password", async () => {
	const res = await auth(testData.user_empty)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("empty login and password")
})

test("auth() empty login", async () => {
	const res = await auth(testData.user_empty_login)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("empty login")
})

test("auth() empty password", async () => {
	const res = await auth(testData.user_empty_password)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("empty password")
})

test("auth() non-existence user", async () => {
	const res = await auth(testData.user_non_exists)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("user not exists")
})

test("auth() wrong password", async () => {
	const res = await auth(testData.user_wrong_password)
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("wrong password")
})

test("auth()", async () => {
	const res = await auth(testData.user_test)
	expect(res).toBeDefined()
	expect(res.success).toBe(true)
	expect(res.data).toHaveProperty("login", testData.user_test.login)
})

test("deleteUser() no _id", async () => {
	const res = await deleteUser()
	expect(res).toBeDefined()
	expect(res.success).toBe(false)
	expect(res.error.message).toBe("_id required")
})

test("deleteUser()", async () => {
	const res = await deleteUser(updatedData.insertedId)
	expect(res).toBeDefined()
	expect(res.success).toBe(true)
	expect(res.data.deletedCount).toBeDefined()
	expect(res.data.deletedCount).toBe(1)
})
