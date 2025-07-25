import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

// ~~ Create Class AsyncThunk ~~
export const createNewClass = createAsyncThunk(
  "create/class",
  async (classData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/create-class`,
        classData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// ~ Delete Class AsyncThunk ~ //
export const deleteClass = createAsyncThunk(
  "delete/class",
  async (classId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.delete(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/delete-class/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Get Single Class AsyncThunk ~~ //
export const getSingleClassThunk = createAsyncThunk(
  "getSingleClass/class",
  async (classId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/get-single-class/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Update Class AsyncThunk ~~ //
export const updateClassThunk = createAsyncThunk(
  "update/class",
  async (values, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/update-class`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// ~~ getClass Code AsyncThunk ~~ //
export const getClassCode = createAsyncThunk(
  "class/getClassCode",
  async (classID, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-class-code`,
        {
          params: {
            classID: classID,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Join Class AsyncThunk ~~  //
export const joinClassAsyncThunk = createAsyncThunk(
  "joinclass/class",
  async (code, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/join-class`,
        code,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Get Static Banner Class Images AsyncThunk ~~ //
export const getBannerClassImages = createAsyncThunk(
  "class/getbannerimages",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-static-banners`,
        {
          params: { category },
        }
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// ~~ Custome Upload Banner Images AsyncThunk ~~ //
export const uploadCustomeBannerAsyncThunk = createAsyncThunk(
  "class/upload-custome-banner",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/upload-custome-banner`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// ~~ Set Class Banner Image AsyncThunk ~~ //
export const setClassBanerAsynThunk = createAsyncThunk(
  "class/set-class-banner",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/set-banner-image`,
        values
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Invite Teacher AsyncThunk ~~ //
export const inviteTeacherAsyncThunk = createAsyncThunk(
  "class/inviteTeacher",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/invite-teacher`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~~ Add Invited Teacher AsyncThunk ~~ //
export const InviteTeacherAddAsyncThunk = createAsyncThunk(
  "class/add-invited-teacher",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/invited-teacher-add`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// `` Sent Notifcation Sub Teacher AsyncThunk `` //
export const sentNotificationAsyncThunk = createAsyncThunk(
  "class/sent-notification-subteacher",
  async (values, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/sent-subteacher-notification`,
        values
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// `` Get All Notification AsyncThunk `` //
export const getAllNotificationAsynkThunk = createAsyncThunk(
  "class/get-all-notifications",
  async (value, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/class/get-notifications/${value}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// ~~ 🤖 Class Slice ~~
var classSlice = createSlice({
  name: "class",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Note : Create Class Rudecers //
    builder.addCase(createNewClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewClass.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~~~~~~~~~~~ 👀 ~~~~~~~~~~~~ //

    // Note : Delete Class Rudecers ~
    builder.addCase(deleteClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteClass.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~~~~~~~~~~~ 👀 ~~~~~~~~~~~~ //

    // NOTE : Get Single Class Rudecers  //
    builder.addCase(getSingleClassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleClassThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getSingleClassThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // NOTE : Delete Class Rudecers Section End //

    // ~~ Update Class Reduces ~~ //
    builder.addCase(updateClassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateClassThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateClassThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~ Get Class Code Reduces ~~ //
    builder.addCase(getClassCode.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getClassCode.fulfilled, (state) => {
      state.pending = false;
    });
    builder.addCase(getClassCode.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload;
    });

    // `` Join Class Reducers `` //
    builder.addCase(joinClassAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(joinClassAsyncThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(joinClassAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // `` Get Class Banners Reducers `` //
    builder.addCase(getBannerClassImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBannerClassImages.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getBannerClassImages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // `` Upload Class Cudtome Banners Reducers `` //
    builder.addCase(uploadCustomeBannerAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadCustomeBannerAsyncThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadCustomeBannerAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // `` Set Class Banner Image Reducers `` //
    builder.addCase(setClassBanerAsynThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setClassBanerAsynThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(setClassBanerAsynThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // `` Invite Teacher `` //
    builder.addCase(inviteTeacherAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(inviteTeacherAsyncThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(inviteTeacherAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // `` Invite Teacher  Add Reducers`` //
    builder.addCase(InviteTeacherAddAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(InviteTeacherAddAsyncThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(InviteTeacherAddAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // `` Sent Notification Sub Teacher Reducers`` //
    builder.addCase(sentNotificationAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sentNotificationAsyncThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(sentNotificationAsyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // `` Get All Notification API Reducers `` //
    builder.addCase(getAllNotificationAsynkThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllNotificationAsynkThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllNotificationAsynkThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default classSlice = classSlice.reducer;
