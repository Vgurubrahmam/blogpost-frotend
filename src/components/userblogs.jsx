import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "./userblogs.css"
function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setselectedPost] = useState(null);
  const [updatepost, setUpdatepost] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    imageurl: "",
  });
  const [error, setError] = useState(null);
  
  // Retrieve token from local storage or another secure place
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`https://blogpost-backend-wheat.vercel.app/userprofile`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setUserProfile(data.user);
      setUserPosts(data.posts);
    } catch (err) {
      setError("Error fetching user profile.");
      console.error('Fetch Error:', err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  
  const handlesubmitchange = (event) => {
    const { name, value } = event.target;
    setBlogs({
      ...blogs,
      [name]: value,
    });
  };

  const handleDelete = (post) => {
    let data = window.confirm("Are You Ready to Delete");
  
    if (data) {
      fetch(`https://blogpost-backend-wheat.vercel.app/deletepost/${post._id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchUserProfile();
                })
        .catch((error) => {
          console.error("Error deleting post", error);
        });
    } else {
      console.log("Delete cancelled");
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
  
    return `${formattedDate}`;
  };
  const handleDetailviewbtn = (index) => {
    setselectedPost(userPosts[index]);
  };
  const handleUpdatechange = (event) => {
    const { name, value } = event.target;
    setUpdatepost({
      ...updatepost,
      [name]: value,
    });
   };
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(updatepost)
    fetch("https://blogpost-backend-wheat.vercel.app/updateposts/" + updatepost._id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatepost),
    })
      .then((response) => response.json())
      .then((post) => {
        console.log(post);
        fetchUserProfile()
        
        
      });

      
      
  };
  const handlebackbtn=()=>{
    setselectedPost(null)
  }
  return (
    <div>
      {!selectedPost && (
        <div>
        {/* <h1>User Profile for {userProfile.email}</h1> */}
        <img src="https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75336.jpg" className="profileimg ml-5 mt-3 " />
      <p className="fw-semibold text-secondary ml-5 mb-3 mt-2">{userProfile.name}</p>
      <h2 className="fs-3"> My Blogs</h2>
      
      <div className="blogs-con">
        {userPosts.map((post,index) => (
   
          <li key={index}>
         
          <div className="card h-auto">
          <img
            src={post.imageurl}
            className="card-img-top"
            alt={post.title}
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
                  {userProfile.name}
                </p>
                <p className="card-text fw-bold">
                  {formatDate(post.createdAt)}
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
              {post.title}
            </h5> 
            <p className="card-text">{post.userId.name}</p>
            <p
              className="card-text m-2 fs-5"
              onChange={handlesubmitchange}
            >
              {post.category}
            </p>
    
            <p
              className="card-text limited-height fs-6"
              onChange={handlesubmitchange}
            >
              {post.description}
            </p>
            <div className=" mt-4 d-flex flex-spacebetween justify-content-between">
              <div className="">
                <Link
                  to="#"
                  className="btn btn-secondary fw-bold"
                  onClick={() => handleDetailviewbtn(index)}
                >
                  Detail View
                </Link>
              </div>
              <div className="d-flex flex-row justify-content-end">
                <button
                  className="btn btn-Dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                  onClick={() => {
                    
                    setUpdatepost(post)
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
                  onClick={() => handleDelete(post)}
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
              </div>
            </div>
          </div>
        </div>
        </li>
        ))}
      </div>
      </div>
      )}
      {/* detail post */}

      {selectedPost && (
        <div className="datail-post-container m-5">
          <Link onClick={handlebackbtn} className="fw-bold fs-5  text-secondary text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>Back</Link>
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

              <label
                htmlFor="title"
                className="label-css text-secondary"
              >
                Title
              </label>

              <h5 className="fw-bold">{selectedPost.title}</h5>
              <label className="label-css text-secondary">
                Category
              </label>
              <p className=" fs-5 fw-500">{selectedPost.category}</p>
              <label
                htmlFor="description"
                className="label-css  text-secondary"
              >
                Description
              </label>
              <p className="  detail-des fs-6">{selectedPost.description}</p>

              <div className="mt-5 d-flex flex-row justify-content-end">
                <button
                  className="btn btn-Dark mb-5 p-2 fw-bold fs-5"
                  onClick={handlebackbtn}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l208 0 0-64L32 96zM192 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0zm-64-64c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-48 0c-17.7 0-32 14.3-32 32zm96 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0zm88-96l-.6 0c5.4 9.4 8.6 20.3 8.6 32c0 13.2-4 25.4-10.8 35.6c24.9 8.7 42.8 32.5 42.8 60.4c0 11.7-3.1 22.6-8.6 32l8.6 0c88.4 0 160-71.6 160-160l0-61.7c0-42.4-16.9-83.1-46.9-113.1l-11.6-11.6C429.5 77.5 396.9 64 363 64l-27 0c-35.3 0-64 28.7-64 64l0 88c0 22.1 17.9 40 40 40s40-17.9 40-40l0-56c0-8.8 7.2-16 16-16s16 7.2 16 16l0 56c0 39.8-32.2 72-72 72z" />
                  </svg>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* // update modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
      
      <h5 className="modal-title" id="staticBackdropLabel ">
         {/* {updatepost.userId.name}<br></br> */}
          <span className="update-date fw-bold">UpdatedAt : {formatDate(updatepost.updatedAt)}</span><br></br>
          

        </h5> 
                 
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="updatePostDiv">
          <div className="update-con">
            <h1 className="m-4 fw-bold fixed-top text-end pr-5">Update Post</h1>
            <img
              src={updatepost.imageurl}
              className="img-fluid rounded updateimg"
            />
            <div className="text-start form-con">
              <form className=" p-2" onSubmit={handleUpdate}>
                <label htmlFor="title" className="label-css mt-3 pl-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="form-control border-2 border-bottom-3  border-secondary"
                  id="title"
                  name="title"
                  value={updatepost.title}
                  onChange={handleUpdatechange}
                  required
                />

                <label
                  htmlFor="description"
                  className="label-css mt-3 pl-2 border-2 border-secondary text-start"
                >
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  className="form-control border-2 border-secondary"
                  id="description"
                  name="description"
                  value={updatepost.description}
                  onChange={handleUpdatechange}
                  required
                />

                <select
                  className="mt-4 w-100 p-2 br-5 border-2 border-secondary"
                  name="category"
                  onChange={handleUpdatechange}
                  value={updatepost.category}
                  required
                >
                  <option value="" defaultValue>
                    Select Category
                  </option>
                  <option>Education</option>
                  <option>Travel</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Lifestyle</option>
                  <option>Food & Drink</option>
                  <option>Business & Finance</option>
                  <option>Arts & Entertainment</option>
                  <option>Sports</option>
                  <option>Parenting & Family</option>
                  <option>Science & Nature</option>
                  <option>Automotive</option>
                  <option>Hobbies & Interests</option>
                  <option>Social Issues & Politics</option>
                  <option>Self-Improvement</option>
                </select>
                <label htmlFor="imageurl" className="label-css mt-3 pl-2">
                  Image Url
                </label>
                <textarea
                  placeholder="Enter image url"
                  className="form-control border-2 border-secondary"
                  id="imageurl"
                  name="imageurl"
                  value={updatepost.imageurl}
                  onChange={handlesubmitchange}
                  required
                />
                <div className="mt-5 d-flex flex-row justify-content-center">
                  <button
                    className="btn btn-dark w-100 p-2 fw-bold"
                    type="submit" 
                  >
                    PUBLISH
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
      
    </div>
  );
}

export default UserProfile;
