import { configureStore } from "@reduxjs/toolkit";
import graph from "./slices/graph";
import history from "./slices/historySlice";
import nodeStyling from "./slices/nodeStyling";

export const store = configureStore({
  reducer: { graph, history, nodeStyling },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
