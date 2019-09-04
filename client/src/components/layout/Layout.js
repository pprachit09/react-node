import React from 'react'

const Layout = ({
    title =  'Title',
    description= 'Description',
    children
}) => {
    return (
        <div className="row">
            <div className='col s12 grey lighten-1'>    
                <div className='container'>
                    <h2>{title}</h2> 
                    <p>{description}</p>
                </div>
                <div className='container'>
                    <p>{children}</p>
                </div>
            </div>
        </div>
    )
}

export default Layout