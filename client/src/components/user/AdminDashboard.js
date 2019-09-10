import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../../api/auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card red lighten-5">
        <div className="card-content">
          <span className="card-title">
            <b>User Links</b>
          </span>
          <ul>
            <li>
              <Link to="/create/category">Create Category</Link>
            </li>
            <li>
              <Link to="/create/product">Create Product</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link to="/admin/products">Manage Products</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const adminInfo = () => {
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

  return (
    <div>
      <Layout title="Admin Dashboard" description={`Good Day ${name}`} />
      <div className="row">
        <div className="col l3">{adminLinks()}</div>
        <div className="col l6">{adminInfo()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
