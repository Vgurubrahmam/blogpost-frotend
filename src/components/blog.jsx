import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "./blog.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { toast } from "react-toastify";
import Comments from "./commnets";
function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setselectedPost] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  


  const [updatepost, setUpdatepost] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    imageurl: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    fetch("https://blogpost-backend-wheat.vercel.app/protectedroutes", {
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBlogs(data.blogs);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleLogout = () => {
    let data = window.confirm("Are You Ready to Logout");
    if (data == true) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      toast.error("Logout Cancelled");
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);

    return `${formattedDate}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);
    return `${formattedTime}`;
  };

  // details view
  const handleDetailviewbtn = (index) => {
    setselectedPost(blogs[index]);

  };
  const handlebackbtn = () => {
    setselectedPost(null);
  };
  // updatepost
  const handlesubmitchange = (event) => {
    const { name, value } = event.target;
    setBlogs({
      ...blogs,
      [name]: value,
    });
  };
  const handleUpdatechange = (event) => {
    const { name, value } = event.target;
    setUpdatepost({
      ...updatepost,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };
  const filteredBlogs = blogs.filter((blog) =>
    blog.category.toLowerCase().includes(searchItem.toLowerCase())
  );
  return (
    <div>
      {!selectedPost && (
        <div>
          <nav className="bg-white shadow-md fixed-top w-full z-50">
            <div className="container mx-auto px-4  py-3 max-sm:py-1  flex justify-between items-center">
              <Link className="p-0">
                <img
                  src="https://i.ibb.co/d40VBNy/Screenshot-2025-01-22-144604.png"
                  className="h-10 max-sm:w-16"
                  alt="logo"
                />
              </Link>

              <button
                className="lg:hidden text-gray-500  "
                aria-label="Toggle navigation"
                onClick={() =>
                  document
                    .getElementById("navbarNavAltMarkup")
                    .classList.toggle("hidden")
                }
              >
                <span className="navbar-toggler-icon">☰</span>
              </button>

              <div className="lg:flex justify-end items-center w-[90%] gap-8 hidden">
                <div className="flex items-center gap-6">
                  <Link
                    className="nav-link text-black-50 font-bold hover:text-gray-700"
                    to="/createblog"
                  >
                    Create Blog
                  </Link>

                  <Link
                    className="nav-link text-black-50 font-bold hover:text-gray-700"
                    to="/userblogs"
                  >
                    User Blogs
                  </Link>

                  <button
                    className=" bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div
              className="lg:hidden bg-white-700 text-black hidden"
              id="navbarNavAltMarkup"
            >
              <Link
                className="block px-4 py-2 hover:bg-gray-600"
                to="/createblog"
              >
                Create Blog
              </Link>
              <Link
                className="block px-4 py-2 hover:bg-gray-600"
                to="/userblogs"
              >
                User Blogs
              </Link>

              <button
                className="block px-4 py-2 text-white bg-gray-700 rounded-md ms-3 mb-2 "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>

          <div className="blog-container mt-5">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?size=626&ext=jpg&ga=GA1.1.1134535102.1718039641&semt=ais_user"
                    className="images-navagate d-block w-100"
                    alt="First Slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/55/03/63/240_F_355036340_LkRLTkrFu4vRHFPH50IVkQA37TQIgIos.jpg"
                    className="images-navagate d-block w-100"
                    alt="Second Slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://t4.ftcdn.net/jpg/08/14/75/47/240_F_814754720_isEIjfQP6zRhw1G7ABXcolUsF6rvbzbl.jpg"
                    className="images-navagate d-block w-100"
                    alt="Third Slide"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="">
            {/* <div className="sticky-sidebar d-none d-md-flex">
              <Link
                to="/createblog"
                className="text-white text-decoration-none"
              >
                <button className="btn btn-secondary mb-3  pl-5 pr-5 fw-bold">
                  CREATE BLOG
                </button>
              </Link>

              <div
                className="list-group"
                // style={{ maxWidth: "200px" }}
              >
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  All Categories
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Movies & Music
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Food
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  Education
                </button>
              </div>
            </div> */}
            <div className=" flex max-sm:justify-center mt-3 m-3">
              <input
                className="text-left searchpost text-secondary max-sm:w-[80%]"
                type="search"
                placeholder="Search Post Category.."
                value={searchItem}
                onChange={handleSearchChange}
              />
            </div>

            {/* blog cards */}

            <div className="">
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog, key) => (
                    <div className="flex flex-wrap" key={key}>
                      <div className="card h-auto">
                        <img
                          src={blog.imageurl}
                          className="card-img-top"
                          alt={blog.title}
                        />
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex flex-row justify-content-between">
                            <div>
                              <img
                                src="https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75336.jpg"
                                className="profileimg mb-2"
                              ></img>
                            </div>

                            <div className="">
                              <p
                                className="username"
                                onChange={handlesubmitchange}
                              >
                                {blog.userId.name}
                              </p>
                              <p className="card-text fw-bold">
                                {formatDate(blog.createdAt)}
                              </p>
                              {/* <p className="card-text fw-bold">
              {formatTime(blog.createdAt)}
            </p> */}
                            </div>
                          </div>
                          <h5
                            className="card-title fw-bold"
                            onChange={handlesubmitchange}
                          >
                            {blog.title}
                          </h5>
                          {/* <p className="card-text">{blog.userId.name}</p> */}
                          <p
                            className="card-text m-2 fs-5"
                            onChange={handlesubmitchange}
                          >
                            {blog.category}
                          </p>

                          <p
                            className="card-text limited-height fs-6"
                            onChange={handlesubmitchange}
                          >
                            {blog.description}
                          </p>
                          <div className=" mt-4 d-flex flex-spacebetween justify-content-end">
                            <div className="">
                              <Link
                                to="#"
                                className="btn btn-secondary fw-bold"
                                onClick={() => handleDetailviewbtn(key)}
                              >
                                Detail View
                              </Link>
                            </div>
                            {/* <div className="d-flex flex-row justify-content-end">
            <button
              className="btn btn-Dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
              onClick={() => {
                
                setUpdatepost(blog)
              }}
            >
              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              
            </button>
            <button
              className="btn btn-Dark"
              onClick={() => handleDelete(blog)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
          </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <h5>Post Not Found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* detail post */}

      {selectedPost && (
        <div className="datail-post-container m-5">
          <Link
            onClick={handlebackbtn}
            className="fw-bold fs-5  text-secondary text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            Back
          </Link>
          <div className="update-con">
            <h1 className="m-4 fw-bold">Detail view Post</h1>

            <img
              src={selectedPost.imageurl}
              className="img-fluid rounded updateimg"
            />
            <div className="text-start form-con">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <img
                    src="https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75336.jpg"
                    className="profileimgdetail mb-4 mt-2"
                  ></img>
                </div>

                <div className="user-detail">
                  <p className="username fs-4">{selectedPost.userId.name}</p>
                  <p className="card-text fw-bold">
                    {formatDate(selectedPost.createdAt)}
                  </p>
                </div>
              </div>

              <label htmlFor="title" className="label-css text-secondary">
                Title
              </label>

              <h5 className="fw-bold">{selectedPost.title}</h5>
              <label className="label-css text-secondary">Category</label>
              <p className=" fs-5 fw-500">{selectedPost.category}</p>
              <label
                htmlFor="description"
                className="label-css  bg- text-secondary"
              >
                Description
              </label>
              <p className="  detail-des fs-6">{selectedPost.description}</p>
             
              <Comments selectedPost={selectedPost}/>
              <div className="mt-5 d-flex flex-row justify-content-end">
                {/* <button
                  className="btn btn-Dark mb-5 p-2 fw-bold fs-5"
                  onClick={handlebackbtn}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l208 0 0-64L32 96zM192 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0zm-64-64c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-48 0c-17.7 0-32 14.3-32 32zm96 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0zm88-96l-.6 0c5.4 9.4 8.6 20.3 8.6 32c0 13.2-4 25.4-10.8 35.6c24.9 8.7 42.8 32.5 42.8 60.4c0 11.7-3.1 22.6-8.6 32l8.6 0c88.4 0 160-71.6 160-160l0-61.7c0-42.4-16.9-83.1-46.9-113.1l-11.6-11.6C429.5 77.5 396.9 64 363 64l-27 0c-35.3 0-64 28.7-64 64l0 88c0 22.1 17.9 40 40 40s40-17.9 40-40l0-56c0-8.8 7.2-16 16-16s16 7.2 16 16l0 56c0 39.8-32.2 72-72 72z" />
                  </svg>
                  Back
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
