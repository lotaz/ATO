import { Box, Card, Divider, Grid } from "@mui/material";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import ProductCard7 from "components/product-cards/ProductCard7";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";

const Cart = () => {
  const { state } = useAppContext();
  const cartList = state.cart;

  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  return (
    <CheckoutNavLayout>
      {cartList.length > 0 ? (
        <>
          <SEO title="Cart" />
          <Grid container spacing={3}>
            {/* CART PRODUCT LIST */}
            <Grid item md={8} xs={12}>
              {cartList.map((item) => (
                <ProductCard7 key={item.id} {...item} />
              ))}
            </Grid>

            {/* CHECKOUT FORM */}
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  padding: 3,
                }}
              >
                <FlexBetween mb={2}>
                  <Span color="grey.600">Tổng:</Span>

                  <Span fontSize={18} fontWeight={600} lineHeight="1">
                    {currency(getTotalPrice())}
                  </Span>
                </FlexBetween>

                <Divider
                  sx={{
                    mb: 2,
                  }}
                />
                <CheckoutForm />
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              width={90}
              height={100}
              alt="banner"
              src="/assets/images/logos/shopping-bag.svg"
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Giỏ hàng của bạng đang trống. Tiếp tục mua sắm
            </Box>
          </FlexBox>
        </>
      )}
    </CheckoutNavLayout>
  );
};

export default Cart;
