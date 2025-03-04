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
  }
};
