import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core/';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import 'react-notifications/lib/notifications.css';
import './App.css';

function App() {
	return (
		<Router>
			<Container fixed>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={10}
				>
					<Grid item container xs={12}>
						<header item container spacing={10}>
							<h1>Wawa Store</h1>

							<ul className="flexContainer">
								<li>
									<Link to="/">Store </Link>
								</li>
								<li>
									<Link to="/staff">Staff</Link>
								</li>
							</ul>
						</header>
					</Grid>
					<Grid item container xs={12}>
						<div className="flexContainer">
							<Switch>
								<Route path="/staff" exact component={Login} />
								<Route path="/" component={Homepage} />
							</Switch>
						</div>
					</Grid>

					<Grid item container xs={12}>
						<header item container spacing={10}>
							<ul className="flexContainer">
								<li>
									<Link to="/">Footer</Link>
								</li>
							</ul>
						</header>
					</Grid>
				</Grid>
			</Container>
		</Router>
	);
}

export default App;
