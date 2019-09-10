import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Layout from '../layout/Layout';
import { isAuthenticated } from '../../api/auth';
import { getPurchaseHistory } from '../../api/apiCore';

const UserDashboard = () => {
	const [hisotry, setHistory] = useState([]);

	const {
		user: { _id, name, email, role },
	} = isAuthenticated();

	const { token } = isAuthenticated();

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
	}, []);

	const userLinks = () => {
		return (
			<div className="card red lighten-5">
				<div className="card-content">
					<span className="card-title">
						<b>User Links</b>
					</span>
					<ul>
						<li>
							<Link to={`/profile/${_id}`}>User Profile</Link>
						</li>
						<li>
							<Link to="/user/cart">Cart</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	};

	const userInfo = () => {
		return (
			<div className="card purple lighten-5">
				<div className="container">
					<span className="card-title">
						<b>User Information</b>
					</span>
					<ul>
						<li>{name}</li>
						<li>{email}</li>
						<li>{role === 1 ? 'Admin' : 'Authenticated User'}</li>
					</ul>
				</div>
			</div>
		);
	};

	const purchaseHisotry = () => {
		return (
			<div className="purple lighten-5">
				<div className="container">
					<h5>Purchase History</h5>
					{hisotry.map((h, i) => {
						return (
							<div key={i}>
								{h.products.map(product => (
									<div key={product._id}>
										<ul className="collection">
											<li className="collection-item">Product Name: {product.name}</li>
											<li className="collection-item">Product Price: ${product.price}</li>
											<li className="collection-item">
												Purchased: {moment(product.createdAt).fromNow()}
											</li>
										</ul>
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<div>
			<Layout title="Dashboard" description={`Good Day ${name}`} />
			<div className="row">
				<div className="col l3">{userLinks()}</div>
				<div className="col l6">
					{userInfo()}
					{purchaseHisotry()}
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
