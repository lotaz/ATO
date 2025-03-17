import { CreateTransportRequest, Transport, UpdateTransportRequest } from '../../types/tourism-company/transport.types';

export const transportService = {
  getByDestinations: async (fromId: string, toId: string): Promise<Transport[]> => {
    // TODO: Replace with actual API call
    return [];
  },

  create: async (data: CreateTransportRequest): Promise<Transport> => {
    // TODO: Replace with actual API call
    return {
      transportId: crypto.randomUUID(),
      ...data,
      notes: data.notes || null
    };
  },

  update: async (data: UpdateTransportRequest): Promise<Transport> => {
    // TODO: Replace with actual API call
    return {
      ...data,
      notes: data.notes || null
    };
  },

  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
  }
};
