// Importing necessary modules and components
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import BookmarkPosts from './pages/BookmarkPosts';
import OthersProfile from './pages/OthersProfile';
import Following from './pages/Following';

// Main App component
function App() {

  // DynamicRouting component for handling routes
  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user data from Redux state
    const user = useSelector(state => state.userReducer);

    // Check if user is logged in on component mount
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) { // When user has an active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
      }
    }, []);

    // Routing configuration
    return (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/following" element={<Following />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/user/:id" element={<OthersProfile />}></Route>
        <Route exact path="/bookmark" element={<BookmarkPosts />}></Route>
      </Routes>
    )
  }

  // Rendering the main app component
  return (
    <div className='app'>
      <Router>
        <DynamicRouting />
      </Router>
    </div>
  );
}

// Exporting the App component
export default App;
