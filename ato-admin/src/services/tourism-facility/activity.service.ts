import { get, post, put } from '../../helpers/axios-helper';
import { ActivityRequest } from '../../types/tourism-facility/activity.types';

const API_URL = '/afto/tourism-package';

export const activityService = {
  createActivity: async (data: ActivityRequest) => {
    const response = await post(`${API_URL}/create-activity`, data);
    return response.data;
  },
  updateActivity: async (id: string, data: ActivityRequest) => {
    const response = await put(`${API_URL}/update-activity/${id}`, data);
    return response.data;
  },
  getActivity: async (id: string) => {
    const response = await get(`${API_URL}/get-activity/${id}`);
    return response.data;
  }
};
