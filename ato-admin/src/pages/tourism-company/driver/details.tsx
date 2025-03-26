import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchDriver } from '../../../redux/tourism-company/driver.slice';
import { VehicleType } from '../../../types/tourism-company/driver.types';

const DriverDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { specific: driver, loading } = useSelector((state: RootState) => state.driverSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchDriver(id));
    }
  }, [dispatch, id]);

  if (loading || !driver) {
    return <Typography>Đang tải...</Typography>;
  }

  const getVehicleTypeDisplay = (type: VehicleType) => {
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
    return displayNames[type] || type;
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.DRIVER.INDEX)}>
            Quay lại danh sách
          </Button>
          <Typography variant="h5">Chi tiết tài xế</Typography>
        </Stack>
        <Button variant="contained" startIcon={<EditOutlined />} onClick={() => navigate(`${TOURISM_COMPANY_URLs.DRIVER.UPDATE}/${id}`)}>
          Chỉnh sửa
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Tên tài xế
                </Typography>
                <Typography>{driver.driverName}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Số điện thoại
                </Typography>
                <Typography>{driver.phoneNumber}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Loại xe
                </Typography>
                <Typography>{getVehicleTypeDisplay(driver.vehicleType)}</Typography>
              </Stack>
            </Grid>

            {driver.imgs && driver.imgs.length > 0 && (
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Hình ảnh
                  </Typography>
                  <Grid container spacing={2}>
                    {driver.imgs.map((img, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <img src={img} alt={`Driver ${index + 1}`} style={{ width: '100%', borderRadius: 8 }} />
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DriverDetails;
