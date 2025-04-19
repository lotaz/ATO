import {
  Box,
  Card,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import { currency } from "lib";

const CheckoutForm = ({
  addresses,
  selectedAddressId,
  onAddressSelect,
  shippingFee,
}) => {
  return (
    <Box>
      <Box>
        <Typography fontWeight="600" mb={2}>
          Chọn địa chỉ giao hàng
        </Typography>

        {addresses?.length > 0 ? (
          <RadioGroup
            name="shipAddressId"
            value={selectedAddressId || ""}
            onChange={(e) => {
              const selectedAddress = addresses.find(
                (a) => a.shipAddressId === e.target.value
              );
              onAddressSelect(selectedAddress);
            }}
          >
            {addresses.map((address) => (
              <Card key={address.shipAddressId} sx={{ mb: 2, p: 2 }}>
                <FormControlLabel
                  value={address.shipAddressId}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography fontWeight="600">
                        {address.toName} - {address.toPhone}
                        {address.defaultAddress && " (Mặc định)"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address.toWardName}, {address.toDistrictName}
                      </Typography>
                    </Box>
                  }
                />
              </Card>
            ))}
          </RadioGroup>
        ) : (
          <FlexBox gap={2} alignItems={"center"}>
            <CircularProgress />
            <Typography color="text.secondary">
              Đang tải danh sách địa chỉ...
            </Typography>
          </FlexBox>
        )}
      </Box>
    </Box>
  );
};

export default CheckoutForm;
