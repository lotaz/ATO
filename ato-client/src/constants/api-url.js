export const API_URLs = {
  PRODUCT: {
    LIST: "/product/get-products",
  },
  COMPANY: {
    LIST: "/tour-company/list-tour-companies",
    DETAILS: (id) => `/tour-company/get-tour-company/${id}`,
  },
  FACILITY: {
    LIST: "/tourist-facility/list-tourist-facilities",
  },
  BLOG: {
    LIST: "/blog/get-blogs",
    DETAILS: "/blog/get-blog-details",
  },
};
