import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
	profile: {
		id: "",
		name: "",
	},
	initial: true,
}

const getUser = createAsyncThunk("user/getUser", async () => {
	const profile = {id: localStorage.getItem("user")}
	return {profile}
})

const setUser = createAsyncThunk("user/setUser", async (profile) => {
	localStorage.setItem("user", profile.id)
	return {profile}
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
		// 	localStorage.setItem("user", payload.id)
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
