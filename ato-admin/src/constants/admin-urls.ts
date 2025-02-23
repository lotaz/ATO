export const ADMIN_BASE_URL = '/admin';

export const ADMIN_URLs = {
  DASHBOARD: ADMIN_BASE_URL,
  AUTHEN: {
    LOGIN: `${ADMIN_BASE_URL}/login`,
    REGISTER: `${ADMIN_BASE_URL}/register`
  },
  SAMPLE_PAGE: '/sample-page',
  ACCOUNT: {
    INDEX: `${ADMIN_BASE_URL}/account`,
    CREATE: `${ADMIN_BASE_URL}/account/create`,
    UPDATE: `${ADMIN_BASE_URL}/account/update`,
    DETAILS: `${ADMIN_BASE_URL}/account/details`
  },
  TOUR: {
    INDEX: `${ADMIN_BASE_URL}/account/tour`
  },
  NEWS: {
    INDEX: `${ADMIN_BASE_URL}/account/news`
  }
};
