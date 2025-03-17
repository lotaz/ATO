import { mockActivities } from '../../mock/tourism-facility/activity.mock';
import { Activity, CreateActivityRequest } from '../../types/tourism-facility/activity.types';
import dayjs from 'dayjs';

export const activityService = {
  getAllByPackage: async (packageId: number): Promise<Activity[]> => {
    return mockActivities.filter((activity) => activity.packageId === packageId);
  },

  getById: async (activityId: number): Promise<Activity> => {
    const activity = mockActivities.find((a) => a.activityId === activityId);
    if (!activity) throw new Error('Activity not found');
    return activity;
  },

  create: async (data: CreateActivityRequest): Promise<Activity> => {
    const newActivity: any = {
      ...data,
      activityId: Math.max(...mockActivities.map((a) => a.activityId)) + 1,
      approvalStatus: false,
      approvalContent: null,
      createdDate: dayjs().toISOString(),
      updatedDate: null
    };
    mockActivities.push(newActivity);
    return newActivity;
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
