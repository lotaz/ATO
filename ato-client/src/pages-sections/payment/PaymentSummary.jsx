import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";

const PaymentSummary = () => {
  return (
    <Card1>
      <FlexBetween>
        <Paragraph color="grey.600">Tổng:</Paragraph>
        <Paragraph
          fontSize={25}
          fontWeight={600}
          lineHeight={1}
          textAlign="right"
        >
          {currency(2650)}
        </Paragraph>
      </FlexBetween>
    </Card1>
  );
};

export default PaymentSummary;
