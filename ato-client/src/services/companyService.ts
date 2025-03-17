import { Company } from "@/types/company";
import { get } from "@/helpers/axios-helper";
import { mockCompanies } from "@/mock/companies";

export const getCompanies = async (): Promise<Company[]> => {
  return mockCompanies;
  const response = await get<Company[]>("/companies");
  return response.data;
};
