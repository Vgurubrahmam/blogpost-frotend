import './update.css'
function Update(){

    return(
        <div>
            <div className="update-con ">
                <h1 className='m-4 fw-bold'>Update Post</h1>
              <img src="https://t4.ftcdn.net/jpg/03/55/03/63/240_F_355036340_LkRLTkrFu4vRHFPH50IVkQA37TQIgIos.jpg" className="img-fluid rounded updateimg"/>
              <div className='text-start form-con'>

              <form className=" p-2">
          
          <label htmlFor="title" className="label-css mt-3 pl-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            className="form-control border-2 border-bottom-3  border-secondary"
            id="title"
            name="title"
            
            required
          />

          <label htmlFor="description" className="label-css mt-3 pl-2 border-2 border-secondary text-start">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            className="form-control border-2 border-secondary"
            id="description"
            name="description"
           
            required
          />

          <select
            className="mt-4 w-100 p-2 br-5 border-2 border-secondary"
            name="category"
           
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
            
            required
          />
          <div className="mt-5 d-flex flex-row justify-content-center">
            <button className="btn btn-dark w-100 p-2 fw-bold">PUBLISG</button>
          </div>
        </form>
        </div>
      </div>
        </div>
    )
}
export default  Update;