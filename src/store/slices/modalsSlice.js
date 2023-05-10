import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createAbout: { visible: false, data: null },
  createPost: { visible: false, data: null },
  editPost: { visible: false, data: null },
  comments: { visible: false, data: null },
  signin: { visible: false, data: null },
  signup: { visible: false, data: null },
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      if (state[payload.modal] !== undefined) {
        state[payload.modal] = {
          visible: payload.visible,
          data: payload?.data,
        };
      }
    },
  },
});

export const { showModal } = modalsSlice.actions;

export default modalsSlice.reducer;
