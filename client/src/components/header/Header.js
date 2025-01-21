import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-config/UserSlice";
import "./Header.css";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  // const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // const navigateToViewProfile = (id) => {
  //   navigate(`/view-profileu/${id}`);
  // };

  // const navigateToCart = () => {
  //   // console.log(isLoggedIn);
  //   // console.log(user._id);
  //   if (isLoggedIn) {
  //     navigate(`/view-cart/${user._id}`);
  //   } else {
  //     alert("Please sign in to view your cart");
  //   }
  // };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid text-center bg-light">
        <div className="row align-items-center">
          {/* <div className="col-md-4 p-2 d-flex justify-content-start">
            <img
              src="./images/logo2.png"
              alt="VedaRoot Logo"
              className="logo"
            />
            <h1 className="brand">VedaRoot</h1>
          </div> */}
          <div class="col-md-4 p-2 d-flex flex-column justify-content-start">
            <img src="/images/logo2.png" alt="VedaRoot Logo" class="logo" />
            <h1 class="brand">VedaRoot</h1>
          </div>
          <div className="col-md-4 p-2 d-flex justify-content-center">
            <form action="#" className="w-100">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control search-bar "
                  placeholder="Search items....."
                />
                <button
                  type="submit"
                  className="btn btn-success search-button "
                >
                  {/* <i className="fas fa-search"></i>  */}
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
                    // onClick={navigateToCart}
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
                  <>
                    <li className="nav-item">
                      <Link
                        to="/view-profileu"
                        className="nav-link"
                        // onClick={navigateToViewProfile}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-user"></i> View Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        style={{ cursor: "pointer" }}
                        className="nav-link"
                        onClick={() => dispatch(signOut())}
                      >
                        <i className="fas fa-sign-out-alt"></i> Sign out
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm bg-success">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/disease">
              Disease
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/homeremedym">
              Home Remedy
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/productm">
              Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/yogam">
              Yoga
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/doctor">
              Doctor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
