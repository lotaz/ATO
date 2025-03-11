export const API_URLs = {
  AUTHEN: {
    SIGN_IN: `/auth/login`,
    SIGN_UP: `/auth/sign-up`,
    SEND_OTP: `/auth/forgot-password/send-otp`,
    VERIFY_OTP: `/auth/forgot-password/verify-OTP`,
    CHANGE_PASSWORD: `/auth/forgot-password`
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
