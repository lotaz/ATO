import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { blogService } from '../services/blog/blogService';
import { BlogCreateRequest, BlogType, BlogUpdateRequest, BlogStatus, Blog } from '../services/blog/types';
import { enqueueSnackbar } from 'notistack';

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null
};

// Helper function to get status text
export const getBlogStatusText = (status: BlogStatus) => {
  switch (status) {
    case BlogStatus.Approval:
      return 'Chấp nhận';
    case BlogStatus.Processing:
      return 'Đang xử lý';
    case BlogStatus.Rejected:
      return 'Đã từ chối';
    default:
      return 'Không xác định';
  }
};

// Helper function to get blog type text
export const getBlogTypeText = (type: BlogType) => {
  switch (type) {
    case BlogType.News:
      return 'Tin tức';
    case BlogType.Even:
      return 'Sự kiện';
    default:
      return 'Không xác định';
  }
};

// Async thunks
export const createBlog = createAsyncThunk('blog/create', async (request: BlogCreateRequest, { rejectWithValue }) => {
  try {
    const response = await blogService.createBlog(request);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateBlog = createAsyncThunk('blog/update', async (request: BlogUpdateRequest, { rejectWithValue }) => {
  try {
    const response = await blogService.updateBlog(request);

    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getBlog = createAsyncThunk('blog/get', async (id: string, { rejectWithValue }) => {
  try {
    const response = await blogService.getBlog(id);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getBlogs = createAsyncThunk('blog/list', async (_, { rejectWithValue }) => {
  try {
    const response = await blogService.getBlogs();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        if (state.blogs) {
          state.blogs.unshift(action.payload!);
        } else {
          state.blogs = [action.payload!];
        }
        enqueueSnackbar('Tạo tin tức thành công', { variant: 'success' });
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        enqueueSnackbar('Tạo tin tức thất bại', { variant: 'error' });
      })

      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex((blog) => blog.id === action.payload!.id);
        if (index !== -1) {
          state.blogs[index] = action.payload!;
        }
        state.currentBlog = action.payload!;
        enqueueSnackbar('Cập nhật tin tức thành công', { variant: 'success' });
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        enqueueSnackbar('Cập nhật tin tức thất bại', { variant: 'error' });
      })

      // Get single blog
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload!;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.currentBlog = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get blog list
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs = action.payload!;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearCurrentBlog, clearError } = blogSlice.actions;
export default blogSlice;
