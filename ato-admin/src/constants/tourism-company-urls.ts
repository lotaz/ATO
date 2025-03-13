export const TOURISM_COMPANY_BASE_URL = '/tourism-company';

export const TOURISM_COMPANY_URLs = {
  PACKAGE: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/package`,
    CREATE: `${TOURISM_COMPANY_BASE_URL}/package/create`,
    UPDATE: `${TOURISM_COMPANY_BASE_URL}/package/update`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/package/details`
  },
  TOUR_GUIDE_TEAM: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/tour-guide-team`,
    CREATE: `${TOURISM_COMPANY_BASE_URL}/tour-guide-team/create`,
    UPDATE: `${TOURISM_COMPANY_BASE_URL}/tour-guide-team/update`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/tour-guide-team/details`,
    REQUEST: `${TOURISM_COMPANY_BASE_URL}/tour-guide-team/request`
  }
};
