import { Container } from "@mui/material";
import { H2 } from "components/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
      <H2 sx={{ marginTop: "30px", textAlign: "center" }}>Giỏ hàng của bạn</H2>
      <Container
        sx={{
          my: 4,
          mt: 2,
        }}
      >
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
