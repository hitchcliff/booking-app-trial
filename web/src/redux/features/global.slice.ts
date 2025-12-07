import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HelloState {
  loading: boolean;
  toggleComments: boolean;
  commentSectionIds: number[];
  search: string;
}

const initialState: HelloState = {
  loading: true,
  toggleComments: false,
  search: "",
  commentSectionIds: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoadingSlice: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setToggleCommentsSlice: (state, { payload }) => {
      state.toggleComments = payload;
    },
    setSearchSlice: (state, { payload }) => {
      state.search = payload;
    },
    pushCommentSectionId: (state, { payload }) => {
      state.commentSectionIds.push(payload);
    },
    removeCommentSectionId: (state, { payload }) => {
      state.commentSectionIds = state.commentSectionIds.filter(
        (item) => item !== payload
      );
    },
  },
});

export const {
  setLoadingSlice,
  setToggleCommentsSlice,
  setSearchSlice,
  removeCommentSectionId,
  pushCommentSectionId,
} = globalSlice.actions;
