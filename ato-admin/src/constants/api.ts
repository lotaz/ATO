export const API_URLs = {
  AUTHEN: {
    SIGN_IN: `/auth/login`,
    SIGN_UP: `/auth/sign-up`,
    SEND_OTP: `/auth/forgot-password/send-otp`,
    VERIFY_OTP: `/auth/forgot-password/verify-OTP`,
    CHANGE_PASSWORD: `/auth/change-password`
  },
  CONFIG: {
    EMAIL: {
      GET: '/admin/config/email',
      UPDATE: '/admin/config/update-config-email'
    }
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
  },
  TOUR_GUIDE: {
    LIST: '/tour-guide',
    CREATE: '/tour-guide/create',
    UPDATE: '/tour-guide/update',
    DETAILS: '/tour-guide/details',
    REQUEST: '/tour-guide/request'
  }
};
