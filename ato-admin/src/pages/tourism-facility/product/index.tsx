import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Chip,
  IconButton,
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import type { RootState } from '../../../redux/store';
import { fetchProducts } from '../../../redux/tourism-facility/product.slice';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';

const ProductList = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.productSlice);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0); // MUI pagination starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter products based on search text
  const filteredProducts =
    products?.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchText.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  // Get current page products
  const currentProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm sản phẩm" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PRODUCT.CREATE)}>
          Thêm sản phẩm
        </Button>
      </Stack>

      <Card>
        {products && products.length > 0 ? (
          <>
            {currentProducts.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width={500}>Tên sản phẩm</TableCell>
                      <TableCell>Nhà sản xuất</TableCell>
                      <TableCell>Nguồn gốc</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Danh mục</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentProducts?.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell>
                          <Typography
                            sx={{
                              maxWidth: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {product.productName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              maxWidth: 150,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {product.manufacturer}
                          </Typography>
                        </TableCell>
                        <TableCell>{product.origin}</TableCell>
                        <TableCell>{product.unitProduct}</TableCell>
                        <TableCell>
                          <Chip label={ProductCategoryLabels[product.productCategory as ProductCategory]} color="primary" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}?productId=${product.productId}`)}
                            >
                              <EyeOutlined />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.UPDATE}?productId=${product.productId}`)}
                            >
                              <EditOutlined />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={filteredProducts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số hàng mỗi trang:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
                />
              </TableContainer>
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
      </Card>
    </Stack>
  );
};

export default ProductList;
