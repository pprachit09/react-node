import {API} from '../config'
import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&orderBy=desc&limit=6`, {
        method: 'GET'
    })
    .then( res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getProductsBySearch = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/JSON',
            'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const productList = params => {
    const query = queryString.stringify(params)

    return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))

}

export const readProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const listRelatedProduct = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}