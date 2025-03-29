import { Fragment } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Done, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import TableRow from "components/TableRow";
import Delivery from "components/icons/Delivery";
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import { H5, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import useWindowSize from "hooks/useWindowSize";
import { currency } from "lib";
import api from "utils/__api__/orders"; // styled components
import { StatusOrder } from "constants/order-enums";

const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));

import { useState, useEffect } from "react";

// =============================================================
const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const width = useWindowSize();
  const breakpoint = 350;
  const stepIconList = [PackageBox, TruckFilled, Delivery];

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await api.getOrder(id);
          const formattedOrder = api.formatOrderData(response);
          setOrder(formattedOrder);
        } catch (error) {
          console.error("Failed to fetch order:", error);
        }
      };
      fetchOrder();
    }
  }, [id]);

  if (!order) return <p>Đang tải...</p>;

  const getStatusIndex = (status) => {
    const statusList = [
      StatusOrder.Processing,
      StatusOrder.Shipped,
      StatusOrder.Completed,
    ];
    return statusList.indexOf(status);
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={ShoppingBag}
        title="Chi tiết đơn hàng"
        navigation={<CustomerDashboardNavigation />}
      />

      {/* ORDER PROGRESS AREA */}
      <Card sx={{ p: "2rem 1.5rem", mb: "30px" }}>
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor:
                      ind <= getStatusIndex(order.status)
                        ? "primary.main"
                        : "grey.300",
                    color:
                      ind <= getStatusIndex(order.status)
                        ? "grey.white"
                        : "primary.main",
                  }}
                >
                  <Icon color="inherit" sx={{ fontSize: "32px" }} />
                </Avatar>
                {ind < getStatusIndex(order.status) && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: "grey.200",
                        color: "success.main",
                      }}
                    >
                      <Done color="inherit" sx={{ fontSize: "1rem" }} />
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  className="line"
                  bgcolor={
                    ind < getStatusIndex(order.status)
                      ? "primary.main"
                      : "grey.300"
                  }
                />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>
      </Card>

      {/* ORDERED PRODUCT LIST */}
      <Card sx={{ p: 0, mb: "30px" }}>
        <TableRow
          sx={{
            p: "12px",
            borderRadius: 0,
            boxShadow: "none",
            bgcolor: "grey.200",
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Mã đơn hàng:
            </Typography>
            <Typography fontSize={14}>{order.id}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Ngày đặt:
            </Typography>
            <Typography fontSize={14}>
              {format(new Date(order.orderDate), "dd/MM/yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {order.items.map((item, ind) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                <Avatar src={item.images?.[0]} sx={{ height: 64, width: 64 }} />
                <Box ml={2.5}>
                  <H6 my="0px">{item.name}</H6>
                  <Typography fontSize="14px" color="grey.600">
                    {currency(item.price)} x {item.quantity}
                  </Typography>
                </Box>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      {/* SHIPPING AND ORDER SUMMERY */}
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: "20px 30px" }}>
            <H5 mt={0} mb={2}>
              Thông tin thanh toán
            </H5>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Phương thức:
              </Typography>
              <H6 my="0px">
                {order.paymentType === 0
                  ? "Thanh toán khi nhận hàng"
                  : "Chuyển khoản"}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Trạng thái:
              </Typography>
              <H6 my="0px">
                {order.paymentStatus === 0
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </H6>
            </FlexBetween>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: "20px 30px" }}>
            <H5 mt={0} mb={2}>
              Tổng thanh toán
            </H5>
            <FlexBetween mb={2}>
              <H6 my="0px">Tổng tiền</H6>
              <H6 my="0px">{currency(order.totalAmount)}</H6>
            </FlexBetween>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default OrderDetails;
