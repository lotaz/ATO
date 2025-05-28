import { CarOutlined, EditOutlined, EyeOutlined, PhoneOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Card, CardContent, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchDrivers } from '../../../redux/tourism-company/driver.slice';
import { VehicleType } from '../../../types/tourism-company/driver.types';

const DriverList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { drivers } = useSelector((state: RootState) => state.driverSlice);
  const [searchText, setSearchText] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(8);

  const getVehicleTypeName = (value: VehicleType) => {
    const displayNames: Record<VehicleType, string> = {
      [VehicleType.CAR_4]: 'Xe 4 chỗ',
      [VehicleType.CAR_7]: 'Xe 7 chỗ',
      [VehicleType.CAR_16]: 'Xe 16 chỗ',
      [VehicleType.CAR_29]: 'Xe 29 chỗ',
      [VehicleType.CAR_45]: 'Xe 45 chỗ',
      [VehicleType.SLEEPER_BUS_SINGLE]: 'Xe giường nằm đơn',
      [VehicleType.SLEEPER_BUS_COUPLE]: 'Xe giường nằm đôi',
      [VehicleType.FLY]: 'Máy bay'
    };
    return displayNames[value] || value;
  };

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const filteredDrivers = drivers.filter(
    (driver) => driver.driverName.toLowerCase().includes(searchText.toLowerCase()) || driver.phoneNumber.includes(searchText)
  );

  const handleViewDetails = (driverId: string) => {
    navigate(`${TOURISM_COMPANY_URLs.DRIVER.DETAILS}/${driverId}`);
  };

  const handleUpdate = (driverId: string) => {
    navigate(`${TOURISM_COMPANY_URLs.DRIVER.UPDATE}/${driverId}`);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm tài xế" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.DRIVER.CREATE)}>
          Thêm tài xế
        </Button>
      </Stack>

      <Grid container spacing={0}>
        {filteredDrivers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((driver) => (
          <Grid sx={{ paddingBottom: 2, paddingRight: 2 }} item xs={12} sm={6} md={4} lg={3} key={driver.driverId}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ padding: 2, position: 'relative' }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetails(driver.driverId)}
                    sx={{
                      color: 'info.main',
                      '&:hover': { bgcolor: 'info.lighter' }
                    }}
                  >
                    <EyeOutlined />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdate(driver.driverId)}
                    sx={{
                      color: 'warning.main',
                      '&:hover': { bgcolor: 'warning.lighter' }
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                </Stack>

                <Stack spacing={1.5} alignItems="center">
                  <Avatar src={driver?.imgs[0]} sx={{ width: 80, height: 80 }}>
                    <UserOutlined style={{ fontSize: 40 }} />
                  </Avatar>

                  <Typography variant="h6" align="center">
                    {driver.driverName}
                  </Typography>

                  <Stack spacing={1} width="100%">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneOutlined style={{ color: '#666', fontSize: '14px' }} />
                      <Typography variant="body2">{driver.phoneNumber}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CarOutlined style={{ color: '#666', fontSize: '14px' }} />
                      <Typography variant="body2">{getVehicleTypeName(driver.vehicleType)}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredDrivers.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          color="primary"
        />
      </Box>
    </Stack>
  );
};

export default DriverList;
