import { Box, Stack } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Footer from "components/footer/Footer";
import ShopLayout2 from "components/layouts/ShopLayout2";
import BannerSection from "pages-sections/home/BannerSection";
import BlogSection from "pages-sections/home/BlogSection";
import CategorySection from "pages-sections/home/CategorySection";
import TopProducts from "pages-sections/home/TopProducts";
import api from "utils/__api__/healthbeauty-shop";

// ===============================================
const Index = (props) => {
  return (
    <ShopLayout2>
      <SEO title="Trang chủ" />
      {/* TOP HERO CAROUSEL AREA */}
      <Box id="banner-section">
        <BannerSection carouselData={props.mainCarouselData} />
      </Box>

      <Stack spacing={6}>
        {/* BANNER AREA */}
        {/* <Section2 /> */}

        {/* SERVICE LIST AREA */}
        {/* <ServiceSection serviceList={props.serviceList} /> */}
        <Box mt={2} />

        {/* CATEGORY LIST AREA */}
        <CategorySection categories={props.categories} />

        {/* TOP NEW PRODUCTS AREA */}
        <TopProducts products={props.topNewProducts} />

        {/* ALL PRODUCTS AREA */}
        {/* <AllProducts products={props.allProducts} /> */}

        {/* BRAND AREA */}
        {/* <BrandSection brands={props.brands} /> */}

        {/* BRAND AREA */}
        <BlogSection blogs={props.blogs} />

        {/* TESTIMONIAL LIST AREA */}
        {/* <TestimonialSection testimonials={props.testimonials} /> */}

        {/* FOOTER AREA */}
        <Footer
          id="footer"
          sx={{
            borderRadius: "8px",
            backgroundColor: "primary.800",
          }}
        />
      </Stack>

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
    </ShopLayout2>
  );
};

export const getStaticProps = async () => {
  const serviceList = await api.getServices();
  const allProducts = await api.getProducts();
  const navigationList = await api.getNavigation();
  const topNewProducts = await api.getTopNewProducts();
  const mainCarouselData = await api.getMainCarousel();
  const categories = await api.getCategories();

  const testimonials = await api.getTestimonials();
  const brands = await api.getBrands();
  const blogs = await api.getBlogs();
  return {
    props: {
      serviceList,
      allProducts,
      topNewProducts,
      navigationList,
      mainCarouselData,
      categories,
      testimonials,
      brands,
      blogs,
    },
  };
};
export default Index;
