import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Divider, Grid, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
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

  const getVehicleTypeLabel = (type: string) => {
    const vehicleTypes: { [key: string]: string } = {
      [VehicleType.CAR_4]: 'Xe 4 chỗ',
      [VehicleType.CAR_7]: 'Xe 7 chỗ',
      [VehicleType.CAR_16]: 'Xe 16 chỗ',
      [VehicleType.CAR_29]: 'Xe 29 chỗ',
      [VehicleType.CAR_45]: 'Xe 45 chỗ',
      [VehicleType.SLEEPER_BUS_SINGLE]: 'Xe giường nằm đơn',
      [VehicleType.SLEEPER_BUS_COUPLE]: 'Xe giường nằm đôi',
      [VehicleType.FLY]: 'Máy bay'
    };
    return vehicleTypes[type] || type;
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
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(`${TOURISM_COMPANY_URLs.DRIVER.UPDATE.replace(':id', id!)}`)}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tên tài xế
              </Typography>
              <Typography>{driver.driverName}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Số điện thoại
              </Typography>
              <Typography>{driver.phoneNumber}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Loại xe
              </Typography>
              <Typography>{getVehicleTypeLabel(driver.vehicleType)}</Typography>
            </Grid>

            {driver.imgs && driver.imgs.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Hình ảnh
                  </Typography>
                  <ImageList sx={{ width: '100%' }} cols={3} rowHeight={200} gap={8}>
                    {driver.imgs.map((img, index) => (
                      <ImageListItem key={index}>
                        <img src={img} alt={`Driver ${index + 1}`} loading="lazy" style={{ height: '200px', objectFit: 'cover' }} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DriverDetails;
