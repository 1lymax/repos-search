import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import {Container, Divider, IconButton, InputBase, Paper, Stack, TablePagination} from "@mui/material";

import Repo from "./repo/Repo";
import {getRepos} from "../actions/repos";
import {setCurrentPage, setPerPage} from "../../reducers/reposReducer";

const Main = () => {
	const dispatch = useDispatch()
	const [search, setSearch] = useState('')
	const error = useSelector(state => state.repos.error)
	const repos = useSelector(state => state.repos.items)
	const status = useSelector(state => state.repos.status)
	const perPage = useSelector(state => state.repos.perPage)
	const page = useSelector(state => state.repos.currentPage)
	const totalCount = useSelector(state => state.repos.totalCount)

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getRepos({}));
		}
	}, []);

	const handleChangePage = (event, newPage) => {
		dispatch(setCurrentPage(newPage));
		makeSearch()
	};

	const handleChangeRowsPerPage = (event) => {
		dispatch(setPerPage(parseInt(event.target.value, 10)));
		dispatch(setCurrentPage(1));
		makeSearch()
	};

	function makeSearch() {
		if (['idle', 'succeeded'].includes(status)) {
			dispatch(getRepos({search, page, perPage}))
		}
	}

	return (
		<Container fixed>
			<Paper
				sx={{ p: '2px 4px', margin: '30px 0px 30px 0px', display: 'flex', alignItems: 'center'}}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search repositories"
					value={search}
					onChange={e => setSearch(e.target.value)}
					onSubmit={() => makeSearch()}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
				<IconButton color="primary" sx={{ p: '10px' }} onClick={() => makeSearch()}>
					<SearchIcon />
				</IconButton>
			</Paper>
			<Stack spacing={2}>

				{repos.map(repo =>
					<Repo repo={repo} key={repo.id} loading={status === 'loading'} error={error}/>
				)}
			</Stack>
			<TablePagination
				component="div"
				count={totalCount}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={perPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Container>
	);
};

export default Main;