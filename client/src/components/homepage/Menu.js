import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Menu = () => {
    return (
        <nav>
            <div className='nav-wrapper teal darken-4'>
            <Link to="/" className="brand-logo"><i className="material-icons"></i>Coderlust</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default withRouter(Menu)
