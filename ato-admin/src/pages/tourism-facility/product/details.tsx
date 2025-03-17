import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImageCarousel } from '../../../components/carousel/ImageCarousel';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchCertificates } from '../../../redux/tourism-facility/certificate.slice';
import { fetchProduct } from '../../../redux/tourism-facility/product.slice';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';

const ProductDetails = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('productId');
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { product, loading } = useSelector((state: RootState) => state.productSlice);
  const { certificates } = useSelector((state: RootState) => state.certificateSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      dispatch(fetchCertificates(Number(id)));
    }
  }, [dispatch, id]);

  if (loading || !product) {
    return <div>Loading...</div>;
  }

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

      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Add Certificate Management Section */}
      <Card>
        <CardContent>
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

          {certificates && certificates.length > 0 ? (
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
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProductDetails;
