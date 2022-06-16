import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageRefresher } from "../features/userSlice";
import Spinner from "../img/spinner.gif";
import cookieFunction from "../utils/cookieFunction";

const Home = () => {
  //redux - loading
  const loading = useSelector((state) => state.userCredentials.loading);

  //redux toolkit
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);

  //useNavigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    dispatch(pageRefresher(cookieFunction()));
    if (!is_LoggedIn) {
      navigate("/signin");
    }
  }, [is_LoggedIn]);

  //component
  return (
    <div>
      {loading == "loading" ? (
        <img src={Spinner} />
      ) : (
        <div>
          <h1>Home</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
