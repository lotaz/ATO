import { Add, Remove } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import FeedbackSection from "components/feedback/FeedbackSection";
import { FlexBox } from "components/flex-box";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { H2, H3, H4 } from "components/Typography";
import { API_URLs } from "constants/api-url";
import { useAppContext } from "contexts/AppContext";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => get(url).then((res) => res.data);
const PRODUCT_CATEGORIES = {
  0: "Thực phẩm",
  1: "Đồ uống",
  2: "Thảo dược",
  3: "Vải may mặc",
  4: "Lưu niệm - Nội thất - Trang trí",
  5: "Dịch vụ du lịch cộng đồng và điểm du lịch",
  6: "Khác",
};
const ButtonBox = styled(FlexBox)(({ theme }) => ({
  gap: 10,
  marginTop: "15px",
  justifyContent: "space-between",
  "& button": {
    color: "#fff",
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary[400],
    },
  },
})); // =============================================================
const ProductDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("productId");
  const ocopId = params.get("ocopId");
  console.log("id", id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(
    id ? `${API_URLs.PRODUCT.DETAILS}/${id}/${ocopId}` : null,
    fetcher
  );
  const { state, dispatch } = useAppContext();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>Product not found</div>;
  const cartItem = state.cart.find((item) => item.slug === id);

  console.log("product", product);
  const handleCartAmountChange = (amount, type) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: product.price,
        imgUrl: product.imgs[0],
        id,
        name: product.productName,
        qty: amount,
        slug: id,
        product,
      },
    }); // SHOW ALERT PRODUCT ADDED OR REMOVE

    if (type === "remove") {
      enqueueSnackbar("Xóa khỏi giỏ hàng", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Thêm vào giỏ hàng", {
        variant: "success",
      });
    }
  };
  // Helper components
  const ProductImageGallery = () => (
    <Box sx={{ mb: 3 }}>
      <img
        src={product.imgs?.[selectedImage] || "/placeholder.jpg"}
        alt={product.productName}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      {product.imgs?.length > 1 && (
        <Card sx={{ mt: 2 }}>
          <ImageList sx={{ height: 100 }} cols={6}>
            {product.imgs?.map((img, index) => (
              <ImageListItem
                key={index}
                sx={{
                  cursor: "pointer",
                  opacity: selectedImage === index ? 1 : 0.7,
                }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`Product image ${index + 1}`}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Card>
      )}
    </Box>
  );

  const ProductDescription = () => (
    <Card mb={3}>
      <CardContent>
        <Typography variant="h6">Mô tả chi tiết sản phẩm</Typography>
        <Typography
          paragraph
          sx={{
            maxHeight: showFullDescription ? "none" : 500,
            overflow: "hidden",
            "& p": { margin: 0 },
            "& *": { maxWidth: "100%", lineHeight: 1.6 },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </Typography>
        <Button
          onClick={() => setShowFullDescription(!showFullDescription)}
          color="primary"
          size="small"
          sx={{ mt: 1 }}
        >
          {showFullDescription ? "Đóng" : "Đọc thêm"}
        </Button>
      </CardContent>
    </Card>
  );

  const ProductSpecifications = () => (
    <Card sx={{ p: 3, mb: 3 }}>
      <H4 mb={2}>Thông tin sản phẩm</H4>
      <List>
        <ListItem>
          <ListItemText
            primary="Danh mục"
            secondary={PRODUCT_CATEGORIES[product.productCategory]}
          />
        </ListItem>
        {product.volume && (
          <ListItem>
            <ListItemText primary="Khối lượng" secondary={product.volume} />
          </ListItem>
        )}
        {product.origin && (
          <ListItem>
            <ListItemText primary="Xuất xứ" secondary={product.origin} />
          </ListItem>
        )}
        {product.manufacturer && (
          <ListItem>
            <ListItemText
              primary="Nhà sản xuất"
              secondary={product.manufacturer}
            />
          </ListItem>
        )}
        {product.nutritionType && (
          <ListItem>
            <ListItemText
              primary="Loại dinh dưỡng"
              secondary={product.nutritionType}
            />
          </ListItem>
        )}

        <ListItem>
          <ListItemText
            primary="Ngày hết hạn"
            secondary={new Date(product.expirationDate).toLocaleString()}
          />
        </ListItem>
      </List>
    </Card>
  );

  const CertificationList = () =>
    product.certifications?.length > 0 && (
      <Card sx={{ p: 3 }}>
        <H4>Chứng nhận</H4>
        <List>
          {product.certifications.map((cert, index) => (
            <ListItem key={index} sx={{ margin: 0, padding: 0 }}>
              <div>
                <ListItemText
                  sx={{ width: "100%" }}
                  primary={cert.certificationName}
                  secondary={`Cấp bởi: ${
                    cert.issuingOrganization
                  } - Ngày cấp: ${new Date(
                    cert.issueDate
                  ).toLocaleDateString()}`}
                />
                {cert.imgs?.length > 1 && (
                  <ImageList>
                    {cert.imgs?.map((img, index) => (
                      <ImageListItem
                        key={index}
                        sx={{
                          cursor: "pointer",
                          opacity: selectedImage === index ? 1 : 0.7,
                        }}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={img}
                          alt={`Cert image ${index + 1}`}
                          style={{ height: "100%", objectFit: "cover" }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    );

  return (
    <ShopLayout2>
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
            Thông tin sản phẩm
          </H2>
          <Typography
            color="white"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Xem chi tiết sản phẩm của chúng tôi.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={6}>
            <ProductImageGallery />
            <ProductDescription />
          </Grid>

          {/* Right Column - Details */}
          <Grid item xs={12} md={6}>
            <Box mb={4}>
              <H3 mb={2}>{product.productName}</H3>
              <Typography variant="h5" color="primary.main" mb={3}>
                {product.price?.toLocaleString()} VNĐ
              </Typography>
              <ButtonBox>
                {cartItem?.qty ? (
                  <Button
                    variant="contained"
                    sx={{
                      py: "3px",
                      width: "100%",
                      fontSize: "13px",
                    }}
                    onClick={handleCartAmountChange(cartItem.qty - 1, "remove")}
                  >
                    <Remove /> Xóa khỏi giỏ hàng
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      py: "3px",
                      width: "100%",
                      fontSize: "13px",
                    }}
                    onClick={handleCartAmountChange(1)}
                  >
                    <Add /> Thêm vào giỏ hàng
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{
                    p: "3px 8px",
                  }}
                >
                  <FavoriteIcon
                    sx={{
                      fontSize: "16px",
                    }}
                  />
                </Button>
              </ButtonBox>
            </Box>

            <ProductSpecifications />

            {product.additional && (
              <Card sx={{ p: 3, mb: 3 }}>
                <H4 mb={2}>Thông tin bổ sung</H4>
                <Typography paragraph>{product.additional}</Typography>
              </Card>
            )}

            <CertificationList />
            <FeedbackSection entityId={id} entityType="product" />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default ProductDetails;
