import { Company } from '../services/company/types';

export const filterCompanies = (companies: Company[], searchTerm: string): Company[] => {
  return companies.filter(
    (company) =>
      company.companynName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.emailCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyDescription?.includes(searchTerm)
  );
};