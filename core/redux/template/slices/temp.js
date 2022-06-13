import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {apiRequest} from "../../../utils/request"

const temp = createAsyncThunk("temp/getTemp", async () => {
	const response = await apiRequest("/template")
	return response.list
})

export const asyncActions = {
	temp,
}

export default createSlice({
	name: "temp",
	initialState: {
		loading: false,
		list: [],
	},
	reducers: {
		// increment: (state) => {
		// 	state.value += 1
		// },
		// decrement: (state) => {
		// 	state.value -= 1
		// },
		// incrementByAmount: (state, action) => {
		// 	state.value += action.payload
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(temp.fulfilled, (state, {payload}) => {
			state.list = payload
			state.loading = false
		})
		builder.addCase(temp.pending, (state) => {
			state.loading = true
		})
	},
})
