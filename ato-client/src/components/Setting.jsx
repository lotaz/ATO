import { Message, Phone } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Stack,
  styled,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import CartCheck from "./icons/CartCheck";

const MainContainer = styled(Box)(({ theme }) => ({
  bottom: 40,
  left: 40,
  zIndex: 1501,
  position: "fixed",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  zIndex: 99,
  padding: 12,
  color: "#fff",
  borderRadius: "50%",
  boxShadow: theme.shadows[12],
  backgroundColor: theme.palette.primary.main,
  ":hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Setting = () => {
  const [showBody, setShowBody] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setShowBody(false)}>
      <MainContainer>
        <Stack direction={"column"} gap={3}>
          <Tooltip title="Giỏ hàng" placement="left">
            <StyledIconButton onClick={() => setShowBody((state) => !state)}>
              <CartCheck />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Liên hệ zalo" placement="left">
            <StyledIconButton onClick={() => setShowBody((state) => !state)}>
              <Message />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Liên hệ sdt" placement="left">
            <StyledIconButton onClick={() => setShowBody((state) => !state)}>
              <Phone />
            </StyledIconButton>
          </Tooltip>
        </Stack>
      </MainContainer>
    </ClickAwayListener>
  );
};

const demos = [
  {
    id: 0,
    path: "/market-1",
    img: "/assets/images/landing/page-1.png",
  },
  {
    id: 1,
    path: "/market-2",
    img: "/assets/images/landing/home/market-2.jpg",
  },
  {
    id: 2,
    path: "/grocery2",
    img: "/assets/images/landing/page-2.png",
  },
  {
    id: 3,
    path: "/fashion-shop-1",
    img: "/assets/images/landing/page-3.png",
  },
  {
    id: 4,
    path: "/fashion-shop-2",
    img: "/assets/images/landing/home/fashion-2.jpg",
  },
  {
    id: 5,
    path: "/fashion-shop-3",
    img: "/assets/images/landing/home/fashion-3.jpg",
  },
  {
    id: 6,
    path: "/gadget-shop",
    img: "/assets/images/landing/page-4.png",
  },
  {
    id: 7,
    path: "/furniture-shop",
    img: "/assets/images/landing/furniture.png",
  },
  {
    id: 8,
    path: "/gift-shop",
    img: "/assets/images/landing/gift-shop.png",
  },
  {
    id: 9,
    path: "/grocery1",
    img: "/assets/images/landing/grocery1.png",
  },
  {
    id: 10,
    path: "/grocery3",
    img: "/assets/images/landing/grocery3.png",
  },
  {
    id: 11,
    path: "/healthbeauty-shop",
    img: "/assets/images/landing/healthbeauty.png",
  },
];
export default Setting;
