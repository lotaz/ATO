import { get } from "helpers/axios-helper";
import { AgriculturalTourPackageRespone_Guest } from "../types/tour";

export const getAgriculturalTourPackages = async (): Promise<AgriculturalTourPackageRespone_Guest[]> => {
  try {
    const response = await get('/tourist/tour/get-list-agricultural-tour-packages');
    return response.data as AgriculturalTourPackageRespone_Guest[];
  } catch (error) {
    console.error('Error fetching agricultural tour packages:', error);
    throw error;
  }
};