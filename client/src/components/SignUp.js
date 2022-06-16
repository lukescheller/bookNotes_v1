import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../features/userSlice";
import { reduxReset } from "../features/userSlice";

import Spinner from "../img/spinner.gif";

const SignUp = () => {
  //state
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpImg, setSignUpImg] = useState("");

  //redux toolkit
  const is_LoggedIn = useSelector((state) => state.userCredentials.is_LoggedIn);
  const loading = useSelector((state) => state.userCredentials.loading);
  const error = useSelector((state) => state.userCredentials.error);

  //navigate once logged in
  const navigate = useNavigate();

  //redux toolkit
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    if (is_LoggedIn) {
      navigate("/profile");
    } else {
      dispatch(reduxReset());
    }
    //[is_LoggedIn] - this is what rerenders the page and redirects to the profile page
  }, [is_LoggedIn]);

  //username
  const signUpUserNameChangeHandler = (event) => {
    setSignUpUserName(event.target.value);
  };

  //email
  const signUpEmailChangeHandler = (event) => {
    setSignUpEmail(event.target.value);
  };

  //password
  const signUpPasswordChangeHandler = (event) => {
    setSignUpPassword(event.target.value);
  };

  //profile image
  const signUpProfileImgHandler = (event) => {
    setSignUpImg(event.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("signUpUserName", signUpUserName);
    formData.append("signUpEmail", signUpEmail);
    formData.append("signUpPassword", signUpPassword);
    formData.append("file", signUpImg);
    dispatch(registerUser(formData));
  };
  return (
    <div>
      <div>
        <form onSubmit={submitHandler} style={styles.formWrapper}>
          <div className="formComponents" style={styles.formComponents}>
            <div className="userNameBox" style={styles.userNameBox}>
              <div className="userNameLabel" style={styles.userNameLabel}>
                <label>Usename:</label>
              </div>
              <div className="userNameInput" style={styles.userNameInput}>
                <input
                  type="text"
                  onChange={signUpUserNameChangeHandler}
                ></input>
              </div>
            </div>
            <div className="emailBox" style={styles.emailBox}>
              <div className="emailLabel" style={styles.emailLabel}>
                <label>Email:</label>
              </div>
              <div className="emailInput" style={styles.emailInput}>
                <input type="text" onChange={signUpEmailChangeHandler}></input>
              </div>
            </div>
            <div className="passwordBox" style={styles.passwordBox}>
              <div className="passwordLabel" style={styles.passwordLabel}>
                <label>Password:</label>
              </div>
              <div className="passwordInput" style={styles.passwordInput}>
                <input
                  type="text"
                  onChange={signUpPasswordChangeHandler}
                ></input>
              </div>
            </div>
            <div className="imgBox" style={styles.imgBox}>
              <div className="imgLabel" style={styles.imgLabel}>
                <label>Profile Image:</label>
              </div>
              <div className="imgInput" style={styles.imgInput}>
                <input
                  type="file"
                  name="profileImg"
                  onChange={signUpProfileImgHandler}
                ></input>
              </div>
            </div>
            <div style={styles.errorBox}>
              {loading == "error" &&
              error ===
                'E11000 duplicate key error collection: myFirstDatabase.users index: email_1 dup key: { email: "lukescheller1991@outlook.com" }' ? (
                <div>Duplicate Email Detected</div>
              ) : (
                ""
              )}
              {loading === "error" &&
              error == "Request failed with status code 500" ? (
                <div>Invalid Image - Must be jpg or png and less than 1kb</div>
              ) : (
                ""
              )}
              {loading === "error" &&
              error !== "Request failed with status code 500" &&
              error !==
                'E11000 duplicate key error collection: myFirstDatabase.users index: email_1 dup key: { email: "lukescheller1991@outlook.com" }' ? (
                <div>{error}</div>
              ) : (
                ""
              )}
            </div>
            {loading === "loading" ? (
              <img src={Spinner} />
            ) : (
              <div style={styles.submitBtBox}>
                <button type="submit" className="btn btn-success">
                  Sign-Up
                </button>
              </div>
            )}
          </div>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            Sign-In
          </Link>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formWrapper: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  //form pieces wrapper
  formComponents: {
    border: "1px solid green",
    margin: "5px",
    padding: "5px",
  },

  //username
  userNameBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  userNameLabel: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  userNameInput: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  //email
  emailBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  emailLabel: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  emailInput: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  //password
  passwordBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  passwordLabel: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  passwordInput: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  //profile image
  imgBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  imgLabel: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  imgInput: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },

  //error box
  errorBox: {
    border: "1px solid transparent",
    margin: "5px",
    padding: "5px",
  },

  //submit button
  submitBtBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },
};

//outer wrapper

export default SignUp;
