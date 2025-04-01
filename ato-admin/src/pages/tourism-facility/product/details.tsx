import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImageCarousel } from '../../../components/carousel/ImageCarousel';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchCertificates } from '../../../redux/tourism-facility/certificate.slice';
import { fetchProduct } from '../../../redux/tourism-facility/product.slice';
// import { fetchVariations } from '../../../redux/tourism-facility/variation.slice';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';
import { fetchOCOPSells } from '../../../redux/tourism-facility/ocop-sell.slice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const ProductDetails = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('productId');
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [tabValue, setTabValue] = useState(0);

  const { product, loading: productLoading } = useSelector((state: RootState) => state.productSlice);
  const { certificates, loading: certificateLoading } = useSelector((state: RootState) => state.certificateSlice);

  // Add to component state
  const { list: ocopSells, loading: ocopSellLoading } = useSelector((state: RootState) => state.ocopSellSlice);

  // Add to useEffect
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      dispatch(fetchCertificates(id));
      dispatch(fetchOCOPSells(id));
    }
  }, [dispatch, id]);

  if (productLoading || !product) return <div>Loading...</div>;

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ py: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.PRODUCT.INDEX)}>
          Trở về danh sách sản phẩm
        </Button>
      </Stack>

      {/* Add Certificate Management Section */}
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
              <Tab label="Thông tin sản phẩm" />
              <Tab label="Chứng chỉ" />
              <Tab label="Đợt bán OCOP" />
            </Tabs>
          </Box>

          {/* Product Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box>
              <Grid container spacing={3}>
                {/* Product Images */}
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                    Ảnh sản phẩm
                  </Typography>
                  <ImageCarousel images={product.imgs || []} />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Basic Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                    Thông tin cơ bản
                  </Typography>
                  <DetailItem label="Tên sản phẩm" value={product.productName} />
                  <DetailItem
                    label="Danh mục"
                    value={<Chip label={ProductCategoryLabels[product.productCategory as ProductCategory]} color="primary" size="small" />}
                  />
                  <DetailItem label="Số lượng" value={product.unitProduct} />
                </Grid>

                {/* Manufacturer Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                    Thông tin sản xuất
                  </Typography>
                  <DetailItem label="Nhà sản xuất" value={product.manufacturer} />
                  <DetailItem label="Địa chỉ" value={product.addressManufacturer} />
                  <DetailItem label="Nguồn gốc" value={product.origin} />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12}>
                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                      Thông tin sản phẩm
                    </Typography>
                    <DetailItem label="Mô tả" value={product.description} />
                    <DetailItem label="Loại dinh dưỡng" value={product.nutritionType} />
                    <DetailItem label="Tuổi" value={product.age} />
                    <DetailItem label="Thành phần" value={product.ingredient} />
                    <DetailItem label="Khối lượng" value={product.volume} />
                    <DetailItem label="Thông tin thêm" value={product.additional} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Certificates Tab */}
          <TabPanel value={tabValue} index={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={'bold'}>
                Chứng chỉ sản phẩm
              </Typography>
              <Button
                variant="contained"
                startIcon={<PlusOutlined />}
                onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.CREATE_CERTIFICATE}?productId=${id}`)}
              >
                Thêm chứng chỉ
              </Button>
            </Stack>

            {certificateLoading ? (
              <div>Loading certificates...</div>
            ) : certificates && certificates.length > 0 ? (
              <Grid container spacing={2}>
                {certificates.map((cert) => (
                  <Grid item xs={12} md={6} key={cert.certificationId}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {cert.certificationName}
                          </Typography>
                          <Chip
                            label={cert.statusApproval ? 'Đã duyệt' : 'Chưa duyệt'}
                            color={cert.statusApproval ? 'success' : 'warning'}
                            size="small"
                          />
                        </Stack>
                        <DetailItem label="Tổ chức cấp" value={cert.issuingOrganization} />
                        <DetailItem label="Ngày cấp" value={dayjs(cert.issueDate).format('DD/MM/YYYY')} />
                        {cert.expiryDate && <DetailItem label="Ngày hết hạn" value={dayjs(cert.expiryDate).format('DD/MM/YYYY')} />}
                        <Stack direction="row" spacing={1} mt={2}>
                          <Button
                            size="small"
                            onClick={() =>
                              navigate(`${TOURISM_FACILITY_URLs.PRODUCT.VIEW_CERTIFICATE}?id=${cert.certificationId}&productId=${id}`)
                            }
                          >
                            Chi tiết
                          </Button>
                          <Button
                            size="small"
                            onClick={() =>
                              navigate(`${TOURISM_FACILITY_URLs.PRODUCT.UPDATE_CERTIFICATE}?id=${cert.certificationId}&productId=${id}`)
                            }
                          >
                            Cập nhật
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={3}>
                <Typography color="text.secondary">Chưa có chứng chỉ nào</Typography>
              </Box>
            )}
          </TabPanel>

          {/* Variations Tab */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              {/* OCOP Sales Section */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={'bold'}>
                    Đợt bán OCOP
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PlusOutlined />}
                    onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.OCOP_SELL.CREATE(id!)}`)}
                  >
                    Thêm đợt bán
                  </Button>
                </Stack>

                {ocopSellLoading ? (
                  <div>Loading OCOP sales...</div>
                ) : ocopSells && ocopSells.length > 0 ? (
                  <Grid container spacing={2}>
                    {ocopSells.map((sale: any) => (
                      <Grid item xs={12} md={6} key={sale.ocopSellId}>
                        <Card variant="outlined">
                          <CardContent>
                            <Stack spacing={2}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1" fontWeight="bold">
                                  Đợt bán {dayjs(sale.createDate).format('DD/MM/YYYY')}
                                </Typography>
                                <Chip
                                  label={dayjs(sale.expiryDate).isAfter(dayjs()) ? 'Còn hạn' : 'Hết hạn'}
                                  color={dayjs(sale.expiryDate).isAfter(dayjs()) ? 'success' : 'error'}
                                  size="small"
                                />
                              </Stack>
                              <DetailItem label="Số lượng bán" value={`${sale.sellVolume} sản phẩm`} />
                              <DetailItem label="Giá bán" value={`${sale.salePrice?.toLocaleString('vi-VN')} đ`} />
                              <DetailItem label="Ngày sản xuất" value={dayjs(sale.manufacturingDate).format('DD/MM/YYYY')} />
                              <DetailItem label="Ngày hết hạn" value={dayjs(sale.expiryDate).format('DD/MM/YYYY')} />
                              <Stack direction="row" spacing={1}>
                                <Button
                                  size="small"
                                  onClick={() => navigate(`${TOURISM_FACILITY_URLs.PRODUCT.OCOP_SELL.UPDATE(id!, sale.ocopSellId)}`)}
                                >
                                  Cập nhật
                                </Button>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box textAlign="center" py={3}>
                    <Typography color="text.secondary">Chưa có đợt bán OCOP nào</Typography>
                  </Box>
                )}
              </Box>
            </Stack>
          </TabPanel>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProductDetails;
