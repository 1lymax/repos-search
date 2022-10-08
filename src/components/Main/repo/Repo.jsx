import React from 'react';
import {Button, Card, CardActions, CardContent, Chip, Skeleton, Typography} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BugReportIcon from '@mui/icons-material/BugReport';

const Repo = (props) => {
	const repo = props.repo

	if (props.error) {
		return <Card sx={{maxWidth: "100vm"}}>
			<CardContent>
				{props.error}
			</CardContent>
		</Card>
	}

	return (

		<Card sx={{maxWidth: "100vm"}}>
			{!props.loading && repo.name
				?
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{repo.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{repo.description}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						<Chip icon={<StarBorderIcon />} label={`${repo.stargazers_count} stars`} variant="outlined" sx={{margin: '15px 10px 10px 0px'}} />
						<Chip icon={<FaceIcon />} label={`${repo.watchers} watchers`} variant="outlined" sx={{margin: '15px 10px 10px 0px'}}/>
						<Chip icon={<BugReportIcon />} label={`${repo.open_issues} issues`} variant="outlined" sx={{margin: '15px 10px 10px 0px'}}/>
					</Typography>
				</CardContent>
				:
				<>
					<Skeleton variant="rounded" width={200} height={20} sx={{margin: '20px'}}/>
					<Skeleton variant="rounded" width={410} height={60} sx={{margin: '20px'}}/>
					<Skeleton variant="rounded" width={210} height={20} sx={{margin: '20px'}}/>
				</>
			}
			<CardActions>
				<Button size="small" disabled={props.loading}>Share</Button>
				<Button size="small" disabled={props.loading} href={repo.html_url}>View on Github</Button>
			</CardActions>
		</Card>
	);
};

export default Repo;