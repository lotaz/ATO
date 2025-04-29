import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MainCard from '../../../components/MainCard';
import AnalyticEcommerce from '../../../components/cards/statistics/AnalyticEcommerce';
import { dashboardService } from '../../../services/tourism-company/dashboard.service';
import { StatusBooking, TourCompanyDashboardData } from '../../../types/tourism-company/dashboard.types';
import MonthlyBarChart from '../../admin/dashboard/MonthlyBarChart';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function TourCompanyDashboard() {
  const [dashboardData, setDashboardData] = useState<TourCompanyDashboardData | null>(null);
  const [timePeriod, setTimePeriod] = useState<'month' | 'year'>('month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        setDashboardData(response);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) return <Typography>Đang tải...</Typography>;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Header */}

      {/* Statistics Cards */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số tour" count={dashboardData.tourCount.toLocaleString()} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số tài xế" count={dashboardData.driverCount.toLocaleString()} percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Tổng số chỗ ở"
          count={dashboardData.accommodationCount.toLocaleString()}
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
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
                    month: `${m.year}-${m.month}`,
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
      <Grid item xs={12} md={7} lg={8}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Đặt tour gần đây
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gói tour</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardData.recentBookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{booking.packageName}</TableCell>
                  <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.totalAmount.toLocaleString()} VND</TableCell>
                  <TableCell>
                    {booking.status === StatusBooking.Pending && 'Đang chờ'}
                    {booking.status === StatusBooking.Confirmed && 'Đã xác nhận'}
                    {booking.status === StatusBooking.Cancelled && 'Đã hủy'}
                    {booking.status === StatusBooking.Completed && 'Hoàn thành'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
