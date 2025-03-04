export const ADMIN_BASE_URL = '/admin';

export const ADMIN_URLs = {
  DASHBOARD: ADMIN_BASE_URL,
  SAMPLE_PAGE: '/sample-page',
  ACCOUNT: {
    INDEX: `${ADMIN_BASE_URL}/account`,
    CREATE: `${ADMIN_BASE_URL}/account/create`,
    UPDATE: `${ADMIN_BASE_URL}/account/update`,
    DETAILS: `${ADMIN_BASE_URL}/account/details`
  },
  REQUEST: {
    INDEX: `${ADMIN_BASE_URL}/request`,
    REPLY: `${ADMIN_BASE_URL}/request/reply`
  },
  COMPANY: {
    INDEX: `${ADMIN_BASE_URL}/company`,
    CREATE: `${ADMIN_BASE_URL}/company/create`,
    UPDATE: `${ADMIN_BASE_URL}/company/update`,
    DETAILS: `${ADMIN_BASE_URL}/company/details`
  },
  NEWS: {
    INDEX: `${ADMIN_BASE_URL}/account/news`
  }
};
