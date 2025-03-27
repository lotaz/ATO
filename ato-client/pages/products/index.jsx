import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";
import SEO from "components/SEO";
import { H2 } from "components/Typography";
import ShopLayout2 from "components/layouts/ShopLayout2";
import ProductCard14 from "components/product-cards/ProductCard14";
import CategorySectionCreator from "components/CategorySectionCreator";
import { Paragraph } from "components/Typography";
import Footer from "components/footer/Footer";
import { styled } from "@mui/material";
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

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ShopLayout2>
      {/* Hero Section */}

      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #0d47a1)",
          py: 8,
          mb: 4,
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

      <Box
        sx={{
          mb: 4,
        }}
      >
        <SEO title="Sản phẩm OCOP" />

        <CategorySectionCreator title="Tất cả sản phẩm">
          <SubTitle>
            Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch nông
            thôn kết hợp giới thiệu sản phẩm OCOP địa phương
          </SubTitle>

          {/* Search Bar - Updated */}
          <Box mb={4} sx={{ width: "100%" }}>
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
                width: "100%",
                maxWidth: "100%",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>

          {/* Products Grid with Not Found State */}
          {filteredProducts.length > 0 ? (
            <Grid container spacing={3}>
              {filteredProducts.map((item) => (
                <Grid item lg={4} sm={6} xs={12} key={item.productId}>
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
                  />
                </Grid>
              ))}
            </Grid>
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
