import { Box, Card, Container, Grid, Typography } from "@mui/material";
import ShopLayout2 from "components/layouts/ShopLayout2";
import TourBookingForm from "components/tour/TourBookingForm";
import { get } from "helpers/axios-helper";
import { useRouter } from "next/router";
import useSWR from "swr";
import { H2 } from "components/Typography";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const fetcher = (url) => get(url).then((res) => res.data);

const BookTourPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedProducts, setSelectedProducts] = useState([]);

  const {
    data: tour,
    error,
    isLoading,
  } = useSWR(
    id
      ? `/agricultural-tour-package/get-agricultural-tour-package/${id}`
      : null,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tour details</div>;
  if (!tour) return <div>Tour not found</div>;

  const handleProductSelect = (product) => {
    setSelectedProducts((prev) =>
      prev.some((x) => x.productId === product.productId)
        ? prev.filter((x) => x.productId !== product.productId)
        : [...prev, product]
    );
  };

  return (
    <ShopLayout2>
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #0d47a1)",
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <H2 color="white" textAlign="center" mb={2}>
            Đặt tour
          </H2>
          <Typography color="white" textAlign="center" mb={4}>
            {tour.packageName}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Thông tin tour
              </Typography>
              <Typography paragraph>{tour.description}</Typography>

              {/* Products Section */}
              {tour.tourDestinations?.some(
                (dest) => dest.activity?.products?.length > 0
              ) && (
                <Box mt={4}>
                  <Typography variant="h6" mb={2}>
                    Chọn mua sản phẩm theo tour
                  </Typography>
                  <List>
                    {tour.tourDestinations.map((destination) =>
                      destination.activity?.products?.map((product) => (
                        <ListItem key={product.productId}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedProducts.some(
                                  (x) => x.productId === product.productId
                                )}
                                onChange={() =>
                                  handleProductSelect({
                                    ...product,
                                    quantity: 1,
                                  })
                                }
                              />
                            }
                            label={
                              <Box display="flex" alignItems="center">
                                <img
                                  src={product.imgs?.[0] || "/placeholder.jpg"}
                                  alt={product.productName}
                                  style={{
                                    width: 60,
                                    height: 60,
                                    marginRight: 16,
                                  }}
                                />
                                <ListItemText
                                  primary={product.productName}
                                  secondary={`${product.price?.toLocaleString()} VNĐ`}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <TourBookingForm
              tourId={id}
              price={tour.price}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default BookTourPage;
