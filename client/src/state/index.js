import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  conversations: [],
  currentconversation: null,
  posts: [],
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends nonexistent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setConversations: (state, action) => {
      if (state.user) {
        state.user.conversations = action.payload.conversations;
      } else {
        console.error("user conversations nonexistent :(");
      }
    },
    SetCurrentConversation: (state, action) => {
      if (state.user.conversations) {
        state.user.currentconversation = action.payload.currentconversation;
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setConversations,
  SetCurrentConversation,
} = authSlice.actions;
export default authSlice.reducer;
