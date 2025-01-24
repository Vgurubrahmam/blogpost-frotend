import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/home.css';
import Header from './header';
function Home() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://blog-backend-1-g2af.onrender.com/protectedroutes", {
            headers: {
                // Authorization: Bearer ${token},
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("success");
                }
                return response.json();
            })
            .then((data) => {
                setBlogs(data.blogs || []);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <div>
                 
<Header/>
            <div className='bg-container bg-secondary text-white'>
                <div className='d-flex flex-row justify-content-between'>
                    <div className='col-md-6  d-flex flex-column justify-content-center text-center'>
                        <h1 className='text-white headhome'>The Impact of Effective Blog Post Intros</h1>
                        <p className='homedesciption'>Captivating introductions are crucial for blog posts,
                            setting the tone and grabbing readers' attention immediately. A strong opening not only engages but also
                            encourages continued reading, enhancing user experience and boosting SEO performance.</p>
                        <div>
                            <Link className='text-white text-decoration-none' to="/login"><button className="btn btn-dark mt-3 fw-bold  ml-auto mr-auto d-block d-md-none">Get Started </button></Link>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center img-con rounded shadow-lg d-none d-md-block'>
                        <Link className='text-white text-decoration-none' to="/login"> <button className="btn btn-dark mt-3 fw-bold  mr-2 sticky fs-6">Get Started</button></Link>
                    </div>
                </div>

                <div className='text-start mt-5 ml-2 mr-5 mb-5'>
                    <input
                        className='text-left searchpost text-secondary'
                        type='search'
                        placeholder='Search Post Category...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="main-card-con">
                    <div className="row">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog, index) => (
                                <div className="col-lg-4 col-md-6 mb-4 text-center" key={index}>
                                    <div className="card h-100">
                                        <img
                                            src={blog.imageurl}
                                            className="card-img-top"
                                            alt={blog.title}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-start fw-bold">{blog.title}</h5>
                                            <p className="card-text limited-height">{blog.description}</p>
                                            <div className='mt-3'>
                                                <Link to="#" className="btn btn-secondary">
                                                    {blog.category}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <h5 className="text-white">Post not found</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
    );
}

export default Home;