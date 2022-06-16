import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageRefresher, deletePost, editPost } from "../features/userSlice";
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

  //redux - error
  const error = useSelector((state) => state.userCredentials.error);

  //img converted
  const img = `data:image/png;base64,${profilePic}`;

  //navigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //useState - book title
  const [bookTitle, setBookTitle] = useState("");
  //bookTitleChangeHandler
  const bookTitleChangeHandler = (e) => {
    setBookTitle(e.target.value);
  };

  //useState - page
  const [page, setPage] = useState("");
  //pageChangeHandler
  const pageChangeHandler = (e) => {
    setPage(e.target.value);
  };

  //useState - comment
  const [comment, setComment] = useState("");
  //commentChangeHandler
  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  //form submit
  const formSubmit = (id) => {
    let editObj = {};
    editObj.user_id = user_id;
    editObj.id = id;
    editObj.book_title = bookTitle;
    editObj.page = page;
    editObj.comment = comment;
    dispatch(editPost(editObj));
    setBookTitle("");
    setPage("");
    setComment("");
  };

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
            <form style={{ border: "1px solid black", margin: "5px" }}>
              <div>
                <label>Book Title</label>
              </div>
              <div>
                <input type="text" onChange={bookTitleChangeHandler}></input>
              </div>
              <div>
                <label>Page</label>
              </div>
              <div>
                <input type="text" onChange={pageChangeHandler}></input>
              </div>
              <div>
                <label>Comment</label>
              </div>
              <div>
                <input type="text" onChange={commentChangeHandler}></input>
              </div>
            </form>
          </div>
          <div>{error}</div>
          <div
            style={{
              overflowY: "scroll",
              height: "400px",
              border: "1px solid black",
              margin: "5px",
            }}
          >
            {comments === undefined ? (
              <img src={Spinner} />
            ) : (
              comments.map((c, index) => {
                return (
                  <div style={{ border: "1px solid black", margin: "5px" }}>
                    <h3>Book Title: {c.book_title}</h3>
                    <p>Comment: {c.comment}</p>
                    <p>Page: {c.page}</p>
                    <p>
                      Likes: {c.likes.length} / Dislikes: {c.dislikes.length}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      d
                      style={{ margin: "5px" }}
                      onClick={() => formSubmit(c._id)}
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
