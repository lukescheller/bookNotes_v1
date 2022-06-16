import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageRefresher, getUser, vote } from "../features/userSlice";
import { useParams } from "react-router-dom";
import cookieFunction from "../utils/cookieFunction";
import Spinner from "../img/spinner.gif";

const NotFound = () => {
  //redux - is_LoggedIn
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);
  //navigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pageRefresher(cookieFunction()));
    if (!is_LoggedIn) {
      navigate("/signin");
    }
  }, [is_LoggedIn]);
  return <div>Not Found</div>;
};

export default NotFound;
