import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import dayjs from 'dayjs';

const TourGuideDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tourGuide, setTourGuide] = useState<TourGuideResponse | null>(null);

  useEffect(() => {
    if (id) {
      fetchTourGuide(id);
    }
  }, [id]);

  const fetchTourGuide = async (guideId: string) => {
    try {
      const response = await tourGuideService.getTourGuide(guideId);
      setTourGuide(response);
    } catch (error) {
      console.error('Failed to fetch tour guide:', error);
    }
  };

  if (!tourGuide) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
            Quay lại danh sách
          </Button>
          <Typography variant="h5">Chi tiết hướng dẫn viên</Typography>
        </Stack>
        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}/${id}`)}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Avatar src={tourGuide.account?.avatarURL} sx={{ width: 120, height: 120 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Họ và tên
              </Typography>
              <Typography>{tourGuide.account?.fullname}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
              <Typography>{tourGuide.account?.email}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Số điện thoại
              </Typography>
              <Typography>{tourGuide.account?.phoneNumber}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Giới thiệu
              </Typography>
              <Typography>{tourGuide.bio}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Ngôn ngữ
              </Typography>
              <Typography>{tourGuide.languages}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Chuyên môn
              </Typography>
              <Typography>{tourGuide.expertiseArea}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Đánh giá
              </Typography>
              <Typography>{tourGuide.rating.toFixed(1)}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Ngày tạo
              </Typography>
              <Typography>{dayjs(tourGuide.createDate).format('DD/MM/YYYY')}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TourGuideDetails;
