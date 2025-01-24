import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header';

function Login() {
  const navigate = useNavigate();
  // const { token, setToken } = useContext(TokenContext); 
  const [showPassword ,setShowPassword] = useState(false)

  const [usecred, setUsecred] = useState({
    email: "",
    password: ""
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setUsecred((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://blogpost-backend-wheat.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usecred)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        // setToken(data.token); 
        localStorage.setItem("token", data.token);
        
        toast.success(data.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUsecred({
          email: "",
          password: ""
        });
        navigate("/blog");
      } else {
        toast.error(data.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    .catch(error => {
      toast.error(error.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error:', error);
    });
  }
function togglePasswordVisibility(){
  setShowPassword((prevState)=>!prevState)
}
  return (
    <div className='bg-con'>
      <Header/>
      <hr className='w-100' />
      <div className="login-con  d-flex flex-column justify-content-center">
        <h1 className="font-Lato text-white">Sign In</h1>
        <section>
          <form onSubmit={handleSubmit} className=''>
            <label className="labelstyle text-white" htmlFor="email">Enter Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id='email'
              placeholder='Enter Email'
              value={usecred.email}
              onChange={handleInput}
              autoComplete="email"
              required
            />
            <label className="labelstyle text-white" htmlFor="password">Enter Password</label>
            <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    value={usecred.password}
                    onChange={handleInput}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-none bg-white text-dark"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>
            <button type="submit" className="buttonlogin btn btn-danger fw-bold mt-5 p-2 w-100">Login</button>
            
          </form>
        </section>
        <div className="orcon">
          <p className="fw-bold">OR</p>
        </div>
        <Link to="/signup" style={{ color: "white" }}><button className="shadow buttonlogin btn btn-secondary text-decoration-none fw-bold w-100">
          Create an account</button></Link>
        
        <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
      </div>
    </div>
  );
}

export default Login;
