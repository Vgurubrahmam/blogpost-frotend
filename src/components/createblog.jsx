import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./createblog.css"; 
function Create() {
  const navigate = useNavigate();

  
  const [createcred, setCreatecred] = useState({
    title: "",
    description: "",
    imageurl: "",
    category: "" 
  });

 
  const handleInput = (event) => {
    const { name, value } = event.target;
    setCreatecred((prevState) => ({ ...prevState, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await fetch("https://blogpost-backend-wheat.vercel.app/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createcred),
        
      });
  
      if (!response.ok) {
        throw new Error("Failed to create blog");
      }
  
      
      setCreatecred({
        title: "",
        description: "",
        imageurl: "",
        category: "",
      });
  
      
      navigate("/blog");
    } catch (error) {
      console.error("handleSubmit error:", error);
      
    }
  };
  

  return (
    <div className="create-container">
      <section className="gradient">
        <h1 className="heading font-Lato">Create Post</h1>
       <Link to="/blog" className="fw-bold fs-5  text-secondary text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>Back</Link>
        <form className="p-2" onSubmit={handleSubmit}>
          <label htmlFor="title" className="label-css mt-3 pl-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            className="form-control border-2 border-bottom-3 border-secondary"
            id="title"
            name="title"
            value={createcred.title}
            onChange={handleInput}
            required
          />

          <label htmlFor="description" className="label-css mt-3 pl-2 border-2 border-secondary">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            className="form-control border-2 border-secondary"
            id="description"
            name="description"
            value={createcred.description}
            onChange={handleInput}
            required
          />

          <label htmlFor="category" className="label-css mt-3 pl-2">
            Category
          </label>
          <select
            className="mt-4 w-100 p-2 br-5 border-2 border-secondary"
            id="category"
            name="category"
            value={createcred.category}
            onChange={handleInput}
            required
          >
            <option value="">Select Category</option>
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
            value={createcred.imageurl}
            onChange={handleInput}
            required
          />
          
          <div className="mt-5 d-flex flex-row justify-content-center">
            <button className="btn btn-dark w-100 p-2 fw-bold" type="submit">post</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Create;
