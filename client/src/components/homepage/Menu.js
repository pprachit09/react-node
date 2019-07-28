import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../api/auth";

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
          <li>
            {isAuthenticated() && (
            <Fragment>
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  signout(() => {
                    window.history.go("/");
                  })
                }
              >
                LogOut
              </span>
              </Fragment>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
