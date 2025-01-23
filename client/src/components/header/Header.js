import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-config/ProfileSlice";
import "./Header.css";
import { ToastContainer } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid text-center bg-light">
        <div className="row align-items-center">
          <div className="col-md-4 p-2 d-flex flex-column justify-content-start">
            <img src="/images/logo2.png" alt="VedaRoot Logo" className="logo" />
            <h1 className="brand">VedaRoot</h1>
          </div>
          <div className="col-md-4 p-2 d-flex justify-content-center">
            <form action="#">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-bar"
                  style={{ width: "300px" }}
                  placeholder="Search items...."
                />
                <button
                  type="submit"
                  className="btn btn-success search-button"
                  style={{ width: "70px" }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 p-2 d-flex justify-content-end">
            <nav className="navbar navbar-expand-sm">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/view-cart"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>
                </li>
                {!isLoggedIn && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      onClick={toggleDropdown}
                    >
                      <i className="fas fa-sign-in-alt"></i> Sign In
                    </a>
                    <div
                      className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                    >
                      <Link className="dropdown-item" to="/signIn">
                        <i className="fas fa-user"></i> User
                      </Link>
                      <Link className="dropdown-item" to="/signInD">
                        <i className="fas fa-user-md"></i> Doctor
                      </Link>
                    </div>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      onClick={toggleDropdown}
                    >
                      <i className="fas fa-user"></i> Profile
                    </a>
                    <div
                      className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                    >
                      <Link
                        className="dropdown-item"
                        to={
                          role === "user" ? "/view-profileu" : "/doctordahboard"
                        }
                      >
                        <i className="fas fa-user-circle"></i> My Profile
                      </Link>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          dispatch(signOut());
                          navigate("/");
                        }}
                      >
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm bg-success">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/disease">
              Disease
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/homeremedym">
              Home Remedy
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/productm">
              Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/yogam">
              Yoga
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/about">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/doctor">
              Doctor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
