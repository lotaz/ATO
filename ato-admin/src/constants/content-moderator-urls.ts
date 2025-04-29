export const CONTENT_MODERATOR_BASE_URL = '/content-moderator';

export const CONTENT_MODERATOR_URLs = {
  BLOG: {
    INDEX: `${CONTENT_MODERATOR_BASE_URL}/blog`,
    CREATE: `${CONTENT_MODERATOR_BASE_URL}/blog/create`,
    UPDATE: `${CONTENT_MODERATOR_BASE_URL}/blog/update`,
    DETAILS: `${CONTENT_MODERATOR_BASE_URL}/blog/details`
  },
  REVIEW: {
    INDEX: `${CONTENT_MODERATOR_BASE_URL}/review`,
    DETAILS: `${CONTENT_MODERATOR_BASE_URL}/details`
  },
  CER: {
    INDEX: `${CONTENT_MODERATOR_BASE_URL}/cer`,
    DETAILS: `${CONTENT_MODERATOR_BASE_URL}/cer/details`
  },
  FACILITY_CER: {
    INDEX: `${CONTENT_MODERATOR_BASE_URL}/facility-cert`,
    DETAILS: `${CONTENT_MODERATOR_BASE_URL}/facility-cert/details`
  },
  PRODUCT: {
    INDEX: `${CONTENT_MODERATOR_BASE_URL}/product`,
    DETAILS: `${CONTENT_MODERATOR_BASE_URL}/product/details`
  },
  PACKAGE: {
    INDEX: `${CONTENT_MODERATOR_BASE_URL}/package`,
    DETAILS: `${CONTENT_MODERATOR_BASE_URL}/package/details`
  }
};
