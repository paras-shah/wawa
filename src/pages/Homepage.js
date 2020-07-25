import React from 'react';
import { Container, Grid } from '@material-ui/core/';

function Homepage(props) {
	return (
		<>
			<Container fixed>
				<Grid container>
					<Grid item xs={12} md={12}>
						<h1>Homepage</h1>
					</Grid>
				</Grid>
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="center"
				>
					<Grid item xs={12} md={4} className="flexContainer">
						Orders Completed
					</Grid>
					<Grid item xs={12} md={4} className="flexContainer">
						Orders In Progress
					</Grid>
					<Grid item xs={12} md={4} className="flexContainer">
						Make an order
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Homepage;
