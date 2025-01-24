import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header=()=>{
        const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    return(

    <nav className="bg-white shadow-md fixed-top mb-5 w-full z-50">
    <div className="container mx-auto px-4 py-1 flex justify-between items-center">
      <Link className="p-0" to="#">
        <img
          src="https://i.ibb.co/d40VBNy/Screenshot-2025-01-22-144604.png"
          className="h-20 max-sm:w-16"
          alt="logo"
        />
      </Link>

      <button
        className="lg:hidden text-gray-500 hover:text-black focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">☰</span>
      </button>

      <div className="lg:flex gap-12 hidden">
        <div className="flex items-center gap-6">
          <Link
            className="text-black-50 font-bold hover:text-gray-700"
            to="#"
            onClick={() => {
              toast.error("Please Login Now");
            }}
          >
            Create
          </Link>

          <Link
            className="text-black-50 font-bold hover:text-gray-700"
            to="#"
            onClick={() => {
              toast.error("Please Login Now");
            }}
          >
            Blogs
          </Link>

          <button
            className="btn btn-secondary font-bold"
            onClick={() => navigate("/signup")}
          >
            <span className="text-white">Signup</span>
          </button>
        </div>
      </div>
    </div>

    {isMenuOpen && (
      <div className="lg:hidden bg-white">
        <Link
          className="block px-4 py-2 text-black hover:bg-gray-600"
          to="#"
          onClick={() => {
            toast.error("Please Login Now");
          }}
        >
          Create
        </Link>
        <Link
          className="block px-4 py-2 text-black hover:bg-gray-600"
          to="#"
          onClick={() => {
            toast.error("Please Login Now");
          }}
        >
          Blogs
        </Link>
        <button
            className="btn btn-secondary font-bold m-2"
            onClick={() => navigate("/signup")}
          >
            <span className="text-white">Signup</span>
          </button>
      </div>
    )}
  </nav>
    )
}
export default Header;