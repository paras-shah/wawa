import React from 'react';
import { Container, Grid } from '@material-ui/core/';

function OrderColumn(props) {
	return (
		<>
			<Grid item xs={12} md={4} className={props.classes.container}>
				<div>
					<h3>{props.heading}</h3>
					<ul>
						{!props.orders && <li> No orders</li>}
						{props.orders &&
							props.orders.split(',').map((order) => {
								return <li> {order}</li>;
							})}
					</ul>
				</div>
			</Grid>
		</>
	);
}

export default OrderColumn;
