import { API } from '../config';

export const signup = user => {
	//console.log(name, email, password)
	return fetch(`${API}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const signin = user => {
	return fetch(`${API}/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const authenticate = (data, next) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('jwt', JSON.stringify(data));
		next();
	}
};

export const signout = next => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('jwt');
		next();
		return fetch(`${API}/logout`, {
			method: 'GET',
		})
			.then(response => {
				console.log('signout', response);
			})
			.catch(err => console.log(err));
	}
};

export const isAuthenticated = () => {
	if (typeof window == 'undefined') {
		return false;
	}
	if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	} else {
		return false;
	}
};

export const userProfile = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const updateProfile = (userId, token, user) => {
	return fetch(`${API}/user/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(user),
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export const updateUser = (user, next) => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('jwt')) {
			let auth = JSON.parse(localStorage.getItem('jwt'));
			auth.user = user;
			localStorage.setItem('jwt', JSON.stringify(auth));
			next();
		}
	}
};
