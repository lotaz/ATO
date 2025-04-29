import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import AnalyticEcommerce from '../../../components/cards/statistics/AnalyticEcommerce';
import MainCard from '../../../components/MainCard';
import { get } from '../../../helpers/axios-helper';
import MonthlyBarChart from '../../admin/dashboard/MonthlyBarChart';

interface RecentOrder {
  orderId: string;
  orderDate: Date;
  totalAmount: number;
  status: string;
}

interface MonthlyRevenue {
  month: string;
  totalAmount: number;
}

interface YearlyRevenue {
  year: string;
  totalAmount: number;
}

interface TouristFacilityDashboardData {
  productCount: number;
  orderCount: number;
  totalEarnings: number;
  totalPackage: number;
  recentOrders: RecentOrder[];
  monthlyRevenues: MonthlyRevenue[];
  yearlyRevenues: YearlyRevenue[];
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<TouristFacilityDashboardData>({
    productCount: 0,
    orderCount: 0,
    totalEarnings: 0,
    totalPackage: 0,
    recentOrders: [],
    monthlyRevenues: [],
    yearlyRevenues: []
  });
  const [timePeriod, setTimePeriod] = useState<'month' | 'year'>('month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/dashboard/facility/');
        const data = response.data;
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) return <Typography>Đang tải...</Typography>;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Statistics Cards */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số sản phẩm" count={dashboardData.productCount.toString()} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số đơn hàng" count={dashboardData.orderCount.toString()} percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số gói du lịch" count={dashboardData.totalPackage.toString()} percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Tổng doanh thu"
          count={`${dashboardData.totalEarnings.toLocaleString()} VND`}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      {/* Revenue Section */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid sx={{ marginBottom: '12px' }} container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Tổng quan thu nhập</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setTimePeriod('month')}
                color={timePeriod === 'month' ? 'primary' : 'secondary'}
                variant={timePeriod === 'month' ? 'outlined' : 'text'}
              >
                Tháng
              </Button>
              <Button
                size="small"
                onClick={() => setTimePeriod('year')}
                color={timePeriod === 'year' ? 'primary' : 'secondary'}
                variant={timePeriod === 'year' ? 'outlined' : 'text'}
              >
                Năm
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                {timePeriod === 'month' ? 'Thống kê theo tháng' : 'Thống kê theo năm'}
              </Typography>
              <Typography variant="h3">
                {timePeriod === 'month'
                  ? `${dashboardData.monthlyRevenues.reduce((sum, curr) => sum + curr.totalAmount, 0).toLocaleString()} VND`
                  : `${dashboardData.yearlyRevenues.reduce((sum, curr) => sum + curr.totalAmount, 0).toLocaleString()} VND`}
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart
            data={
              timePeriod === 'month'
                ? dashboardData.monthlyRevenues.map((m) => ({
                    month: m.month,
                    revenue: m.totalAmount
                  }))
                : dashboardData.yearlyRevenues.map((y) => ({
                    year: y.year.toString(),
                    revenue: y.totalAmount
                  }))
            }
            type={timePeriod}
          />
        </MainCard>
      </Grid>

      {/* Recent Orders */}
      <Grid item xs={12} md={7} lg={8}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Đơn hàng gần đây
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardData.recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Không có đơn hàng nào
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                dashboardData.recentOrders.slice(0, 10).map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>{order.totalAmount.toLocaleString()} VND</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
