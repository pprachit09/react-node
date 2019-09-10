import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import Layout from '../layout/Layout';
import { isAuthenticated } from '../../api/auth';
import { getAllProducts, deleteProduct } from '../../api/admin';

const ManageProduct = () => {
	const [products, setProducts] = useState([]);

	const { user, token } = isAuthenticated();

	const loadProducts = () => {
		getAllProducts().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	const destroy = productId => {
		deleteProduct(productId, user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				loadProducts();
			}
		});
	};

	useEffect(() => {
		M.AutoInit();
		loadProducts();
	}, []);

	return (
		<div>
			<Layout title="Manage Products" description="update and remove products" />
			<div className="container">
				<table className="highlight centered responsive-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product._id}>
								<td>{product.name}</td>
								<td>
									<Link
										to={`/admin/product/update/${product._id}`}
										className="btn-small lime accent-2 black-text text-darken-2"
									>
										Update
									</Link>
								</td>
								<td>
									<button className="btn-small red lighten-1" onClick={() => destroy(product._id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageProduct;
