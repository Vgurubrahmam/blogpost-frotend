import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Error from './components/404';
import Home from './home';
import Blog from './components/blog';
import Create from "./components/createblog";
import Update from './components/update';
import { TokenProvider } from './components/tokencontext';
import Authors from './components/authors';
import UserProfile from './components/userblogs';

function App() {
    return (
        <TokenProvider>
        <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* <Route path="/" element={<Login />} />  */}
                    <Route path='/update' element={<Update/>}/>
                    <Route path="*" element={<Error />} /> 
                    <Route path='/' element={<Home />}/>
                    <Route path='/blog' element={<Blog />}/>
                    <Route path='/authors' element={<Authors/>}/>
                    <Route path='/createblog' element={<Create />}/>
                    <Route path='/userblogs' element={<UserProfile />}/>

                </Routes>
        </Router>
        </TokenProvider>
    );
}

export default App;
