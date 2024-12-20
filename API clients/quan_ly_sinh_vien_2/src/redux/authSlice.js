import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        // Thay vì gửi POST request, chúng ta sẽ lấy danh sách users và kiểm tra
        const response = await axios.get('http://localhost:3001/users');
        const user = response.data.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
          // Nếu tìm thấy user, lưu thông tin vào localStorage (trừ password)
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          return userWithoutPassword;
        } else {
          return rejectWithValue('Invalid username or password');
        }
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;