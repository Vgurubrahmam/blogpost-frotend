import React, { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
const Comment = ({ selectedPost }) => {
    
  const [userProfile, setUserProfile] = useState(null);
  const [createcred, setCreatecred] = useState({
    
    postId: selectedPost?._id || "",
    name: "",
    email: "",
    comment: "",
  });
  const [comments,setComments]=useState([])
  const colourSamples = ["bg-orange-600", "bg-green-600", "bg-yellow-600"];
  const [randomColor, setRandomColor] = useState("bg-gray-600");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Random color selection
  useEffect(() => {
    const selectedColor =
      colourSamples[Math.floor(Math.random() * colourSamples.length)];
    setRandomColor(selectedColor);
  }, []);

  // Fetch user profile
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `https://blog-backend-1-g2af.onrender.com/userprofile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserProfile(data.user);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // Post comments
  const postComments = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://blog-backend-1-g2af.onrender.com/addComments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createcred),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response Error Data:", errorData);
        throw new Error(`Failed to post comment. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setCreatecred((prev) => ({ ...prev, comment: "" }));
    } catch (error) {
      console.error("postComments error catch:", error);
    }
  };
// get comments
useEffect(()=>{
    fetchComments()
    postComments()
},[selectedPost?._id])
const fetchComments=async()=>{
try{
    const response = await fetch(`https://blog-backend-1-g2af.onrender.com/getComments?postId=${selectedPost?._id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch comments. Status: ${response.status}`);
      }
  
      const data = await response.json()
      setComments(data.comments)
      console.log(data, "Fetched comments successfully")
  
}catch(err){
    console.error("Error fetching comments:", err.message); 

}
}
  const handleInputChange = (e) => {
    const { value } = e.target;
    setCreatecred((prev) => ({
      ...prev,
      comment: value,
      postId: selectedPost?._id || "",
      name: userProfile?.name || "",
      email: userProfile?.email || "",
    }));
  };
// time method 
function timeAgo(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
  
    const diffInMilliseconds = currentDate - givenDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximation (30 days per month)
    const diffInYears = Math.floor(diffInDays / 365); // Approximation
  
    if (diffInYears > 0) {
      return `${diffInYears} y${diffInYears > 1 ? "'s" : ""} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} mon${diffInMonths > 1 ? "'s" : ""} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} w${diffInWeeks > 1 ? "'s" : ""} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} d${diffInDays > 1 ? "'s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} h${diffInHours > 1 ? "'s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? "'s" : ""} ago`;
    } else {
      return "just now";
    }
  }
  return (
    <>
      <div className="flex justify-start items-center w-[100%] mt-5">
        <div className="flex items-center justify-center gap-2 w-[100%]">
          <p
            className={`font-bold ${randomColor} text-white px-3 py-2 rounded-full mt-3 text-xl`}
          >
            {userProfile?.name?.[0]?.toUpperCase() || "?"}
          </p>
          <input
            type="text"
            placeholder="Add a comment... "
            className="mt-4 w-[100%] border-b-2 outline-none"
            value={createcred.comment}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-2 border-b-2 mt-1 max-sm:hidden">
          <button
            className="rounded-full bg-gray-200 hover:bg-gray-200 p-2 m-1 text-sm"
            onClick={postComments}
          >
            Comment
          </button>
          <button
            className="rounded-full hover:bg-gray-200 p-2 m-1 text-sm"
            onClick={() =>
              setCreatecred((prev) => ({
                ...prev,
                comment: "",
              }))
            }
          >
            Cancel
          </button>
        </div>
        <div className="flex gap-2 md:hidden">
          <MdSend className="mt-4 mb-1 cursor-pointer" onClick={postComments} />
        </div>
      </div>
     <div className="">
     <ul>

       {Array.isArray(comments) &&  comments.length>0?(
        comments.map((eachComment,index)=>(
            <li key={index}>
            <div className="flex justify-between items-center  w-[100%]">
            <div className="flex flex-col">

            <div className="flex justify-start items-center text-center gap-2 max-sm:m-0">

            <p
            className={`font-bold ${randomColor} text-white px-2 py-1 rounded-full mt-3 w-fit text-sm max-sm:text-xs`}
          >
            {userProfile?.name?.[0]?.toUpperCase() || "?"}
          </p>
            <p className="mt-3 font-semibold max-sm:text-xs">@{eachComment.name}</p>
            <p className="text-xs mt-3">{timeAgo(eachComment.updatedAt)}</p>
            </div>
            <div className="ml-10">

                <p className=" mt-1 text-gray-600">{eachComment.comment}</p>
            </div>
            </div>
<HiEllipsisVertical />
            </div>

            </li>
        ))
       ):(
        <p>No comments Available</p>
       )}
     </ul>
     </div> 
    </>
  );
};

export default Comment;
