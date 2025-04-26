import Link from "next/link";
import { format } from "date-fns";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { currency } from "lib";
import api from "utils/__api__/users";
import { useEffect, useState } from "react";
import { get } from "helpers/axios-helper";

// ============================================================
// Add these imports
import { CalendarMonth, Email, Phone, Place } from "@mui/icons-material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get("/profile");
        console.log("user", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Đang tải...</p>;

  const HEADER_LINK = (
    <Link href={`/profile/${user.id}`} passHref>
      <Button color="primary" sx={{ px: 4, bgcolor: "primary.light" }}>
        Chỉnh sửa thông tin
      </Button>
    </Link>
  );

  const profileInfo = [
    {
      icon: Email,
      title: "Email",
      value: user?.email || "Chưa cập nhật",
    },
    {
      icon: Phone,
      title: "Số điện thoại",
      value: user?.phoneNumber || "Chưa cập nhật",
    },

    {
      icon: CalendarMonth,
      title: "Ngày sinh",
      value: user?.dob
        ? format(new Date(user.dob), "dd/MM/yyyy")
        : "Chưa cập nhật",
    },
  ];

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Person}
        title="Thông tin tài khoản"
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* Profile Card */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Box textAlign="center">
              <Avatar
                src={user?.avatarURL || "/assets/images/avatars/default.png"}
                sx={{
                  width: 120,
                  height: 120,
                  margin: "auto",
                  border: 2,
                  borderColor: "primary.main",
                }}
              />
              <H5 mt={2} mb={1}>
                {user?.fullName}
              </H5>
              <Small color="grey.600">{user?.role}</Small>
            </Box>
          </Grid>

          <Grid item md={8} xs={12}>
            <Grid container spacing={2}>
              {profileInfo.map((item) => (
                <Grid item xs={12} sm={6} key={item.title}>
                  <Card
                    sx={{
                      p: 2,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "grey.50",
                    }}
                  >
                    <item.icon
                      sx={{ fontSize: 24, color: "primary.main", mr: 1 }}
                    />
                    <Box>
                      <Small color="grey.600">{item.title}</Small>
                      <Typography fontSize={14}>{item.value}</Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* Account Details */}
      <Card sx={{ p: 3 }}>
        <H5 mb={2}>Chi tiết tài khoản</H5>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FlexBox alignItems="center">
              <Small color="grey.600" minWidth={120}>
                Trạng thái:
              </Small>
              <Typography
                fontSize={14}
                sx={{
                  backgroundColor: "success.light",
                  color: "success.main",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Đang hoạt động
              </Typography>
            </FlexBox>
          </Grid>
        </Grid>
      </Card>
    </CustomerDashboardLayout>
  );
};

const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};

export const getStaticProps = async () => {
  const user = await api.getUser();
  return {
    props: {
      user,
    },
  };
};
// Remove getStaticProps as we're now using client-side fetching
export default Profile;
