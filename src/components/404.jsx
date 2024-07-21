import { Link } from "react-router-dom";

function Error(){
    return(
            <div className="errordata d-flex flex-column justify-content-center text-center">
                <h1>Page Not Found</h1>


                <p>goto SignIn page <Link to='/login' className="errordatalink">Click here?</Link></p>
            </div> 
    )
}
export default Error;