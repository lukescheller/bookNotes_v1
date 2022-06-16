import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../features/userSlice";
import { reduxReset } from "../features/userSlice";

import Spinner from "../img/spinner.gif";

const SignIn = () => {
  //redux selector
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

  //state
  const [signInEmailInput, setEmailInput] = useState("");
  const [signInPasswordInput, setPasswordInput] = useState("");

  //email
  const signInEmailChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  //password
  const signInPasswordChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  //submit
  const submitHandler = (event) => {
    event.preventDefault();
    let userObj = {};
    userObj.signInEmail = signInEmailInput;
    userObj.signInPassword = signInPasswordInput;
    // let formData = new FormData();
    // formData.append("email", signInEmailInput);
    // formData.append("password", signInPasswordInput);
    console.log(userObj);
    dispatch(signInUser(userObj));
  };

  return (
    <div style={styles.formBox}>
      <div style={styles.formWrapper}>
        <form onSubmit={submitHandler}>
          <div className="emailBox" style={styles.emailBox}>
            <div className="emailLabel" style={styles.emailLabel}>
              <label>Email:</label>
            </div>
            <div className="emailInput" style={styles.emailInput}>
              <input type="text" onChange={signInEmailChangeHandler}></input>
            </div>
          </div>
          <div className="passwordBox" style={styles.passwordBox}>
            <div className="passwordLabel" style={styles.passwordLabel}>
              <label>Password:</label>
            </div>
            <div className="passwordInput" style={styles.passwordInput}>
              <input type="text" onChange={signInPasswordChangeHandler}></input>
            </div>
          </div>
          <div style={styles.errorBox}>{loading === "error" ? error : ""}</div>
          {loading === "loading" ? (
            <img src={Spinner} />
          ) : (
            <div style={styles.submitBtBox}>
              <button type="submit" className="btn btn-success">
                Sign-In
              </button>
            </div>
          )}
        </form>
      </div>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        Sign-Up
      </Link>
    </div>
  );
};

const styles = {
  formBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },
  formWrapper: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },
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
  errorBox: {
    border: "1px solid transparent",
    margin: "5px",
    padding: "5px",
  },
  submitBtBox: {
    border: "1px solid black",
    margin: "5px",
    padding: "5px",
  },
};

export default SignIn;
