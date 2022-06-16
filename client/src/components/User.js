import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageRefresher, getUser, vote } from "../features/userSlice";
import { useParams } from "react-router-dom";
import cookieFunction from "../utils/cookieFunction";
import Spinner from "../img/spinner.gif";

const User = (props) => {
  //props.match.params.id - old -> useParams is the new practice
  //params id
  const { id } = useParams();

  const your_Id = useSelector((state) => state.userCredentials.user_data._id);

  //redux - is_LoggedIn
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);

  //redux - loading
  const loading = useSelector((state) => state.userCredentials.loading);

  //redux - ind _id
  const ind_Id = useSelector((state) => state.userCredentials.ind_user._id);

  //redux - ind username
  const ind_userName = useSelector(
    (state) => state.userCredentials.ind_user.username
  );

  //redux - ind profile_img
  const ind_profileImg = useSelector(
    (state) => state.userCredentials.ind_user.profile_img
  );

  //redux - comments
  const ind_comments = useSelector(
    (state) => state.userCredentials.ind_user.comments
  );

  //redux - comments - likes
  // const ind_comments_likes = useSelector(
  //   (state) => state.userCredentials.ind_user.comments.likes.length
  // );

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
    dispatch(getUser({ id }));
  }, [is_LoggedIn]);

  return (
    <div>
      {loading === "loading" ? (
        <img src={Spinner} />
      ) : (
        <div>
          <h1>{ind_userName}</h1>
          <img src={`data:image/png;base64,${ind_profileImg}`} />
          {ind_comments == undefined ? (
            <img src={Spinner} />
          ) : (
            ind_comments.map((c) => {
              return (
                <div
                  style={{
                    border: "1px solid black",
                    margin: "5px",
                    padding: "5px",
                  }}
                >
                  <h3>{c.book_title}</h3>
                  <p>{c.comment}</p>
                  <p>{c.page}</p>
                  <div>
                    <button
                      style={{ margin: "5px" }}
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        dispatch(
                          vote({
                            vote: "like",
                            voter_id: your_Id,
                            ind_id: ind_Id,
                            comment_id: c._id,
                          })
                        );
                      }}
                    >
                      Like {c.likes.length}
                    </button>
                    <button
                      style={{ margin: "5px" }}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(
                          vote({
                            vote: "dislike",
                            voter_id: your_Id,
                            ind_id: ind_Id,
                            comment_id: c._id,
                          })
                        );
                      }}
                    >
                      Dislike {c.dislikes.length}
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

export default User;
