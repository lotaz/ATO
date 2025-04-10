import { EditOutlined } from '@ant-design/icons';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tour-guide';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import { ArrowLeftOutlined } from '@ant-design/icons';

const TourGuideDetails = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const [tourGuide, setTourGuide] = useState<TourGuideResponse | null>(null);

  useEffect(() => {
    const fetchTourGuide = async () => {
      if (id) {
        const data = await tourGuideService.getTourGuideById(id);
        setTourGuide(data);
      }
    };
    fetchTourGuide();
  }, [id]);

  if (!tourGuide) return null;

  return (
    <AppCard>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
            Quay lại
          </Button>
          <Typography variant="h3">Thông Tin Hướng Dẫn Viên</Typography>
        </Stack>
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}?id=${id}`)}
        >
          Chỉnh Sửa
        </Button>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Họ Tên</Typography>
            <Typography>{tourGuide.account?.fullname}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Email</Typography>
            <Typography>{tourGuide.account?.email}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Số Điện Thoại</Typography>
            <Typography>{tourGuide.account?.phoneNumber}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Giới Tính</Typography>
            <Typography>{tourGuide.account?.gender ? 'Nam' : 'Nữ'}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Chuyên môn</Typography>
            <Typography>{tourGuide.expertiseArea} </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Ngôn ngữ</Typography>
            <Stack direction="row" spacing={2}>
              <Typography>{tourGuide.languages} </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default TourGuideDetails;
