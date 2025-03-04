import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';

interface NewsDetails {
  id: string;
  title: string;
  category: string;
  author: string;
  authorAvatar?: string;
  publishDate: string;
  content: string;
  image: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  tags: string[];
  readTime: string;
}

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - thay thế bằng API call sau
  const newsInfo: NewsDetails = {
    id: 'TT-001',
    title: 'Du lịch Hạ Long mùa thu - Khám phá vẻ đẹp thiên nhiên kỳ vĩ',
    category: 'Du lịch trong nước',
    author: 'Nguyễn Văn A',
    authorAvatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
    publishDate: '20/02/2024',
    content: `Vịnh Hạ Long mùa thu mang một vẻ đẹp khác biệt với nắng dịu, gió mát và những hòn đảo được bao phủ trong sương sớm mờ ảo. 
    Đây là thời điểm lý tưởng để du khách có thể tận hưởng những trải nghiệm tuyệt vời nhất tại di sản thiên nhiên thế giới này.

    Trong bài viết này, chúng tôi sẽ chia sẻ những điểm đến không thể bỏ qua, các hoạt động thú vị và những lưu ý quan trọng khi du lịch Hạ Long vào mùa thu...`,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592',
    status: 'published',
    views: 1250,
    tags: ['Du lịch', 'Hạ Long', 'Mùa thu', 'Khám phá'],
    readTime: '5 phút'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã đăng';
      case 'draft':
        return 'Bản nháp';
      case 'archived':
        return 'Đã lưu trữ';
      default:
        return status;
    }
  };

  return (
    <Stack spacing={3}>
      <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.INDEX)} sx={{ width: 'fit-content' }}>
        Quay lại danh sách
      </Button>

      <AppCard>
        <Stack spacing={3}>
          {/* Header Section */}
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Stack spacing={2}>
              <Typography variant="h3">{newsInfo.title}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={newsInfo.category} color="primary" size="small" />
                <Chip label={getStatusText(newsInfo.status)} color={getStatusColor(newsInfo.status)} size="small" />
                <Typography variant="body2" color="textSecondary">
                  • {newsInfo.readTime} đọc
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditOutlined />}
              onClick={() => navigate(`${CONTENT_MODERATOR_URLs.BLOG.UPDATE}?id=${newsInfo.id}`)}
            >
              Chỉnh sửa
            </Button>
          </Stack>

          {/* Author Info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={newsInfo.authorAvatar} alt={newsInfo.author} sx={{ width: 48, height: 48 }} />
            <Stack spacing={0}>
              <Typography variant="subtitle1">{newsInfo.author}</Typography>
              <Typography variant="body2" color="textSecondary">
                Đăng ngày {newsInfo.publishDate} • {newsInfo.views} lượt xem
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Featured Image */}
          <Box
            component="img"
            src={newsInfo.image}
            alt={newsInfo.title}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 1
            }}
          />

          {/* Content */}
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {newsInfo.content}
          </Typography>

          <Divider />

          {/* Statistics */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thống kê
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <AppCard>
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="h4">{newsInfo.views}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Lượt xem
                    </Typography>
                  </Stack>
                </AppCard>
              </Grid>
              {/* Add more statistics cards as needed */}
            </Grid>
          </Box>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default BlogDetails;
