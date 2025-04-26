import Link from "next/link";
import { useState, useEffect } from "react";
import { Delete, Edit, Place, Home } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { get, del } from "helpers/axios-helper";
import { useSnackbar } from "notistack";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchAddresses = async () => {
    try {
      const response = await get("/tourist/address");
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      enqueueSnackbar("Không thể tải danh sách địa chỉ", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddressDelete = async (id) => {
    try {
      await del(`/tourist/address/${id}`);
      enqueueSnackbar("Xóa địa chỉ thành công", { variant: "success" });
      fetchAddresses(); // Refresh the list
    } catch (error) {
      console.error("Delete failed:", error);
      enqueueSnackbar("Xóa địa chỉ thất bại", { variant: "error" });
    }
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Place}
        title="Địa chỉ của tôi"
        button={
          <Link href="/address/create" passHref>
            <Button
              variant="contained"
              startIcon={<Home />}
              sx={{
                px: 3,
                py: 1,
                color: "white",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Thêm địa chỉ mới
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Box>
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} md={6} key={address.shipAddressId}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <FlexBox alignItems="center" gap={1} mb={2}>
                    <Typography variant="h6" fontWeight="600">
                      {address.toName}
                    </Typography>
                    {address.defaultAddress && (
                      <Chip
                        label="Mặc định"
                        color="primary"
                        size="small"
                        sx={{ height: 24 }}
                      />
                    )}
                  </FlexBox>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {address.toPhone}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ mb: 2 }}
                  >
                    {`${address.toWardName}, ${address.toDistrictName}, ${address.toProvinceName}`}
                  </Typography>

                  <FlexBox justifyContent="flex-end" gap={1}>
                    <Link href={`/address/${address.shipAddressId}`} passHref>
                      <Button
                        startIcon={<Edit />}
                        variant="outlined"
                        size="small"
                        color="primary"
                      >
                        Sửa
                      </Button>
                    </Link>

                    <Button
                      startIcon={<Delete />}
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleAddressDelete(address.shipAddressId)}
                      disabled={address.defaultAddress}
                    >
                      Xóa
                    </Button>
                  </FlexBox>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {addresses.length === 0 && (
          <Card sx={{ p: 4, mt: 2, textAlign: "center" }}>
            <Place sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
            <Typography variant="h6" color="grey.600" gutterBottom>
              Bạn chưa có địa chỉ nào
            </Typography>
            <Typography color="grey.500" mb={3}>
              Thêm địa chỉ để thuận tiện cho việc đặt tour
            </Typography>
            <Link sx={{ color: "white" }} href="/address/create" passHref>
              <Button variant="contained" startIcon={<Home />}>
                Thêm địa chỉ mới
              </Button>
            </Link>
          </Card>
        )}
      </Box>
    </CustomerDashboardLayout>
  );
};

export default AddressList;
