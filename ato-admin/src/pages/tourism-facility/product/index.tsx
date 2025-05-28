import { EditOutlined, EyeOutlined, PlusOutlined, ShopOutlined, HomeOutlined, NumberOutlined } from '@ant-design/icons';
// Add CardMedia to imports
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import type { RootState } from '../../../redux/store';
import { fetchProducts } from '../../../redux/tourism-facility/product.slice';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';
import { get } from '../../../helpers/axios-helper';
import { enqueueSnackbar } from 'notistack';
interface Notification {
  message: string;
}
const ProductList = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.productSlice);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1); // Starting from 1 for better UX
  const [rowsPerPage] = useState(8); // Adjusted for grid layout
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const filteredProducts =
    products?.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchText.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  const currentProducts = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / rowsPerPage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await get('/general/ocop-notification');
        if (response.data && response.data.length > 0) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((noti) => {
        enqueueSnackbar(noti.message, {
          variant: 'warning'
        });
      });
    }
  }, [notifications]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm sản phẩm" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PRODUCT.CREATE)}>
          Thêm sản phẩm
        </Button>
      </Stack>

      {products && products.length > 0 ? (
        <>
          {currentProducts.length > 0 ? (
            <>
              <Grid container spacing={0}>
                {currentProducts.map((product) => (
                  <Grid sx={{ paddingRight: 2, paddingBottom: 2 }} item xs={12} sm={6} md={4} lg={3} key={product.productId}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          boxShadow: 6,
                          transition: 'all 0.3s ease-in-out',
                          transform: 'translateY(-4px)'
                        },
                        position: 'relative',
                        overflow: 'visible'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.imgs?.[0] || '/default-product.png'} // Make sure to add a default product image
                        alt={product.productName}
                        sx={{
                          objectFit: 'cover',
                          borderBottom: '1px solid',
                          borderColor: 'divider'
                        }}
                      />

                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          borderRadius: '4px',
                          px: 1,
                          py: 0.5,
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        ID: {product.productId.slice(-3)}
                      </Box>

                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 2 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          noWrap
                          title={product.productName}
                          sx={{
                            borderBottom: '2px solid',
                            borderColor: 'primary.main',
                            pb: 1,
                            mb: 2
                          }}
                        >
                          {product.productName}
                        </Typography>

                        <Stack spacing={2} sx={{ flex: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <ShopOutlined style={{ color: '#666' }} />
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Nhà sản xuất
                              </Typography>
                              <Typography variant="body1" noWrap title={product.manufacturer}>
                                {product.manufacturer}
                              </Typography>
                            </Box>
                          </Stack>

                          <Stack direction="row" alignItems="center" spacing={1}>
                            <HomeOutlined style={{ color: '#666' }} />
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Nguồn gốc
                              </Typography>
                              <Typography variant="body1" noWrap>
                                {product.origin}
                              </Typography>
                            </Box>
                          </Stack>

                          <Stack direction="row" alignItems="center" spacing={1}>
                            <NumberOutlined style={{ color: '#666' }} />
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Số lượng
                              </Typography>
                              <Typography variant="body1">{product.unitProduct}</Typography>
                            </Box>
                          </Stack>

                          <Box sx={{ mt: 'auto' }}>
                            <Chip
                              label={ProductCategoryLabels[product.productCategory as ProductCategory]}
                              color="primary"
                              size="small"
                              sx={{
                                alignSelf: 'flex-start',
                                bgcolor: 'primary.light',
                                '& .MuiChip-label': {
                                  fontWeight: 500
                                }
                              }}
                            />
                          </Box>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                          sx={{
                            mt: 2,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${product.productId}`)}
                            sx={{
                              color: 'info.main',
                              '&:hover': { bgcolor: 'info.lighter' }
                            }}
                          >
                            <EyeOutlined />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.UPDATE}?productId=${product.productId}`)}
                            sx={{
                              color: 'warning.main',
                              '&:hover': { bgcolor: 'warning.lighter' }
                            }}
                          >
                            <EditOutlined />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box display="flex" justifyContent="center">
                <Pagination count={pageCount} page={page} onChange={(_, newPage) => setPage(newPage)} color="primary" />
              </Box>
            </>
          ) : (
            <Stack alignItems="center" justifyContent="center" py={3}>
              <Typography variant="body1" color="text.secondary">
                Không tìm thấy sản phẩm phù hợp với từ khóa tìm kiếm
              </Typography>
            </Stack>
          )}
        </>
      ) : (
        <NoDataDisplay />
      )}
    </Stack>
  );
};

export default ProductList;
