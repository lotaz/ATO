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
    UNASSIGED: '/admin/tour-company/unassigned-tour-companies',
    DRIVER: {
      LIST: '/tour-company/driver/get-list-drivers',
      GET: '/tour-company/driver/get-driver/:id',
      CREATE: '/tour-company/driver/add-driver',
      UPDATE: '/tour-company/driver/update-driver/:id'
    },
    PAYMENT: {
      LIST: '/tour-company/book-tour/get-list-history-payment',
      GET: '/tour-company/book-tour/payment/:id'
    }
  },
  FACILITY: {
    LIST: '/admin/tourist-facility/list-tourist-facilities',
    GET: '/admin/tourist-facility/get-tourist-facility/:id',
    CREATE: '/admin/tourist-facility/create-tourist-facility',
    UPDATE: '/admin/tourist-facility/update-tourist-facility',
    UNASSIGED: '/admin/tourist-facility/unassigned-tour-facility'
  },
  BLOG: {
    CREATE: '/content-moderators/blog/create',
    UPDATE: '/content-moderators/blog/update',
    GET: '/content-moderators/blog/get-blog-details',
    LIST: '/content-moderators/blog/get-blogs'
  },
  TOUR_GUIDE: {
    LIST: '/tour-company/guideteams/get-list-guide-teams',
    CREATE: '/tour-guide/create',
    UPDATE: '/tour-guide/update',
    DETAILS: '/tour-company/guideteams/get-guide-team',
    REQUEST: '/tour-guide/request'
  },
  FACILITY_OWNER: {
    PRODUCT: {
      LIST: '/afto/product/get-products',
      GET: '/afto/product/get-product/:id',
      CREATE: '/afto/product/create-product',
      UPDATE: '/afto/product/update-product'
    },
    CONTRACT: {
      LIST: '/afto/contract/get-contracts',
      GET: '/afto/contract/get-contract/:id',
      CREATE: '/afto/contract/create-contract',
      UPDATE: '/afto/contract/update-contract/:id'
    }
  },
  ACCOMMODATION: {
    LIST: '/tour-company/accommodation/get-list-accommodations',
    GET: '/tour-company/accommodation/get-accommodation/:id',
    CREATE: '/tour-company/accommodation/add-accommodation',
    UPDATE: '/tour-company/accommodation/update-accommodation/:id'
  }
};
