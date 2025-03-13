import { EditOutlined } from '@ant-design/icons';
import { Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tour-guide';
import { ITourGuide } from '../../../services/tour-guide/types';

const TourGuideDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tourGuide, setTourGuide] = useState<ITourGuide | null>(null);

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
        <Typography variant="h3">Thông Tin Hướng Dẫn Viên</Typography>
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}/${id}`)}
        >
          Chỉnh Sửa
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Họ Tên</Typography>
            <Typography>{tourGuide.user.fullname}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Email</Typography>
            <Typography>{tourGuide.user.email}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Số Điện Thoại</Typography>
            <Typography>{tourGuide.user.phoneNumber}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Giới Tính</Typography>
            <Typography>{tourGuide.user.gender ? 'Nam' : 'Nữ'}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Ngôn Ngữ</Typography>
            <Stack direction="row" spacing={1}>
              {tourGuide.languages.map((lang) => (
                <Chip key={lang} label={lang} />
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Kinh Nghiệm</Typography>
            <Typography>{tourGuide.languages} năm</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Ngôn ngữ</Typography>
            <Stack direction="row" spacing={2}>
              {tourGuide.languages.map((language, index) => (
                <Typography>{language} </Typography>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default TourGuideDetails;
