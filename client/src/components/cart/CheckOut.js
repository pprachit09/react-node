import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import { getBrainetreeClientToken, processPayment } from '../payment/paymentHelper';
import { emptyCart } from './cartHelper';
import { createOrder } from '../order/orderHelper';
import DropIn from 'braintree-web-drop-in-react';
import M from 'materialize-css';

const CheckOut = ({ products }) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: '',
		instance: {},
		address: '',
	});

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	useEffect(() => {
		M.AutoInit();
		getBrainetreeClientToken(userId, token).then(res => {
			if (res.error) {
				setData({ ...data, error: res.error });
			} else {
				setData({ ...data, clientToken: res.clientToken });
			}
		});
	}, []);

	const getTotal = () => {
		return products.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const showCheckOut = () => {
		return isAuthenticated() ? (
			<div className="container">{showDropIn()}</div>
		) : (
			<Link to="/signin">
				<button className="btn-small  red lighten-3">Sign in to Checkout</button>
			</Link>
		);
	};

	const buy = () => {
		setData({ ...data, loading: true });
		//nonce = data.instance.requestPaymentMethod()
		//send nonce to server
		let nonce;
		let getNonce = data.instance
			.requestPaymentMethod()
			.then(response => {
				nonce = response.nonce;
				//nonce(card type or card number), send nonce as PaymentMethodNonce
				//also send total charge
				//console.log(nonce, getTotal(products));
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getTotal(products),
				};

				processPayment(userId, token, paymentData)
					.then(res => {
						//console.log(res)

						const createOrderData = {
							products: products,
							transaction_id: res.transaction.id,
							amount: res.transaction.amount,
							address: data.address,
						};

						//create order
						createOrder(userId, token, createOrderData).then(res => {
							//empty cart
							emptyCart(() => {
								console.log('empty cart');
								setData({ ...data, loading: false, success: true });
							});
						});
					})
					.catch(err => {
						setData({ ...data, loading: false });
						console.log(err);
					});
			})
			.catch(error => {
				//console.log(error);
				setData({ ...data, error: error.message });
			});
	};

	const showLoading = loading => (
		<h4 className="center-align black-text text-darken-1" style={{ display: loading ? ' ' : 'none' }}>
			Loading...
		</h4>
	);

	const showError = error => (
		<h6 className="center-align red-text text-darken-1" style={{ display: error ? ' ' : 'none' }}>
			{error}
		</h6>
	);

	const showSuccess = success => (
		<h6 className="center-align green-text text-darken-1" style={{ display: success ? ' ' : 'none' }}>
			Thanks! Your Payment was Successful....
		</h6>
	);

	const handleAddress = e => {
		setData({ ...data, address: e.target.value });
	};

	const showDropIn = () => (
		<div onBlur={() => setData({ ...data, error: '' })}>
			{data.clientToken && products.length > 0 ? (
				<div>
					{' '}
					<div className="input-field">
						<textarea
							className="materialize-textarea"
							onChange={handleAddress}
							value={data.address}
							id="textarea"
						></textarea>
						<label htmlFor="textarea">Type Your Address Here....</label>
					</div>
					<DropIn
						options={{
							authorization: data.clientToken,
							paypal: { flow: 'vault' },
						}}
						onInstance={instance => (data.instance = instance)}
					/>
					<button onClick={buy} className="btn-small green accent-3">
						Checkout
					</button>
				</div>
			) : null}
		</div>
	);

	return (
		<div>
			<h5>Total: ${getTotal()}</h5>
			{showError(data.error)}
			{showSuccess(data.success)}
			{showLoading(data.loading)}
			{showCheckOut()}
		</div>
	);
};

export default CheckOut;
