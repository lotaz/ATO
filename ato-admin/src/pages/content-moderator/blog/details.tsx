import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { getBlog, getBlogStatusText, getBlogTypeText } from '../../../redux/blogSlice';
import { RootState } from '../../../redux/store';
import { BlogStatus } from '../../../services/blog/types';

const BlogDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const id = params.get('id');
  const { currentBlog: blog, loading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id]);

  if (loading || !blog) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button variant="text" startIcon={<ArrowLeftOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.INDEX)}>
          Quay lại
        </Button>
      </Stack>

      <AppCard>
        <Typography variant="h3" textAlign={'center'}>
          Chi tiết tin tức
        </Typography>
        <Stack spacing={3}>
          <Box
            sx={{
              width: '100%',
              height: 400,
              overflow: 'hidden',
              borderRadius: 1
            }}
          >
            <img
              src={blog.linkImg}
              alt={blog.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{blog.title}</Typography>
            <Button
              variant="contained"
              startIcon={<EditOutlined />}
              onClick={() => navigate(`${CONTENT_MODERATOR_URLs.BLOG.UPDATE}?id=${blog.blogId}`)}
            >
              Chỉnh sửa
            </Button>
          </Stack>

          <Divider />

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Typography variant="body1">{blog.description}</Typography>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <AppCard>
                  <Stack spacing={2}>
                    <Typography variant="h6">Thông tin</Typography>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="textSecondary">Trạng thái</Typography>
                        <Chip
                          label={getBlogStatusText(blog.blogStatus)}
                          color={blog.blogStatus === BlogStatus.Approval ? 'success' : 'default'}
                          size="small"
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="textSecondary">Loại</Typography>
                        <Typography>{getBlogTypeText(blog.blogType)}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="textSecondary">Người tạo</Typography>
                        <Typography>{blog.createByName}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="textSecondary">Ngày tạo</Typography>
                        <Typography>{new Date(blog.createDate).toLocaleDateString()}</Typography>
                      </Stack>
                      {blog.updateTime && (
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color="textSecondary">Cập nhật lần cuối</Typography>
                          <Typography>{new Date(blog.updateTime).toLocaleDateString()}</Typography>
                        </Stack>
                      )}
                      {blog.replyRequest && (
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color="textSecondary">Phản hồi</Typography>
                          <Typography>{blog.replyRequest}</Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </AppCard>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default BlogDetails;
