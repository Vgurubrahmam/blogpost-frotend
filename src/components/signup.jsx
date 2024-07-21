import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css"; // Assuming you have additional custom styles here

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleInput(event) {
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://blogpost-backend-wheat.vercel.app/signup", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Email or username already exists.");
        }
        if (!response.ok) {
          throw new Error("Error registering user.");
        }
        return response.json();
      })
      .then((data) => {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setUserDetails({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <div className="container d-flex flex-row justify-content-around">
      <div className="row justify-content-between align-items-center min-vh-100">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 mb-4">
          <div className="signup-con shadow-lg">
            <h1 className="text-center mb-4">Sign Up</h1>
            <section>
              <form onSubmit={handleSubmit}>
                <label className="labelstyle" htmlFor="name">
                  Enter Name
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="name"
                  name="name"
                  required
                  value={userDetails.name}
                  onChange={handleInput}
                  placeholder="Enter name"
                />

                <label className="labelstyle" htmlFor="email">
                  Enter Email
                </label>
                <input
                  type="email"
                  className="form-control mb-3"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  value={userDetails.email}
                  onChange={handleInput}
                />

                <label className="labelstyle" htmlFor="password">
                  Enter Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    value={userDetails.password}
                    onChange={handleInput}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-inline-secondary bg-white text-dark border border-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button className="btn btn-danger w-100 fw-bold">Signup</button>
                </div>
              </form>
            </section>

            <ToastContainer />

            <div className="orcon text-center mt-3">
              <p className="labelstyle">OR</p>
            </div>

            <Link to="/login" className="text-white">
              <button className="btn btn-secondary w-100 fw-bold">Already have an account? Login</button>
            </Link>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-10 col-12">
          <img
            src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?size=626&ext=jpg&ga=GA1.1.1134535102.1718039641&semt=ais_user"
            alt="Signup"
            className="img-fluid rounded shadow-lg d-none d-sm-block"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
