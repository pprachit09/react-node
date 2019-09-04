export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })
        //to avoid duplicate items in cart
        //if product is already present then increase the quantity

        cart = Array.from(new Set(cart.map(product => (product._id)))).map(id => {
            return cart.find(product => product._id === id)
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
} 

export const totalItem = () => {
    console.log(1)
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            console.log(JSON.parse(localStorage.getItem('cart')).length)
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}