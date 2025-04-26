import { CalendarOutlined, DollarOutlined, EyeOutlined, ShopOutlined } from '@ant-design/icons';
import { Box, Card, CardContent, Chip, Grid, IconButton, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { productService } from '../../../services/content-moderator/product.service';
import { StatusApproval } from '../../../types/content-moderator/certification.types';
import { ProductDTO_CM } from '../../../types/content-moderator/product.types';
import { ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';

const ProductList = () => {
  const [products, setProducts] = useState<ProductDTO_CM[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getStatusColor = (status: StatusApproval) => {
    switch (status) {
      case StatusApproval.Approved:
        return 'success';
      case StatusApproval.Processing:
        return 'warning';
      case StatusApproval.Reject:
        return 'error';
      case StatusApproval.Update:
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: StatusApproval) => {
    switch (status) {
      case StatusApproval.Approved:
        return 'Đã duyệt';
      case StatusApproval.Processing:
        return 'Đang xử lý';
      case StatusApproval.Reject:
        return 'Từ chối';
      case StatusApproval.Update:
        return 'Cần cập nhật';
      default:
        return 'Không xác định';
    }
  };

  const [statusFilter, setStatusFilter] = useState<StatusApproval | 'all'>(StatusApproval.Processing);

  // Update filteredProducts calculation
  const filteredProducts = products.filter(
    (product) =>
      (product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        (product.touristFacility?.touristFacilityName.toLowerCase().includes(searchText.toLowerCase()) ?? false)) &&
      (statusFilter === 'all' || product.statusApproval === statusFilter)
  );

  // Update the search bar section

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" gap={4} alignItems="center" mb={2}>
        <AppSearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          sx={{ flex: 1, mr: 2 }}
        />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusApproval | 'all')} sx={{ minWidth: 180 }}>
          <MenuItem value="all">Tất cả trạng thái</MenuItem>
          <MenuItem value={StatusApproval.Approved}>Đã duyệt</MenuItem>
          <MenuItem value={StatusApproval.Processing}>Đang xử lý</MenuItem>
          <MenuItem value={StatusApproval.Reject}>Từ chối</MenuItem>
          <MenuItem value={StatusApproval.Update}>Cần cập nhật</MenuItem>
        </Select>
      </Stack>

      {filteredProducts.length > 0 ? (
        <>
          <Grid container spacing={0}>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.productId} sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" noWrap sx={{ maxWidth: '70%' }}>
                          {product.productName}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(CONTENT_MODERATOR_URLs.PRODUCT.DETAILS + '?id=' + product.productId)}
                        >
                          <EyeOutlined />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ShopOutlined />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {product.touristFacility?.touristFacilityName || '-'}
                        </Typography>
                      </Stack>

                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <DollarOutlined />
                          <Typography variant="body2">{product.price ? `${product.price.toLocaleString()} VND` : '-'}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarOutlined />
                          <Typography variant="body2">{new Date(product.createDate).toLocaleDateString('vi-VN')}</Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip label={ProductCategoryLabels[product.productCategory]} size="small" variant="outlined" />
                        <Chip label={getStatusLabel(product.statusApproval)} color={getStatusColor(product.statusApproval)} size="small" />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredProducts.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box mt={4}>
          <Typography>Không tìm thấy sản phẩm cần duyệt</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default ProductList;
