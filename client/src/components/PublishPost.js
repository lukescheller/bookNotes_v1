import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageRefresher, publishPost } from "../features/userSlice";
import Spinner from "../img/spinner.gif";
import cookieFunction from "../utils/cookieFunction";

const PublishPost = () => {
  //redux - loading
  const loading = useSelector((state) => state.userCredentials.loading);

  //redux - is_LoggedIn
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);

  //redux - error
  const error = useSelector((state) => state.userCredentials.error);

  //redux - user ID
  const user_id = useSelector((state) => state.userCredentials.user_data._id);

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

  //book title state
  const [bookTitleState, setBookTitleState] = useState("");

  //page state
  const [pageState, setPageState] = useState("");

  //comment state
  const [commentState, setCommentState] = useState("");

  //book title change handler
  const bookTitleChangeHandler = (e) => {
    setBookTitleState(e.target.value);
  };

  //page change handler
  const pageChangeHandler = (e) => {
    setPageState(e.target.value);
  };

  //comment change handler
  const commentChangeHandler = (e) => {
    setCommentState(e.target.value);
  };

  //submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    let publishObj = {};
    publishObj.bookTitle = bookTitleState;
    publishObj.page = pageState;
    publishObj.comment = commentState;
    publishObj.id = user_id;
    dispatch(publishPost(publishObj));
    setBookTitleState("");
    setPageState("");
    setCommentState("");
  };

  //component
  return (
    <div>
      {loading == "loading" ? (
        <img src={Spinner} />
      ) : (
        <div>
          <form onSubmit={submitHandler}>
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
            <div>{error}</div>
            <div>
              <button type="submit" class="btn btn-success">
                Publish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PublishPost;
