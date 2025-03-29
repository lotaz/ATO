import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import Stepper from "components/stepper/Stepper";
import ShopLayout1 from "./ShopLayout1";
/**
 *  Used:
 *  1. cart page
 *  2. checkout page
 *  3. payment page
 */
// ======================================================

// ======================================================
const CheckoutNavLayout = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [list, setList] = useState(stepperList);
  const router = useRouter();
  const { pathname } = router;

  const handleStepChange = (step) => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;

      case 1:
        router.push("/payment");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;

      case "/payment":
        setSelectedStep(2);
        setList([
          {
            title: "Giỏ hàng",
            disabled: false,
          },
          {
            title: "Thanh toán",
            disabled: false,
          },
        ]);
        break;

      default:
        break;
    }
  }, [pathname]);
  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        <Box
          mb={3}
          display={{
            sm: "block",
            xs: "none",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stepper
                stepperList={list}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>

        {children}
      </Container>
    </ShopLayout1>
  );
};

const stepperList = [
  {
    title: "Giỏ hàng",
    disabled: false,
  },
  {
    title: "Thanh toán",
    disabled: true,
  },
];
export default CheckoutNavLayout;
