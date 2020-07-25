import React from 'react';
import { Grid, Container } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import {
	signInAction,
	signOutAction,
	getUsers,
	getPendingOrders,
	selectOrder,
} from '../actions';
import { connect } from 'react-redux';
import OrderColumn from './OrderColumn';
import WidgetHeader from './WidgetHeader';

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
			errorMessage: '',
			isBusy: false,
		};
		console.log('const');
	}

	updateStatus = (value) => {
		this.setState((state) => {
			return { ...state, isBusy: value };
		});
	};

	componentDidUpdate(prevProps, prevState) {
		console.log('U', prevState.isBusy);
		console.log('U', this.state.isBusy);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('SU', this.state.isBusy);
		console.log('sU', nextState.isBusy);
		return true;
	}

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

	setErrorMessage = (msg) => {
		this.setState((state, props) => {
			return {
				...state,
				errorMessage: msg,
			};
		});
	};

	render() {
		const { classes } = this.props;
		console.log('render', this.state.isBusy);
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
						<WidgetHeader
							isAuthenticated={this.props.isAuthenticated}
							classes={classes}
							users={this.props.users}
							setError={(msg) => {
								this.setErrorMessage(msg);
							}}
							getPendingOrders={() => {
								this.props.getPendingOrders();
							}}
							signOutAction={() => {
								this.setState((state) => {
									return { ...state, isBusy: false };
								});
								this.props.signOutAction();
							}}
							signInAction={(selectedUser) => {
								this.props.signInAction(selectedUser);
							}}
						/>
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
							isBusy={this.state.isBusy}
							orders={this.getOrdersByType('Veg')}
							classes={classes}
							onSelect={(orderId) => {
								this.updateStatus(orderId);
								this.props.selectOrder(
									this.props.username,
									'Veg',
									orderId
								);
							}}
						/>
						<OrderColumn
							heading={'Non Veg Orders'}
							isBusy={this.state.isBusy}
							orders={this.getOrdersByType('NonVeg')}
							classes={classes}
							onSelect={(orderId) => {
								this.updateStatus(orderId);
								this.props.selectOrder(
									this.props.username,
									'NonVeg'
								);
							}}
						/>
						<OrderColumn
							heading={'Drinks'}
							isBusy={this.state.isBusy}
							orders={this.getOrdersByType('Drinks')}
							classes={classes}
							onSelect={(orderId) => {
								this.updateStatus(orderId);
								this.props.selectOrder(
									this.props.username,
									'Drink'
								);
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
		getUsers,
		getPendingOrders,
		selectOrder,
		signInAction,
		signOutAction,
	})(Login)
);
