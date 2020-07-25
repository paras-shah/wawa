import React from 'react';
import { Button, Grid } from '@material-ui/core/';

function OrderColumn(props) {
	console.log(props.isBusy);
	return (
		<>
			<Grid item xs={12} md={4} className={props.classes.container}>
				<div>
					<h3>{props.heading}</h3>
					<hr />
					<h3>
						{props.orders && (
							<Button
								disabled={props.isBusy}
								variant="contained"
								color="primary"
								onClick={(e) => {
									props.onSelect(props.orders.split(',')[0]);
								}}
							>
								Are you taking this?
							</Button>
						)}
					</h3>

					<ul>
						{!props.orders && <li> No orders</li>}
						{props.orders &&
							props.orders.split(',').map((order, index) => {
								return <li key={index}> {order}</li>;
							})}
					</ul>
				</div>
			</Grid>
		</>
	);
}

export default OrderColumn;
