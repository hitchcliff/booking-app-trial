import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HelloState {
  loading: boolean;
  toggleComments: boolean;
  search: string;
}

const initialState: HelloState = {
  loading: true,
  toggleComments: false,
  search: "",
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
  },
});

export const { setLoadingSlice, setToggleCommentsSlice, setSearchSlice } =
  globalSlice.actions;
