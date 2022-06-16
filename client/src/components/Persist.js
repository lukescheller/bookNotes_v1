import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pageRefresher } from "../features/userSlice";
import cookieFunction from "../utils/cookieFunction";

const Persist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pageRefresher(cookieFunction()));
  }, []);
  return <Outlet />;
};

export default Persist;
