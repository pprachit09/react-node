import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../../api/auth";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card red lighten-5">
        <div className="card-content">
          <span className="card-title">
            <b>User Links</b>
          </span>
          <ul>
            <li>
              <Link to="/profile">User Profile</Link>
            </li>
            <li>
              <Link to="/user/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card purple lighten-5">
        <div className="container">
          <span className="card-title">
            <b>User Information</b>
          </span>
          <ul>
            <li>{name}</li>
            <li>{email}</li>
            <li>{role === 1 ? "Admin" : "Authenticated User"}</li>
          </ul>
        </div>
      </div>
    );
  };

  const purchaseHisotry = () => {
    return (
      <div className="card purple lighten-5">
        <div className="container">
          <span className="card-title">
            <b>Purchase History</b>
          </span>
          <p>History</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Layout title="Dashboard" description={`Good Day ${name}`} />
      <div className="row">
        <div className="col l3">{userLinks()}</div>
        <div className="col l6">
          {userInfo()}
          {purchaseHisotry()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
