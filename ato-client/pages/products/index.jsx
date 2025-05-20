import { SentimentDissatisfied } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Slider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CategorySectionCreator from "components/CategorySectionCreator";
import SEO from "components/SEO";
import { H2, Paragraph } from "components/Typography";
import Footer from "components/footer/Footer";
import ShopLayout2 from "components/layouts/ShopLayout2";
import ProductCard14 from "components/product-cards/ProductCard14";
import { useState, useEffect, useRef } from "react";
import api from "utils/__api__/healthbeauty-shop";

// styled component
const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [category, setCategory] = useState("-1");
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        category && category !== "-1"
          ? product.productCategory === Number(category)
          : true;

      return matchesSearch && matchesPrice && matchesCategory;
    });
    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, 4));
    setPage(1);
  }, [products, searchQuery, priceRange, category]);

  const loadMoreItems = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async loading
    setPage((prev) => prev + 1);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (page > 1) {
      const newProducts = filteredProducts.slice(
        visibleProducts.length,
        visibleProducts.length + 4
      );
      setVisibleProducts((prev) => [...prev, ...newProducts]);
    }
  }, [page]);

  useEffect(() => {
    if (visibleProducts.length >= filteredProducts.length) return;
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, visibleProducts, filteredProducts]);

  return (
    <ShopLayout2>
      {/* Hero Section */}

      <Box
        sx={{
          backgroundImage: "url('/assets/small-banners/blur-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container>
          <H2 color="white" textAlign="center" mb={2}>
            Sản phẩm OCOP
          </H2>
          <Typography
            color="white"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Khám phá sản phẩm OCOP địa phương, nơi chất lượng và sự đa dạng mang
            đến trải nghiệm du lịch tuyệt vời.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SEO title="Sản phẩm OCOP" />

        <CategorySectionCreator title="Tất cả sản phẩm">
          <SubTitle>
            Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch nông
            thôn kết hợp giới thiệu sản phẩm OCOP địa phương
          </SubTitle>

          {/* Search and Filters Section */}
          <Box mb={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Tìm kiếm sản phẩm..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Danh mục"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="-1">Tất cả</option>
                  <option value="0">Thực phẩm</option>
                  <option value="1">Đồ uống</option>
                  <option value="2">Thảo dược</option>
                  <option value="3">Vải may mặc</option>
                  <option value="4">Lưu niệm - Nội thất - Trang trí</option>
                  <option value="5">
                    Dịch vụ du lịch cộng đồng và điểm du lịch
                  </option>
                  <option value="Orther">Khác</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ px: 2 }}>
                  <Typography gutterBottom>Khoảng giá (VNĐ)</Typography>
                  <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                    step={10000}
                    valueLabelFormat={(value) => value.toLocaleString()}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Products Grid with Not Found State */}
          {filteredProducts.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {visibleProducts.map((item) => (
                  <Grid item lg={3} sm={6} xs={12} key={item.productId}>
                    <ProductCard14
                      id={item.productId}
                      slug={item.productId}
                      title={item.productName}
                      price={item.price}
                      off={0}
                      rating={5}
                      imgUrl={item.imgs[0]}
                      description={item.description}
                      manufacturer={item.manufacturer}
                      origin={item.origin}
                      product={item}
                    />
                  </Grid>
                ))}
              </Grid>

              {isLoadingMore && (
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Grid item lg={3} sm={6} xs={12} key={index}>
                      <Box
                        sx={{
                          height: 400,
                          bgcolor: "grey.300",
                          borderRadius: 2,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 2,
                backgroundColor: "grey.50",
                borderRadius: 2,
              }}
            >
              <SentimentDissatisfied
                sx={{
                  fontSize: 60,
                  color: "grey.400",
                  mb: 2,
                }}
              />
              <Typography variant="h6" color="grey.600" gutterBottom>
                Không tìm thấy sản phẩm
              </Typography>
              <Typography color="grey.500">
                Không tìm thấy sản phẩm phù hợp với từ khóa "{searchQuery}"
              </Typography>
            </Box>
          )}
        </CategorySectionCreator>
      </Box>

      <Footer
        id="footer"
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800",
          mt: 8,
        }}
      />
    </ShopLayout2>
  );
};

export const getStaticProps = async () => {
  try {
    const topNewProducts = await api.getTopNewProducts();

    return {
      props: {
        products: topNewProducts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default ProductList;
