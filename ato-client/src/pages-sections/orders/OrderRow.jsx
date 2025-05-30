import Link from "next/link";
import { format } from "date-fns";
import { East } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { currency } from "lib";
import { StatusOrder } from "constants/order-enums";

const OrderRow = ({ order }) => {
  const getColor = (status) => {
    switch (status) {
      case StatusOrder.Processing:
        return "warning";
      case StatusOrder.Shipped:
        return "info";
      case StatusOrder.Completed:
        return "success";
      case StatusOrder.RejecOrder:
        return "error";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case StatusOrder.Processing:
        return "Đang xử lý";
      case StatusOrder.AcceptOrder:
        return "Đang giao hàng";
      case StatusOrder.Completed:
        return "Đã hoàn thành";
      case StatusOrder.RejecOrder:
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <Link href={`/orders/${order.id}`} passHref>
      <TableRow
        sx={{
          my: "1rem",
          padding: "6px 18px",
        }}
      >
        <H5 m={0.75} textAlign="left">
          {order.id}
        </H5>

        <Box m={0.75}>
          <Chip
            size="small"
            label={getStatusLabel(order.status)}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: !!getColor(order.status)
                ? `${getColor(order.status)}.900`
                : "inherit",
              backgroundColor: !!getColor(order.status)
                ? `${getColor(order.status)}.100`
                : "none",
            }}
          />
        </Box>

        <Typography className="pre" m={0.75} textAlign="left">
          {format(new Date(order.orderDate), "dd/MM/yyyy")}
        </Typography>

        <Typography m={0.75} textAlign="left">
          {currency(order.totalAmount)}
        </Typography>

        <Typography
          color="grey.600"
          textAlign="center"
          sx={{
            flex: "0 0 0 !important",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <IconButton>
            <East
              fontSize="small"
              color="inherit"
              sx={{
                transform: ({ direction }) =>
                  `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Typography>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
