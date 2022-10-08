import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getRepos =  createAsyncThunk('repos/fetchRepos', async (arg) => {
	const query = arg.search ? arg.search : 'stars:%3E1'
	const page = arg.page ? '&page='+arg.page : ''
	const response = await axios.get(`https://api.github.com/search/repositories?q=${query}&sort=stars${page}`)
	return response.data
})