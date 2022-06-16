import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomNavbar from "./components/CustomNavbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile2 from "./components/Profile2";
import Persist from "./components/Persist";
import Home from "./components/Home";
import PublishPost from "./components/PublishPost";
import Users from "./components/Users";
import User from "./components/User";
import NotFound from "./components/NotFound";

function App() {
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);
  return (
    <Router>
      <div className="App">
        {is_LoggedIn ? <CustomNavbar /> : ""}
        <Routes>
          //public routes
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          //protected routes //whatever's in Persist will run before the routes
          //within Persist //this will work with and without Persist
          <Route element={<Persist />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/profile" element={<Profile2 />} />
            <Route exact path="/publish" element={<PublishPost />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/user/:id" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
