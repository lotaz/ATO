import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductDTO_CM } from '../../../types/content-moderator/product.types';
import { productService } from '../../../services/content-moderator/product.service';
import { StatusApproval } from '../../../types/content-moderator/certification.types';
import { ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';
import AppSearchBar from '../../../components/table/SearchBar';
import { CONTENT_MODERATOR_URLs } from '../../../constants/content-moderator-urls';
import { MenuItem, Select } from '@mui/material';

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
    <Stack spacing={2}>
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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Danh mục</TableCell>
                  <TableCell>Cơ sở</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{ProductCategoryLabels[product.productCategory]}</TableCell>
                    <TableCell>{product.touristFacility?.touristFacilityName || '-'}</TableCell>
                    <TableCell>{product.price ? `${product.price.toFixed(2)} VND` : '-'}</TableCell>
                    <TableCell>
                      <Chip label={getStatusLabel(product.statusApproval)} color={getStatusColor(product.statusApproval)} />
                    </TableCell>
                    <TableCell>{new Date(product.createDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ width: '120px' }}
                        onClick={() => navigate(CONTENT_MODERATOR_URLs.PRODUCT.DETAILS + '?id=' + product.productId)}
                      >
                        Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      ) : (
        <Box mt={4}>Không tìm thấy sản phẩm cần duyệt</Box>
      )}
    </Stack>
  );
};

export default ProductList;
