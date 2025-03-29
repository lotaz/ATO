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

// ============================================================
const Profile = ({ user }) => {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md")); // SECTION TITLE HEADER LINK

  const HEADER_LINK = (
    <Link href={`/profile/${user.id}`} passHref>
      <Button
        color="primary"
        sx={{
          px: 4,
          bgcolor: "primary.light",
        }}
      >
        Chỉnh sửa thông tin
      </Button>
    </Link>
  );
  const infoList = [
    {
      title: "16",
      subtitle: "Đơn hàng",
    },
    {
      title: "02",
      subtitle: "Tour đã đặt",
    },
  ];
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="Thông tin tài khoản"
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
                src={"#"}
                sx={{
                  height: 64,
                  width: 64,
                }}
              />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{`${user.name.firstName} ${user.name.lastName}`}</H5>
                  </div>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={6} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow
        sx={{
          cursor: "auto",
          p: "0.75rem 1.5rem",
          ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start",
          }),
        }}
      >
        <TableRowItem title="Họ và tên" value={user.name.firstName} />
        <TableRowItem title="Email" value={user.email} />
        <TableRowItem title="Số điện thoại" value={user.phone} />
        <TableRowItem
          title="Ngày sinh"
          value={format(new Date(user.dateOfBirth), "dd MMM, yyyy")}
        />
      </TableRow>
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
export default Profile;
