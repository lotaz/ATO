import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge, Box, Button, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AccountCircleOutlined,
  CardTravelOutlined,
  HistoryOutlined,
  KeyboardArrowDown,
  LogoutOutlined,
  PersonOutline,
} from "@mui/icons-material";
import clsx from "clsx";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import MiniCart from "components/mini-cart/MiniCart";
import MobileMenu from "components/navbar/MobileMenu";
import CategoryMenu from "components/categories/CategoryMenu";
import GrocerySearchBox from "components/search-box/GrocerySearchBox";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import { useAppContext } from "contexts/AppContext";
import Login from "pages-sections/sessions/Login";
import { layoutConstant } from "utils/constants";
import SearchBox from "../search-box/SearchBox"; // styled component
import { useRouter } from "next/router";
import { Menu, MenuItem, Avatar } from "@mui/material";
import { AccountCircle, History, Logout } from "@mui/icons-material";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
})); // ==============================================================

// ==============================================================
const Header = ({ isFixed, className, searchBoxType = "type1" }) => {
  const theme = useTheme();
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const router = useRouter();

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = (event) => {
    if (isLoggedIn) {
      console.log("event", event);
      setAnchorEl(event.currentTarget);
    } else {
      router.push("/login");
    }
  };

  const toggleDialog = (e) => handleProfileClick(e);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setIsLoggedIn(false);
    handleMenuClose();
    router.push("/login");
  };

  // Replace the existing profile button with this:
  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          mr={2}
          minWidth="170px"
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/">
            <a>
              <Image
                height={70}
                src="/assets/congbinh/logos/logo.png"
                alt="logo"
              />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <Button color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </Button>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          {searchBoxType === "type1" && <SearchBox />}
          {searchBoxType === "type2" && <GrocerySearchBox />}
        </FlexBox>

        <FlexBox
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Box
            component={IconButton}
            p={1.25}
            bgcolor="grey.200"
            onClick={toggleDialog}
          >
            {isLoggedIn ? (
              <Avatar sx={{ width: 24, height: 24, bgcolor: "primary.main" }}>
                <PersonOutline />
              </Avatar>
            ) : (
              <PersonOutline />
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push("/profile");
              }}
            >
              <AccountCircleOutlined sx={{ mr: 1 }} />
              Thông tin cá nhân
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push("/orders");
              }}
            >
              <HistoryOutlined sx={{ mr: 1 }} />
              Lịch sử đơn hàng
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push("/booked-tours");
              }}
            >
              <CardTravelOutlined sx={{ mr: 1 }} />
              Tour của bạn
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutOutlined sx={{ mr: 1 }} />
              Đăng xuất
            </MenuItem>
          </Menu>

          <Badge badgeContent={state.cart.length} color="primary">
            <Box
              ml={2.5}
              p={1.25}
              bgcolor="grey.200"
              component={IconButton}
              onClick={toggleSidenav}
            >
              <ShoppingBagOutlined />
            </Box>
          </Badge>
        </FlexBox>

        <Dialog
          scroll="body"
          open={dialogOpen}
          fullWidth={isMobile}
          onClose={toggleDialog}
        >
          <Login />
        </Dialog>

        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart toggleSidenav={() => router.push("/cart")} />
        </Drawer>

        {downMd && <MobileMenu />}
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
