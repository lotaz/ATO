import {
  Pagination,
  TextField,
  Box,
  Stack,
  InputAdornment,
} from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useState, useEffect } from "react";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import OrderRow from "pages-sections/orders/OrderRow";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/orders";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card1 from "components/Card1";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    minAmount: "",
    maxAmount: "",
  });
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrders();
        const formattedOrders = response.map((order) =>
          api.formatOrderData(order)
        );
        setOrders(formattedOrders);
        setFilteredOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (filters.startDate) {
      result = result.filter(
        (order) => new Date(order.orderDate) >= filters.startDate
      );
    }
    if (filters.endDate) {
      result = result.filter(
        (order) => new Date(order.orderDate) <= filters.endDate
      );
    }
    if (filters.minAmount) {
      result = result.filter(
        (order) => order.totalAmount >= Number(filters.minAmount)
      );
    }
    if (filters.maxAmount) {
      result = result.filter(
        (order) => order.totalAmount <= Number(filters.maxAmount)
      );
    }

    setFilteredOrders(result);
    setPage(1);
  }, [filters, orders]);

  // Calculate pagination based on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        title="Đơn hàng của tôi"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* Search Filters */}
      <Card1 sx={{ mb: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <DatePicker
              label="Từ ngày"
              value={filters.startDate}
              onChange={(date) =>
                setFilters((prev) => ({ ...prev, startDate: date }))
              }
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Đến ngày"
              value={filters.endDate}
              onChange={(date) =>
                setFilters((prev) => ({ ...prev, endDate: date }))
              }
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              label="Số tiền từ"
              type="number"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minAmount: e.target.value }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₫</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Đến"
              type="number"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxAmount: e.target.value }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₫</InputAdornment>
                ),
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Card1>

      <TableRow
        elevation={0}
        sx={{
          padding: "0px 18px",
          background: "none",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Mã đơn hàng
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Trạng thái
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Ngày đặt hàng
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Tổng tiền
        </H5>

        <H5
          my={0}
          px={2.75}
          color="grey.600"
          flex="0 0 0 !important"
          display={{
            xs: "none",
            md: "block",
          }}
        />
      </TableRow>

      {loading ? (
        <FlexBox justifyContent="center" mt={5}>
          Loading...
        </FlexBox>
      ) : (
        paginatedOrders.map((order) => (
          <OrderRow order={order} key={order.id} />
        ))
      )}

      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          page={page}
          count={totalPages}
          color="primary"
          variant="outlined"
          onChange={handlePageChange}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};

export default Orders;
