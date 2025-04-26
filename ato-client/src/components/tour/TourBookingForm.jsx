import { Add, ReceiptLong, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { PaymentType } from "constants/order-enums";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import tourBookingService from "services/tour-booking.service";
const TourBookingForm = ({
  tourId,
  priceOfAdults,
  priceOfChildren,
  slot,
  people,
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(PaymentType.Transfer);
  const [isLoading, setIsLoading] = useState(false);

  const isStop = numberOfAdults + numberOfChildren >= slot;
  console.log(isStop);
  console.log(slot);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bookingData = {
        tourId,
        numberOfAdults,
        numberOfChildren,
      };

      const vnPayLink = await tourBookingService.bookTour(bookingData);

      if (vnPayLink) {
        window.location.href = vnPayLink;
      }
    } catch (error) {
      enqueueSnackbar("Đặt tour không thành công. Vui lòng thử lại.", {
        variant: "error",
      });
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    const tourCost =
      priceOfAdults * numberOfAdults +
      priceOfChildren * (numberOfChildren || 0);
    return <>{tourCost.toLocaleString()}</>;
  };

  const QuantitySelector = ({
    value,
    onDecrease,
    onIncrease,
    minValue = 0,
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "#fff",
        borderRadius: 1,
        px: 1,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={value <= minValue}
      >
        <Remove fontSize="small" />
      </IconButton>
      <Typography sx={{ mx: 2, minWidth: "30px", textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton disabled={isStop} size="small" onClick={onIncrease}>
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );

  const PriceRow = ({ label, price, quantity, total }) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: 2,
        mb: 1,
        alignItems: "center",
      }}
    >
      <Typography variant="body2" noWrap>
        {label} {price?.toLocaleString()} VNĐ/người
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        Số lượng: {quantity}
      </Typography>
      <Typography
        variant="body2"
        color="primary.main"
        sx={{ textAlign: "right" }}
      >
        {total?.toLocaleString()} VNĐ
      </Typography>
    </Box>
  );

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        position: "relative",
        overflow: "visible",
        "&:before": {
          content: '""',
          position: "absolute",
          top: -10,
          left: 20,
          right: 20,
          height: 10,
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.06))",
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 4,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 40,
              height: 3,
              bgcolor: "primary.main",
              borderRadius: 1,
            },
          }}
        >
          Đặt tour
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            bgcolor: "grey.100",
            px: 2,
            py: 1,
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          Chỗ còn lại: {slot - people - (numberOfAdults + numberOfChildren)} /{" "}
          {slot}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 4 }}>
            {/* Người lớn selector */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                bgcolor: "primary.lighter",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="secondary.main"
                  >
                    Người lớn
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "error.main",
                      bgcolor: "error.lighter",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                    }}
                  >
                    *Bắt buộc ít nhất 1 vé
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {priceOfAdults?.toLocaleString()} VNĐ/người
                </Typography>
              </Box>
              <QuantitySelector
                value={numberOfAdults}
                onDecrease={() =>
                  numberOfAdults > 1 && setNumberOfAdults(numberOfAdults - 1)
                }
                onIncrease={() => setNumberOfAdults(numberOfAdults + 1)}
                minValue={1}
              />
            </Box>

            {/* Trẻ em selector */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "secondary.lighter",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="secondary.main"
                >
                  Trẻ em
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {priceOfChildren?.toLocaleString()} VNĐ/người
                </Typography>
              </Box>
              <QuantitySelector
                value={numberOfChildren}
                onDecrease={() =>
                  numberOfChildren > 0 &&
                  setNumberOfChildren(numberOfChildren - 1)
                }
                onIncrease={() => setNumberOfChildren(numberOfChildren + 1)}
              />
            </Box>
          </Box>

          {/* Chi tiết thanh toán */}
          <Box
            sx={{
              p: 3,
              bgcolor: "grey.50",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <ReceiptLong sx={{ color: "primary.main" }} />
              Chi tiết thanh toán
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  bgcolor: "grey.50",
                  p: 2.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  mb: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <PriceRow
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        Người lớn
                      </Typography>
                    </Box>
                  }
                  price={priceOfAdults}
                  quantity={numberOfAdults}
                  total={priceOfAdults * numberOfAdults}
                  sx={{}}
                />
              </Box>

              {numberOfChildren > 0 && (
                <Box
                  sx={{
                    bgcolor: "grey.50",
                    p: 2.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <PriceRow
                    label={
                      <Typography variant="subtitle1" fontWeight="600">
                        Trẻ em
                      </Typography>
                    }
                    price={priceOfChildren}
                    quantity={numberOfChildren}
                    total={priceOfChildren * numberOfChildren}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "1.1rem",
                        fontWeight: 500,
                      },
                      "& .price-value": {
                        color: "primary.main",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                p: 3.5,
                background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                color: "white",
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 8px 32px rgba(25, 118, 210, 0.25)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(25, 118, 210, 0.35)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    opacity: 0.9,
                    mb: 0.5,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontSize: "0.875rem",
                  }}
                >
                  Tổng cộng
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  (Đã bao gồm thuế VAT)
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {calculateTotal()}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    opacity: 0.9,
                    fontWeight: 500,
                  }}
                >
                  VNĐ
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="error"
            type="submit"
            disabled={isLoading}
            sx={{
              mt: 4,
              py: 2.5,
              fontSize: "1.2rem",
              fontWeight: 700,
              borderRadius: 3,
              background: "linear-gradient(45deg, #f44336 30%, #ff9800 90%)",
              textTransform: "none",
              letterSpacing: "0.5px",
              boxShadow: "0 8px 20px rgba(244, 67, 54, 0.3)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                transition: "all 0.3s ease",
              },
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(244, 67, 54, 0.4)",
                "&:before": {
                  transform: "translateX(100%)",
                },
              },
              "&:active": {
                transform: "translateY(1px)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)",
                boxShadow: "none",
              },
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CircularProgress
                  size={24}
                  thickness={4}
                  sx={{
                    color: "inherit",
                    animation: "spin 1s linear infinite",
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                />
                <Typography sx={{ fontWeight: 600 }}>Đang xử lý...</Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                {/* <ShoppingCart sx={{ fontSize: 24 }} /> */}
                Thanh toán ngay
              </Box>
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TourBookingForm;
