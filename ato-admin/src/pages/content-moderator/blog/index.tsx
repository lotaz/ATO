import { DeleteOutlined, EditOutlined, EyeFilled, PlusOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Stack, TablePagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import Loader from '../../../components/Loader';
import AppSearchBar from '../../../components/table/SearchBar';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { getBlogs, getBlogStatusText, getBlogTypeText } from '../../../redux/blogSlice';
import { RootState } from '../../../redux/store';
import { BlogStatus } from '../../../services/blog/types';

const BlogList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const { blogs, loading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  console.log('blogs', blogs);

  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || blog?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getImageUrl = (linkImg: string) => {
    if (!linkImg) return '';

    // If it's a full URL (e.g. from Firebase storage), use it directly
    if (linkImg.startsWith('http')) {
      return linkImg;
    }

    // If it's a relative path from uploads folder, construct the full URL
    if (linkImg.includes('/uploads/')) {
      return `https://localhost:8081${linkImg}`;
    }

    // Default case - return the link as is
    return linkImg;
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm tin tức..." onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(CONTENT_MODERATOR_URLs.BLOG.CREATE)}>
          Thêm mới
        </Button>
      </Stack>
      <AppCard>
        <Stack spacing={3}>
          <Box>
            <Grid container spacing={3}>
              {filteredBlogs?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.blogId}>
                  <Card>
                    <CardMedia component="img" height="200" image={getImageUrl(blog.linkImg)} alt={blog.title} />
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h6" noWrap>
                          {blog.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {blog.description}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={getBlogStatusText(blog.blogStatus)}
                              color={blog.blogStatus === BlogStatus.Approval ? 'success' : 'default'}
                              size="small"
                            />
                            <Chip label={getBlogTypeText(blog.blogType)} variant="outlined" size="small" />
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" onClick={() => navigate(`${CONTENT_MODERATOR_URLs.BLOG.DETAILS}?id=${blog.blogId}`)}>
                              <EyeFilled />
                            </IconButton>
                            <IconButton size="small" onClick={() => navigate(`${CONTENT_MODERATOR_URLs.BLOG.UPDATE}?id=${blog.blogId}`)}>
                              <EditOutlined />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {filteredBlogs?.length === 0 && <Typography mt={2}>Không tìm thấy tin tức</Typography>}

            {filteredBlogs?.length > 0 && (
              <TablePagination
                component="div"
                count={filteredBlogs.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[6, 12, 24]}
                labelRowsPerPage="Số tin tức mỗi trang:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
                sx={{ mt: 3 }}
              />
            )}
          </Box>
        </Stack>
      </AppCard>
    </Stack>
  );
};

export default BlogList;
