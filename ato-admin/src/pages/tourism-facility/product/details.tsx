import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { ProductCategory, ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';
import { RootState } from '../../../redux/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchProduct } from '../../../redux/tourism-facility/product.slice';
import { ImageCarousel } from '../../../components/carousel/ImageCarousel';

const ProductDetails = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { product, loading } = useSelector((state: RootState) => state.productSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
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
    </Stack>
  );
};

export default ProductDetails;
