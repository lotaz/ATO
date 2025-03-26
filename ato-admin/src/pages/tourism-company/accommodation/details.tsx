import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchAccommodation } from '../../../redux/tourism-company/accommodation.slice';

const AccommodationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { specific: accommodation, loading } = useSelector((state: RootState) => state.accommodationSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchAccommodation(id));
    }
  }, [dispatch, id]);

  if (loading || !accommodation) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX)}>
            Quay lại danh sách
          </Button>
          <Typography variant="h5">Chi tiết nhà nghỉ</Typography>
        </Stack>
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(`${TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE.replace(':id', id)}`)}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Tên nhà nghỉ
                </Typography>
                <Typography>{accommodation.accommodationName}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Số điện thoại
                </Typography>
                <Typography>{accommodation.phoneNumber}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Địa chỉ
                </Typography>
                <Typography>{accommodation.address}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Mô tả
                </Typography>
                <Typography>{accommodation.accommodationDescription || 'Không có mô tả'}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Số sao
                </Typography>
                <Typography>{accommodation.star || 'Chưa đánh giá'}</Typography>
              </Stack>
            </Grid>

            {accommodation.imgs && accommodation.imgs.length > 0 && (
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Hình ảnh
                  </Typography>
                  <Grid container spacing={2}>
                    {accommodation.imgs.map((img, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <img src={img} alt={`Accommodation ${index + 1}`} style={{ width: '100%', borderRadius: 8 }} />
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

export default AccommodationDetails;
