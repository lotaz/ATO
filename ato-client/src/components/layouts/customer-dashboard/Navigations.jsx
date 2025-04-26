import { Fragment } from "react";
import { useRouter } from "next/router";
import { Card, styled, Typography } from "@mui/material";
import {
  CardTravelOutlined,
  CreditCard,
  FavoriteBorder,
  KeyOutlined,
  LocationCity,
  PasswordOutlined,
  Person,
  Place,
  PlaceOutlined,
} from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import NavLink from "components/nav-link/NavLink"; // custom styled components

const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
const StyledNavLink = styled(({ children, isCurrentPath, ...rest }) => (
  <NavLink {...rest}>{children}</NavLink>
))(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const Navigations = () => {
  const { pathname } = useRouter();
  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                />
                <span>{item.title}</span>
              </FlexBox>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};

const linkList = [
  {
    title: "Trang chủ",
    list: [
      {
        href: "/orders",
        title: "Đơn hàng",
        icon: ShoppingBagOutlined,
        count: 5,
      },
      {
        href: "/booked-tours",
        title: "Tour của bạn",
        icon: CardTravelOutlined,
        count: 5,
      },
    ],
  },
  {
    title: "Cài đặt tài khoản",
    list: [
      {
        href: "/profile",
        title: "Thông tin tài khoản",
        icon: Person,
      },
      {
        href: "/address",
        title: "Cài đặt địa chỉ",
        icon: LocationCity,
      },
      {
        href: "/change-password",
        title: "Đổi mật khẩu",
        icon: KeyOutlined,
      },
    ],
  },
];
export default Navigations;
