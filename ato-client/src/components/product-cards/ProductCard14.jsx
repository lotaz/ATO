import { Add, Favorite, FavoriteBorder, Remove } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PreviewIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Chip, Divider, styled, useTheme } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import BazaarRating from "components/BazaarRating";
import { FlexBetween, FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
import ProductViewDialog from "components/products/ProductViewDialog";
import { H3, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  margin: "auto",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  borderRadius: "0px 10px 10px 10px",
  "&:hover": {
    boxShadow: theme.shadows[2],
    "& .controller": {
      right: 1,
    },
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const ImageBox = styled(Box)(({ theme }) => ({
  height: "300px",
}));
const HoverWrapper = styled(FlexBetween)(({ theme }) => ({
  top: 0,
  bottom: 0,
  width: 25,
  right: -30,
  height: 120,
  margin: "auto",
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  position: "absolute",
  flexDirection: "column",
  boxShadow: theme.shadows[2],
  transition: "right 0.3s ease-in-out",
  "& span": {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "10px 0px",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#f3f5f9",
    },
  },
  "& a": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#f3f5f9",
    },
  },
  "& svg": {
    fontSize: 18,
    color: theme.palette.grey[600],
  },
}));
const StyledChip = styled(Chip)(({ theme }) => ({
  zIndex: 11,
  top: "16px",
  left: "0px",
  paddingLeft: 3,
  fontWeight: 600,
  paddingRight: 3,
  fontSize: "10px",
  position: "absolute",
  borderRadius: "0px 50px 50px 0px",
  background: theme.palette.primary.main,
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));
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

// =============================================================
const ProductCard14 = (props) => {
  const {
    off,
    id,
    title,
    price,
    imgUrl,
    rating,
    hideRating,
    hoverEffect,
    slug,
    product,
  } = props;

  console.log(product);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/details?productId=${id}&ocopId=${product.ocopId}`);
  };

  const { palette } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);

  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const cartItem = state.cart.find((item) => item.slug === slug);

  const handleCartAmountChange = (amount, type) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        imgUrl,
        id,
        name: title,
        qty: amount,
        slug,
        product,
      },
    });

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

  return (
    <div>
      <StyledBazaarCard hoverEffect={hoverEffect}>
        <ImageWrapper>
          {off !== 0 && (
            <StyledChip color="primary" size="small" label={`${off}% off`} />
          )}

          <ImageBox>
            <LazyImage
              alt={title}
              src={imgUrl}
              width={"100%"}
              height={"100%"}
            />

            <HoverWrapper className="controller">
              <Span onClick={toggleDialog}>
                <PreviewIcon />
              </Span>

              <Divider orientation="horizontal" flexItem />

              <Span onClick={toggleIsFavorite}>
                {isFavorite ? (
                  <Favorite color="primary" fontSize="small" />
                ) : (
                  <FavoriteBorder fontSize="small" color="primary" />
                )}
              </Span>

              <Divider orientation="horizontal" flexItem />

              <Span onClick={handleCartAmountChange(1)}>
                <ShoppingCartIcon />
              </Span>
            </HoverWrapper>
          </ImageBox>
        </ImageWrapper>

        <ProductViewDialog
          openDialog={openModal}
          handleCloseDialog={toggleDialog}
          product={{
            title,
            price,
            id,
            slug,
            imgGroup: [imgUrl, imgUrl],
          }}
        />

        <ContentWrapper>
          <Box
            flex="1 1 0"
            minWidth="0px"
            mr={1}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <H3
              mb={1}
              title={title}
              fontSize="14px" // textAlign="left"
              fontWeight="600"
              className="title"
              color="text.secondary"
            >
              {title}
            </H3>

            {!hideRating && (
              <Box display="flex" alignItems="center">
                <BazaarRating value={rating || 0} color="warn" readOnly />{" "}
                <Span
                  sx={{
                    color: palette.grey[600],
                  }}
                >{`(${rating}.0)`}</Span>
              </Box>
            )}

            <FlexBox gap={1} alignItems="center" mt={0.5}>
              <Box fontWeight="600" color="error.main">
                đ{price?.toLocaleString()}
              </Box>
            </FlexBox>

            <FlexBox gap={1} alignItems="center" mt={0.5}>
              <Box fontWeight="600" color="error.main">
                Ngày hết hạn:{" "}
                {new Date(product.expirationDate).toLocaleString()}
              </Box>
            </FlexBox>
          </Box>

          <ButtonBox
            sx={{
              display: "flex",
              gap: 1,
              mt: 2,
            }}
          >
            {cartItem?.qty ? (
              <Button
                variant="contained"
                color="error"
                sx={{
                  py: 1.5,
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    bgcolor: "error.dark",
                  },
                }}
                onClick={handleCartAmountChange(cartItem.qty - 1, "remove")}
              >
                <Remove sx={{ fontSize: 20 }} />
                Xóa khỏi giỏ hàng
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  py: 1.5,
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  boxShadow: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    background: "linear-gradient(45deg, #1565c0, #1976d2)",
                  },
                }}
                onClick={handleCartAmountChange(1)}
              >
                <Add sx={{ fontSize: 20 }} />
                Thêm vào giỏ hàng
              </Button>
            )}
          </ButtonBox>
        </ContentWrapper>
      </StyledBazaarCard>
    </div>
  );
};

export default ProductCard14;
