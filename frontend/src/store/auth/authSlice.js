import { createSlice } from "@reduxjs/toolkit";

/* React-Redux Vs @Reduxjs/Toolkit */
// Redux works replacing current global mode to New State
// While @Reduxjs/Toolkit modifiy directly into global state using a library called immer however under the hood it is same but you write less code

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, { payload }) => {
      state.user = payload;
      console.log(state.user);
      state.token = payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, { payload }) => {
      if (state.user) {
        state.user.friends = payload;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
