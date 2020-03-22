import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';
import { isAuthenticated, userProfile, updateProfile, updateUser } from '../../api/auth';

const Profile = ({ match }) => {
	const [profile, setProfile] = useState({
		name: '',
		email: '',
		password: '',
		error: false,
		success: false,
	});

	const { token } = isAuthenticated();

	const { name, email, password, error, success } = profile;

	const init = userId => {
		userProfile(userId, token).then(data => {
			if (data.error) {
				setProfile({ ...profile, error: data.error });
			} else {
				setProfile({ ...profile, name: data.name, email: data.email });
			}
		});
	};

	useEffect(() => {
		init(match.params.userId);
	}, [init, match.params.userId]);

	const profileUpdate = (name, email, password) => (
		<form>
			<div className="container">
				<h4>Update Profile</h4>
				<div className="input-field">
					<input id="name" type="text" onChange={handleChange('name')} value={name} />
				</div>
				<div className="input-field">
					<input id="email" type="email" onChange={handleChange('email')} value={email} />
				</div>
				<div className="input-field">
					<input id="password" type="password" onChange={handleChange('password')} />
					<label htmlFor="password">Password</label>
				</div>
				<div className="input-field center">
					<button onClick={handleSubmit} className="btn indigo accent-4">
						Submit
					</button>
				</div>
			</div>
		</form>
	);

	const handleChange = name => e => {
		setProfile({ ...profile, error: false, [name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		updateProfile(match.params.userId, token, { name, email, password }).then(data => {
			if (data.error) {
				setProfile({ ...profile, error: data.error });
			} else {
				updateUser(data, () => {
					setProfile({
						name: data.name,
						email: data.email,
						password: data.password,
						success: true,
					});
				});
			}
		});
	};

	const redirectUser = success => {
		if (success) {
			return <Redirect to="/cart" />;
		}
	};

	return (
		<div>
			<Layout title="User Profile" description="Manage Your Profile" />
			<div className="row">
				<div className="col l6 offset-l3">
					{profileUpdate(name, email, password)}
					{redirectUser(success)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
