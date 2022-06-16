import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageRefresher, allUsers } from "../features/userSlice";
import cookieFunction from "../utils/cookieFunction";
import Spinner from "../img/spinner.gif";

const Users = () => {
  //redux - loading
  const loading = useSelector((state) => state.userCredentials.loading);

  //redux - is_LoggedIn
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);

  //redux - error
  const error = useSelector((state) => state.userCredentials.error);

  //redux - your id
  const your_id = useSelector((state) => state.userCredentials.user_data._id);

  //redux - all users
  let users = useSelector((state) => state.userCredentials.all_users);

  //navigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    dispatch(pageRefresher(cookieFunction()));
    if (!is_LoggedIn) {
      navigate("/signin");
    }
    dispatch(allUsers());
  }, [is_LoggedIn]);
  return (
    <div>
      {loading == "loading" ? (
        <img src={Spinner} />
      ) : (
        <div>
          {users == "" ? (
            <img src={Spinner} />
          ) : (
            users.map((user) => {
              return your_id == user._id ? (
                ""
              ) : (
                <div
                  style={{
                    margin: "5px",
                    border: "1px solid black",
                    padding: "5px",
                  }}
                >
                  <h3>{user.username}</h3>
                  <img
                    src={`data:image/png;base64,${user.profile_img}`}
                    style={{ width: "250px" }}
                  />
                  <div>
                    <button type="button" className="btn btn-success">
                      <Link
                        to={`/user/${user._id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        View Profile
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
