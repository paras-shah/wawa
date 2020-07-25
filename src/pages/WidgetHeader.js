import React from 'react';
import { Button, Grid } from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

function WidgetHeader(props) {
	const { classes, users, isAuthenticated } = props;
	const [selectedUser, setUser] = React.useState('');

	const handleChange = (event) => {
		const value = event.target.value;
		setUser(value);
	};

	return (
		<>
			<Grid container item xs={12} md={6}>
				<Grid item xs={12} md={6}>
					{!isAuthenticated && (
						<FormControl
							variant="outlined"
							className={classes.selectUser}
						>
							<InputLabel htmlFor="outlined-age-native-simple">
								Select Username
							</InputLabel>
							<Select
								native
								value={selectedUser}
								onChange={handleChange}
								label="Username"
							>
								<option aria-label="None" value="" />
								{users &&
									users.length &&
									users.map((user) => {
										return (
											<option
												key={user.id}
												value={user.username}
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
					{!isAuthenticated ? (
						<Button
							variant="contained"
							color="primary"
							onClick={(e) => {
								if (selectedUser !== '') {
									props.setError('');
									props.signInAction(selectedUser);
								} else {
									props.setError('Please select a username');
								}
							}}
						>
							Login
						</Button>
					) : (
						<>
							<Button
								variant="contained"
								color="primary"
								onClick={(e) => {
									props.getPendingOrders();
								}}
							>
								Refresh Orders
							</Button>{' '}
							&nbsp;&nbsp;
							<Button
								variant="contained"
								color="secondary"
								onClick={(e) => {
									props.signOutAction();
								}}
							>
								Logout
							</Button>
						</>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default WidgetHeader;
