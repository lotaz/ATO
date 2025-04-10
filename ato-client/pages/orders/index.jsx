import { Pagination } from "@mui/material";
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrders();
        const formattedOrders = response.map((order) =>
          api.formatOrderData(order)
        );
        setOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

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
