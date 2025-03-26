import { post } from '../../helpers/axios-helper';
import { mockActivities } from '../../mock/tourism-facility/activity.mock';
import { Activity, CreateActivityRequest } from '../../types/tourism-facility/activity.types';
import dayjs from 'dayjs';
const ACTIVITY_API = '/afto/tourism-package';

export const activityService = {
  getAllByPackage: async (packageId: number): Promise<Activity[]> => {
    return mockActivities.filter((activity) => activity.packageId === packageId);
  },

  getById: async (activityId: number): Promise<Activity> => {
    const activity = mockActivities.find((a) => a.activityId === activityId);
    if (!activity) throw new Error('Activity not found');
    return activity;
  },

  create: async (data: CreateActivityRequest) => {
    return post<CreateActivityRequest>(`${ACTIVITY_API}/create-activity`, data);
  },

  update: async (id: number, data: Partial<CreateActivityRequest>): Promise<Activity> => {
    const index = mockActivities.findIndex((a) => a.activityId === id);
    if (index === -1) throw new Error('Activity not found');

    mockActivities[index] = {
      ...mockActivities[index],
      ...data,
      updatedDate: dayjs().toISOString()
    };
    return mockActivities[index];
  },

  approve: async (id: number, content: string): Promise<Activity> => {
    const index = mockActivities.findIndex((a) => a.activityId === id);
    if (index === -1) throw new Error('Activity not found');

    mockActivities[index] = {
      ...mockActivities[index],
      approvalStatus: true,
      approvalContent: content,
      updatedDate: dayjs().toISOString()
    };
    return mockActivities[index];
  },

  reject: async (id: number, content: string): Promise<Activity> => {
    const index = mockActivities.findIndex((a) => a.activityId === id);
    if (index === -1) throw new Error('Activity not found');

    mockActivities[index] = {
      ...mockActivities[index],
      approvalStatus: false,
      approvalContent: content,
      updatedDate: dayjs().toISOString()
    };
    return mockActivities[index];
  }
};
