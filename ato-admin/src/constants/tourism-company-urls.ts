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
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/tour-guide-team/details`
  },
  TOUR_PACKAGE: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/tour-package`,
    CREATE: `${TOURISM_COMPANY_BASE_URL}/tour-package/create`,
    UPDATE: `${TOURISM_COMPANY_BASE_URL}/tour-package/update`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/tour-package/details`
  },
  TOUR_DESTINATION: {
    CREATE: (packageId: number) => `${TOURISM_COMPANY_BASE_URL}/tour-package/destinations/create?packageId=${packageId}`,
    UPDATE: (packageId: number, destinationId: number) =>
      `${TOURISM_COMPANY_BASE_URL}/tour-package/destinations/update?packageId=${packageId}&destinationId=${destinationId}`,
    DETAILS: (packageId: number, destinationId: number) =>
      `${TOURISM_COMPANY_BASE_URL}/tour-package/destinations/details?packageId=${packageId}&destinationId=${destinationId}`
  },
  DRIVER: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/drivers`,
    CREATE: `${TOURISM_COMPANY_BASE_URL}/drivers/create`,
    UPDATE: `${TOURISM_COMPANY_BASE_URL}/drivers/update/:id`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/drivers/details/:id`
  },
  ACCOMMODATION: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/accommodation`,
    CREATE: `${TOURISM_COMPANY_BASE_URL}/accommodation/create`,
    UPDATE: `${TOURISM_COMPANY_BASE_URL}/accommodation/update/:id`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/accommodation/details/:id`
  },
  BOOKING: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/book-tour`
  },
  CONTRACT: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/contract`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/contract/details`
  },
  HISTORY_PAYMENT: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/history-payment`
  },
  BANK_ACCOUNTS: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}/bank-accounts`,
    CREATE: `${TOURISM_COMPANY_BASE_URL}/bank-accounts/create`,
    UPDATE: `${TOURISM_COMPANY_BASE_URL}/bank-accounts/update/:id`,
    DETAILS: `${TOURISM_COMPANY_BASE_URL}/bank-accounts/details/:id`
  },
  DASHBOARD: {
    INDEX: `${TOURISM_COMPANY_BASE_URL}`
  }
};
