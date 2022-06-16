import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

//sign up user
export const registerUser = createAsyncThunk(
  "registerUser/POST",
  async (userObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/signup", userObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//sign in user
export const signInUser = createAsyncThunk(
  "signInUser/POST",
  async (userObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/signin", userObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//pageRefresher - cookie check
export const pageRefresher = createAsyncThunk(
  "pageRefresher/POST",
  async (cookieObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/pagerefresher", cookieObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//publish post
export const publishPost = createAsyncThunk(
  "publishPost/POST",
  async (publishObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/publish", publishObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete post
export const deletePost = createAsyncThunk(
  "deletePost/POST",
  async (deleteObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/deletepost", deleteObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//edit post
export const editPost = createAsyncThunk(
  "editPost/POST",
  async (editObj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/editpost", editObj, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//all users
export const allUsers = createAsyncThunk(
  "allUsers/GET",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get("/allusers", config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get user
export const getUser = createAsyncThunk(
  "getUser/POST",
  async (userId, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/getuser", userId, config);
      return await response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get user
export const vote = createAsyncThunk("vote/POST", async (voteObj, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/vote", voteObj, config);
    return await response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Redux State
const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    user_data: "",
    all_users: "",
    ind_user: "",
    cookie_status: "",
    is_LoggedIn: false,
    loading: "idle",
    error: "",
  },
  reducers: {
    reduxReset: (state, action) => {
      state.user_data = "";
      state.all_users = "";
      state.ind_user = "";
      state.cookie_status = "";
      state.is_LoggedIn = false;
      state.loading = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //sign-up
    builder.addCase(registerUser.pending, (state) => {
      state.loading = "loading";
      state.is_LoggedIn = false;
      state.error = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.is_LoggedIn = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = "error";
      state.is_LoggedIn = false;
      state.error = action.payload;
    });
    //sign-in
    builder.addCase(signInUser.pending, (state) => {
      state.loading = "loading";
      state.is_LoggedIn = false;
      state.error = "";
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.is_LoggedIn = true;
      state.error = "";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = "error";
      state.is_LoggedIn = false;
      state.error = action.payload;
    });
    //pageRefresher
    builder.addCase(pageRefresher.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(pageRefresher.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.is_LoggedIn = true;
      state.user_data = action.payload;
      state.cookie_status = true;
      state.error = "";
    });
    builder.addCase(pageRefresher.rejected, (state, action) => {
      state.loading = "error";
      state.is_LoggedIn = false;
      state.error = action.payload;
    });
    //publishPost
    builder.addCase(publishPost.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(publishPost.fulfilled, (state, action) => {
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(publishPost.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
    //deletePost
    builder.addCase(deletePost.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.user_data = action.payload;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
    //editPost
    builder.addCase(editPost.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.user_data = action.payload;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
    //allUsers
    builder.addCase(allUsers.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(allUsers.fulfilled, (state, action) => {
      state.all_users = action.payload;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(allUsers.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
    //getUser
    builder.addCase(getUser.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.ind_user = action.payload;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
    //vote
    builder.addCase(vote.pending, (state) => {
      state.loading = "loading";
      state.error = "";
    });
    builder.addCase(vote.fulfilled, (state, action) => {
      state.ind_user = action.payload;
      state.loading = "loaded";
      state.error = "";
    });
    builder.addCase(vote.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    });
  },
});

export const { reduxReset } = signUpSlice.actions;

export default signUpSlice.reducer;
