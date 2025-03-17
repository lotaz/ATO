export const TOURISM_FACILITY_BASE_URL = '/tourism-facility';

export const TOURISM_FACILITY_URLs = {
  PRODUCT: {
    INDEX: `${TOURISM_FACILITY_BASE_URL}/product`,
    CREATE: `${TOURISM_FACILITY_BASE_URL}/product/create`,
    UPDATE: `${TOURISM_FACILITY_BASE_URL}/product/update`,
    DETAILS: `${TOURISM_FACILITY_BASE_URL}/product/details`,
    CERTIFICATES: '/tourism-facility/product/certificates',
    CREATE_CERTIFICATE: '/tourism-facility/product/certificates/create',
    UPDATE_CERTIFICATE: '/tourism-facility/product/certificates/update',
    VIEW_CERTIFICATE: '/tourism-facility/product/certificates/view'
  },
  PACKAGE: {
    INDEX: `${TOURISM_FACILITY_BASE_URL}/package`,
    CREATE: `${TOURISM_FACILITY_BASE_URL}/package/create`,
    UPDATE: `${TOURISM_FACILITY_BASE_URL}/package/update`,
    DETAILS: `${TOURISM_FACILITY_BASE_URL}/package/details`,
    ACTIVITY: {
      INDEX: (packageId: number) => `${TOURISM_FACILITY_BASE_URL}/package/activities?packageId=${packageId}`,
      CREATE: (packageId: number) => `${TOURISM_FACILITY_BASE_URL}/package/activities/create?packageId=${packageId}`,
      UPDATE: (packageId: number, activityId: number) =>
        `${TOURISM_FACILITY_BASE_URL}/package/activities/update?packageId=${packageId}&activityId=${activityId}`,
      DETAILS: (packageId: number, activityId: number) =>
        `${TOURISM_FACILITY_BASE_URL}/package/activities/view?packageId=${packageId}&activityId=${activityId}`
    }
  },
  ORDER: {
    INDEX: `${TOURISM_FACILITY_BASE_URL}/orders`,
    DETAILS: `${TOURISM_FACILITY_BASE_URL}/orders/details`
  },
  CONTRACT: {
    INDEX: `${TOURISM_FACILITY_BASE_URL}/contracts`,
    CREATE: `${TOURISM_FACILITY_BASE_URL}/contracts/create`,
    UPDATE: `${TOURISM_FACILITY_BASE_URL}/contracts/update`,
    DETAILS: `${TOURISM_FACILITY_BASE_URL}/contracts/details`
  }
};
