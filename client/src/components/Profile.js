import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageRefresher, deletePost } from "../features/userSlice";
import cookieFunction from "../utils/cookieFunction";

import Spinner from "../img/spinner.gif";

const Profile = () => {
  //redux - loading
  const loading = useSelector((state) => state.userCredentials.loading);

  //redux - username
  const username = useSelector(
    (state) => state.userCredentials.user_data.username
  );

  //redux - profilePic
  const profilePic = useSelector(
    (state) => state.userCredentials.user_data.profile_img
  );

  //redux - is_LoggedIn
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);

  //redux - comments
  const comments = useSelector(
    (state) => state.userCredentials.user_data.comments
  );

  //redux - user id
  const user_id = useSelector((state) => state.userCredentials.user_data._id);

  //img converted
  const img = `data:image/png;base64,${profilePic}`;

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
  }, [is_LoggedIn]);

  //component
  return (
    <div>
      {loading == "loading" ? (
        <img src={Spinner} />
      ) : (
        <div>
          <h1>{username}</h1>
          <img src={img} />
          <div>
            <h1>Comments</h1>
          </div>
          <div>
            {comments === undefined ? (
              <img src={Spinner} />
            ) : (
              comments.map((c, index) => {
                return (
                  <div style={{ border: "1px solid black", margin: "5px" }}>
                    <h3>Book Title: {c.book_title}</h3>
                    <p>Comment: {c.comment}</p>
                    <p>Page: {c.page}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(
                          deletePost({
                            commentId: c._id,
                            userId: user_id,
                          })
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
