import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import moment from 'moment';
import Layout from '../layout/Layout';
import { listOrders, getStatusValues, updateOrderStatus } from '../../api/admin';
import { isAuthenticated } from '../../api/auth';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState([]);
	const { user, token } = isAuthenticated();

	const loadOrders = useCallback(() => {
		listOrders(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	});

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then(data => {
			setStatus(data);
		});
	};

	useEffect(() => {
		M.AutoInit();
		loadOrders();
		loadStatusValues();
	}, [loadOrders, loadStatusValues]);

	const showOrdersLength = orders => {
		return orders.length < 1 ? <h4>No Orders</h4> : <h4>Total Orders: {orders.length}</h4>;
	};

	const handleSelect = (e, id) => {
		updateOrderStatus(user._id, token, id, e.target.value).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				loadOrders();
			}
		});
	};

	const showStatus = order => (
		<div className="container">
			<h6>
				<b>Status: {order.status}</b>
			</h6>
			<select className="browser-default" onChange={e => handleSelect(e, order._id)}>
				<option>Update Status</option>
				{status.map(s => (
					<option key={s._id} value={s}>
						{s}
					</option>
				))}
			</select>
		</div>
	);

	return (
		<div>
			<Layout title="Orders" description="Manage all the orders" />
			<div className="row">
				<div className="col l8 offset-l2">
					<div className="container">
						{showOrdersLength(orders)}
						{orders.map(order => (
							<div key={order._id}>
								<ul className="collection with-header">
									<li className="collection-header">
										<h5>Order ID: {order._id}</h5>
									</li>
									<li className="collection-item">{showStatus(order)}</li>
									<li className="collection-item">Transaction ID: {order.transaction_id}</li>
									<li className="collection-item">Amount: {order.amount}</li>
									<li className="collection-item">Ordered By: {order.user.name}</li>
									<li className="collection-item">Ordered on: {moment(order.createdAt).fromNow()}</li>
									<li className="collection-item">Delievery Address: {order.address}</li>
								</ul>
								<h5>Total Products: {order.products.length}</h5>
								{order.products.map(product => (
									<ul className="collection with-header" key={product._id}>
										<li className="collection-header">
											<h6>{product.name}</h6>
										</li>
									</ul>
								))}
								<hr />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orders;
