export const API_URLs = {
  AUTHEN: {
    SIGN_IN: `/auth/login`,
    SIGN_UP: `/auth/sign-up`
  },
  ACCOUNT: {
    LIST: '/admin/user/get-list-users',
    GET: '/admin/user/get-user/:id'
  },
  BLOG: {
    CREATE: '/content-moderators/blog/create',
    UPDATE: '/content-moderators/blog/update',
    GET: '/content-moderators/blog/get-blog-details',
    LIST: '/content-moderators/blog/get-blogs'
  }
};
