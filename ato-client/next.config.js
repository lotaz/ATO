module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
    currency: "VND",
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    environment: process.env.NEXT_ENV,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
