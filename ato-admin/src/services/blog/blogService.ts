import { get, post, put } from '../../helpers/axios-helper';
import { API_URLs } from '../../constants/api';
import { BlogCreateRequest, BlogUpdateRequest, BlogResponse, BlogListResponse } from './types';

export const blogService = {
  createBlog: async (request: BlogCreateRequest): Promise<BlogResponse> => {
    try {
      const response = await post<BlogResponse>(API_URLs.BLOG.CREATE, request);
      console.log(response);

      return response.data;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create blog'
      };
    }
  },

  updateBlog: async (request: BlogUpdateRequest): Promise<BlogResponse> => {
    try {
      const response = await put<BlogResponse>(`${API_URLs.BLOG.UPDATE}/${request.id}`, request);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update blog'
      };
    }
  },

  getBlog: async (id: string): Promise<BlogResponse> => {
    try {
      const response = await get<BlogResponse>(`${API_URLs.BLOG.GET}/${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch blog'
      };
    }
  },

  getBlogs: async (): Promise<BlogListResponse> => {
    try {
      const response = await get<BlogListResponse>(API_URLs.BLOG.LIST);
      return response.data;
    } catch (error) {
      return {
        success: false,
        data: [],
        error: 'Faild to fetch blogs'
      };
    }
  }
};
