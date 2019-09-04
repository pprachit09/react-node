import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../api/auth";
import { totalItem } from "../cart/cartHelper";

const Menu = () => {
  return (
    <nav>
      <div className="nav-wrapper teal darken-4">
        <Link to="/" className="brand-logo">
          <i className="material-icons" />
          Coderlust
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {!isAuthenticated() && (
            <Fragment>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Fragment>
              <li>
                <Link to="/user/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/cart">
                  Cart<span className="new badge red">{totalItem()}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    signout(() => {
                      window.history.go("/");
                    })
                  }
                >
                  LogOut
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Fragment>
              <li>
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/cart">
                  Cart<span className="new badge red">{totalItem()}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    signout(() => {
                      window.history.go("/");
                    })
                  }
                >
                  LogOut
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
