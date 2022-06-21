import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {apiRequest} from "../../../utils/request"

const initialState = {
	profile: {
		_id: "",
		name: "",
	},
	initial: true,
}

const getUser = createAsyncThunk("user/getUser", async () => {
	console.log("getUser slice")
	const profile = JSON.parse(localStorage.getItem("user"))
	return {profile}
})

const setUser = createAsyncThunk("user/setUser", async (user) => {
	localStorage.setItem("user", JSON.stringify(user))
	return {profile: user}
})

export const asyncActions = {
	setUser,
	getUser,
}

export default createSlice({
	name: "user",
	initialState,
	reducers: {
		// setUser: (state, {payload}) => {
		// 	localStorage.setItem("user", payload._id)
		// 	state.profile = payload
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(setUser.fulfilled, (state, {payload}) => {
			state.profile = payload.profile
			state.loading = false
		})
		builder.addCase(setUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getUser.fulfilled, (state, {payload}) => {
			state.profile = payload.profile
			state.loading = false
		})
		builder.addCase(getUser.pending, (state) => {
			state.loading = true
		})
	},
})

// export const {setUser} = userSlice.actions
