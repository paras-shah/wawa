import React from 'react';
import { Grid, Container } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { signInAction, signOutAction } from '../actions';
import { connect } from 'react-redux';

const useStyles = withStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	container: {
		border: 'solid 1px grey',
		padding: '20px',
		display: 'flex',
		'flex-direction': 'column',
	},
	selectUser: {
		width: '90%',
	},
}));

const staff = [
	{
		id: 1,
		username: 'Stehpen',
	},
	{
		id: 2,
		username: 'Liz',
	},
];

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
			selectedUser: '',
			errorMessage: '',
		};
	}

	handleChange = (event) => {
		const value = event.target.value;
		if (value === '') {
			this.setState((state) => {
				return { ...state, errorMessage: 'Please select a user' };
			});
		} else {
			this.setState((state) => {
				return { ...state, selectedUser: value };
			});
		}
	};

	componentDidMount() {
		this.setState((state, props) => {
			return { ...state, users: staff };
		});
	}

	render() {
		const classes = this.props.classes;
		return (
			<>
				<Container fixed>
					<Grid container>
						<Grid item xs={12} md={6}>
							<h1>Staff </h1>
						</Grid>
						<Grid container item xs={12} md={6}>
							<Grid item xs={12} md={6}>
								{!this.props.isAuthenticated && (
									<FormControl
										variant="outlined"
										className={classes.selectUser}
									>
										<InputLabel htmlFor="outlined-age-native-simple">
											Select Username
										</InputLabel>
										<Select
											native
											value={this.state.selectedUser}
											onChange={this.handleChange}
											label="Username"
										>
											<option
												aria-label="None"
												value=""
											/>
											{this.state.users &&
												this.state.users.map((user) => {
													return (
														<option
															key={user.id}
															value={user}
														>
															{user.username}
														</option>
													);
												})}
										</Select>
									</FormControl>
								)}
							</Grid>
							<Grid item xs={12} md={6}>
								{!this.props.isAuthenticated && (
									<Button
										variant="contained"
										color="primary"
										onClick={(e) => {
											this.props.signInAction();
										}}
									>
										Login
									</Button>
								)}

								{this.props.isAuthenticated && (
									<Button
										variant="contained"
										color="secondary"
									>
										Logout
									</Button>
								)}
							</Grid>
						</Grid>
					</Grid>

					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="center"
					>
						<Grid item xs={12} className="flexContainer">
							<h3>Pending Orders</h3>
						</Grid>
						<Grid item xs={12} md={4} className={classes.container}>
							<div>
								<h3>Veg Orders</h3>
								<ul>
									{!this.state.isAuthenticated && (
										<li> No orders</li>
									)}
								</ul>
							</div>
						</Grid>
						<Grid item xs={12} md={4} className={classes.container}>
							<div>
								<h3>Non Veg Orders</h3>
								<ul>
									{!this.state.isAuthenticated && (
										<li> No orders</li>
									)}
								</ul>
							</div>
						</Grid>
						<Grid item xs={12} md={4} className={classes.container}>
							<div>
								<h3>Drinks</h3>
								<ul>
									{!this.state.isAuthenticated && (
										<li> No orders</li>
									)}
								</ul>
							</div>
						</Grid>
					</Grid>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	const { user } = state;
	return { username: user.username, isAuthenticated: user.isAuthenticated };
};

export default useStyles(
	connect(mapStateToProps, { signInAction, signOutAction })(Login)
);
