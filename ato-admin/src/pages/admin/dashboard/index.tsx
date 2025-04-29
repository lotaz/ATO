// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../../../components/MainCard';
import AnalyticEcommerce from '../../../components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import UniqueVisitorCard from './UniqueVisitorCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

import { useEffect, useState } from 'react';
import { AdminDashboardData, dashboardService } from '../../../services/admin/dashboard.service';
import { Button, Tab, Tabs } from '@mui/material';

export default function DashboardDefault() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData>();
  const [timePeriod, setTimePeriod] = useState<'month' | 'year'>('month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) return <Typography>Đang tải...</Typography>;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Trang chủ</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Tổng doanh thu"
          count={`${dashboardData.totalAmount?.toLocaleString()} VND`}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số người dùng" count={dashboardData.userCount?.toLocaleString()} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số công ty" count={dashboardData.companyCount?.toLocaleString()} percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Tổng số cơ sở du lịch"
          count={dashboardData.facilityCount?.toLocaleString()}
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid>

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
                  ? `${dashboardData?.monthlyRevenues?.reduce((sum, curr) => sum + curr.totalAmount, 0).toLocaleString()} VND`
                  : `${dashboardData?.yearlyRevenues?.reduce((sum, curr) => sum + curr.totalAmount, 0).toLocaleString()} VND`}
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart
            data={
              timePeriod === 'month'
                ? dashboardData?.monthlyRevenues?.map((m) => ({
                    month: `${m.year}-${m.month}`,
                    revenue: m.totalAmount
                  }))
                : dashboardData?.yearlyRevenues?.map((y) => ({
                    year: y.year.toString(),
                    revenue: y.totalAmount
                  }))
            }
            type={timePeriod}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
