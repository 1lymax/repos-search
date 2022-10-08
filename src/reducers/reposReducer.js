import {configureStore, createSlice} from "@reduxjs/toolkit";
import {getRepos} from "../components/actions/repos";

const reposSlice = createSlice({
	name: 'repos',
	initialState: {
		items: [
			{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}
		],
		status: 'idle',
		error: 0,
		currentPage: 0,
		perPage: 25,
		totalCount: 0
	},
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setPerPage: (state, action) => {
			state.perPage = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getRepos.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getRepos.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload.items
				state.totalCount = action.payload.total_count
			})
			.addCase(getRepos.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			// .addCase(addNewPost.fulfilled, (state, action) => {
			// 	state.posts.push(action.payload)
			// })
	},
})

export const {fetchRepos, setCurrentPage, setPerPage} = reposSlice.actions

export const store = configureStore({
	reducer: {
		repos: reposSlice.reducer
	}
})