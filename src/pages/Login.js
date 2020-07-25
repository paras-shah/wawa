import React from 'react';
import { Grid, Container } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {
	signInAction,
	signOutAction,
	getUsers,
	getPendingOrders,
} from '../actions';
import { connect } from 'react-redux';
import OrderColumn from './OrderColumn';

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

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedUser: '',
			errorMessage: '',
		};
	}

	handleChange = (event) => {
		const value = event.target.value;
		this.setState((state) => {
			return { ...state, selectedUser: value };
		});
	};

	componentDidMount() {
		this.props.getUsers();
	}

	getOrdersByType = (type) => {
		if (!this.props.pendingorders) {
			return null;
		}
		const order =
			this.props.pendingorders &&
			this.props.pendingorders.filter(({ gtype }) => {
				return this.props.gtype.includes(type) && gtype === type && type
					? true
					: false;
			});

		return order.length ? order[0].orders : null;
	};

	render() {
		const { classes } = this.props;

		return (
			<>
				<Container fixed>
					<Grid container>
						<Grid item xs={12} md={6}>
							{this.state.errorMessage !== '' && (
								<p> {this.state.errorMessage}</p>
							)}
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
											{this.props.users &&
												this.props.users.length &&
												this.props.users.map((user) => {
													return (
														<option
															key={user.id}
															value={
																user.username
															}
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
											if (
												this.state.selectedUser !== ''
											) {
												this.setState(
													(state, props) => {
														return {
															...state,
															errorMessage: '',
														};
													}
												);
												this.props.signInAction(
													this.state.selectedUser
												);
											} else {
												this.setState(
													(state, props) => {
														return {
															...state,
															errorMessage:
																'Please select a username',
														};
													}
												);
											}
										}}
									>
										Login
									</Button>
								)}

								{this.props.isAuthenticated && (
									<>
										<Button
											variant="contained"
											color="primary"
											onClick={(e) => {
												this.props.getPendingOrders();
											}}
										>
											Refresh Orders
										</Button>{' '}
										&nbsp;&nbsp;
										<Button
											variant="contained"
											color="secondary"
											onClick={(e) => {
												this.props.signOutAction();
											}}
										>
											Logout
										</Button>
									</>
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
						<OrderColumn
							heading={'Veg Orders'}
							isAuthenticated={this.state.isAuthenticated}
							orders={this.getOrdersByType('Veg')}
							classes={classes}
							onSelect={() => {
								console.log('Veg');
							}}
						/>
						<OrderColumn
							heading={'Non Veg Orders'}
							isAuthenticated={this.state.isAuthenticated}
							orders={this.getOrdersByType('NonVeg')}
							classes={classes}
							onSelect={() => {
								console.log('NonVeg');
							}}
						/>
						<OrderColumn
							heading={'Drinks'}
							isAuthenticated={this.state.isAuthenticated}
							orders={this.getOrdersByType('Drinks')}
							classes={classes}
							onSelect={() => {
								console.log('Drink');
							}}
						/>
					</Grid>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	const { auth } = state;
	return {
		users: auth.users,
		username: auth.username,
		gtype: auth.gtype,
		isAuthenticated: auth.isAuthenticated,
		pendingorders: auth.pendingorders,
	};
};

export default useStyles(
	connect(mapStateToProps, {
		signInAction,
		signOutAction,
		getUsers,
		getPendingOrders,
	})(Login)
);
