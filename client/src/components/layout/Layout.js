import React from 'react'

const Layout = ({
    title =  'Title',
    description= 'Description',
    children
}) => {
    return (
        <div >
            <div className='container grey lighten-2'>
                <h2>{title}</h2> 
                <p>{description}</p>
            </div>
            <div className='container'>
                <p>{children}</p>
            </div>

        </div>
    )
}

export default Layout