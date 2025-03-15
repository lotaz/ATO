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
      GET: '/admin/config/get-config-email',
      UPDATE: '/admin/config/update-config-email'
    },
    VNPAY: {
      GET: '/admin/config/get-config-vnpay',
      UPDATE: '/admin/config/update-config-vnpay'
    }
  },
  ACCOUNT: {
    LIST: '/admin/user/get-list-users',
    GET: '/admin/user/get-user/:id',
    CREATE: '/admin/user/create-account'
  },
  COMPANY: {
    LIST: '/admin/tour-company/list-tour-companies',
    GET: '/admin/tour-company/get-tour-company/:id',
    CREATE: '/admin/tour-company/create-tour-company',
    UPDATE: '/admin/tour-company/update-tour-company',
    UNASSIGED: '/admin/tour-company/unassigned-tour-companies'
  },
  FACILITY: {
    LIST: '/admin/tourist-facility/list-tourist-facilities',
    GET: '/admin/tourist-facility/get-tourist-facility/:id',
    CREATE: '/admin/tourist-facility/create-tourist-facility',
    UPDATE: '/admin/tourist-facility/update-tourist-facility',
    UNASSIGED: '/admin/tourist-facility/unassigned-tourist-facility'
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
  },
  FACILITY_OWNER: {
    PRODUCT: {
      LIST: '/afto/product/get-products',
      GET: '/afto/product/get-product/:id',
      CREATE: '/afto/product/create-product',
      UPDATE: '/afto/product/update-product/:id'
    }
  }
};
