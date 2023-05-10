import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { $api } from "../../api/api";

export const asyncGetAbouts = createAsyncThunk("asyncGetAbouts", async (data, helpers) => {
  const { rejectWithValue } = helpers;
  try {
    const res = await $api.get("/about/get");
    if (res.data) return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const asyncCreateAbout = createAsyncThunk("asyncCreateAbout", async (data, helpers) => {
  const { rejectWithValue } = helpers;
  try {
    const res = await $api.post(`/about/create/`, data);
    if (res.data) return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const asyncUpdateAbout = createAsyncThunk("asyncUpdateAbout", async (data, helpers) => {
  const { rejectWithValue } = helpers;
  try {
    const res = await $api.patch(`/about/update/${data.aboutId}`, data);
    if (res.data) return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const asyncDeleteAbout = createAsyncThunk("asyncDeleteAbout", async (data, helpers) => {
  const { rejectWithValue } = helpers;
  try {
    const res = await $api.delete(`/about/delete/${data}`);
    if (res.data) return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  abouts: [],
};

const userSlice = createSlice({
  name: "abouts",
  initialState,
  reducers: {},
  extraReducers: {
    [asyncGetAbouts.fulfilled]: (state, { payload }) => {
      state.abouts = payload;
    },
    [asyncGetAbouts.rejected]: (_, { payload }) => {
      toast.error(`Не удалось получить информацию ${payload?.response?.data?.message || ""}`);
    },

    [asyncCreateAbout.fulfilled]: (_, { payload }) => {
      toast.success("Информация успешно создана");
    },
    [asyncCreateAbout.rejected]: (_, { payload }) => {
      toast.error(`Не удалось создать информацию ${payload?.response?.data?.message || ""}`);
    },

    [asyncUpdateAbout.fulfilled]: (_, { payload }) => {
      toast.success("Информация успешно изменена");
    },
    [asyncUpdateAbout.rejected]: (_, { payload }) => {
      toast.error(`Не удалось изменить информацию ${payload?.response?.data?.message || ""}`);
    },

    [asyncDeleteAbout.fulfilled]: (_, { payload }) => {
      toast.success("Информация успешно удалена");
    },
    [asyncDeleteAbout.rejected]: (_, { payload }) => {
      toast.error(`Не удалось удалить информацию ${payload?.response?.data?.message || ""}`);
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
