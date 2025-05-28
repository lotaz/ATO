import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../../services/content-moderator/product.service';
import { ProductDTO_CM } from '../../../types/content-moderator/product.types';
import { ProductCategoryLabels } from '../../../types/tourism-facility/product-category.enum';
import { StatusApproval, UnitProductLabels } from '../../../types/content-moderator/certification.types';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ProductDetails = () => {
  const params = new URLSearchParams(location.search);
  const productId = params.get('id');
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDTO_CM | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<StatusApproval | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!productId) return;

        const data = await productService.getProduct(productId);
        setProduct(data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleApproveReject = (type: StatusApproval) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (!product) return;

      await productService.approveProduct(product.productId, {
        statusApproval: dialogType!,
        replyRequest: replyMessage
      });

      // Refresh the product data
      const updatedProduct = await productService.getProduct(product.productId);
      setProduct(updatedProduct);
      setOpenDialog(false);
      setReplyMessage('');
    } catch (err) {
      setError('Không thể cập nhật trạng thái sản phẩm');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <Stack spacing={3}>
      <Button startIcon={<ArrowLeftIcon />} onClick={() => navigate(-1)} sx={{ alignSelf: 'flex-start' }}>
        Quay lại
      </Button>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Chi tiết sản phẩm</Typography>
            <Chip label={getStatusLabel(product.statusApproval)} color={getStatusColor(product.statusApproval)} />
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DetailItem label="Tên sản phẩm" value={product.productName} />
              <DetailItem label="Danh mục" value={ProductCategoryLabels[product.productCategory]} />
              <DetailItem label="Giá" value={product.price ? `${product.price.toFixed(2)} VND` : '-'} />
              <DetailItem label="Mô tả" value={product.description || 'Không có thông tin'} />
              <DetailItem label="Thông tin bổ sung" value={product.additional || 'Không có thông tin'} />
            </Grid>

            <Grid item xs={12} md={6}>
              <DetailItem label="Loại dinh dưỡng" value={product.nutritionType || 'Không có thông tin'} />
              <DetailItem label="Thành phần" value={product.ingredient || 'Không có thông tin'} />
              <DetailItem label="Khối lượng" value={product.volume || 'Không có thông tin'} />
              <DetailItem label="Đơn vị" value={product.unitProduct ? UnitProductLabels[product.unitProduct] : '-'} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Hình ảnh sản phẩm
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {product.imgs.map((img, index) => (
                  <Box key={index} sx={{ width: 100, height: 100 }}>
                    <img src={img} alt={`Product ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Grid>

            {product.replyRequest && (
              <Grid item xs={12}>
                <DetailItem label="Phản hồi từ quản trị" value={product.replyRequest} />
              </Grid>
            )}
          </Grid>

          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Button variant="contained" color="success" onClick={() => handleApproveReject(StatusApproval.Approved)}>
              Phê duyệt
            </Button>
            <Button variant="contained" color="error" onClick={() => handleApproveReject(StatusApproval.Reject)}>
              Từ chối
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{dialogType === StatusApproval.Approved ? 'Phê duyệt sản phẩm' : 'Từ chối sản phẩm'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nhập phản hồi (tùy chọn)"
            fullWidth
            variant="standard"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

const DetailItem = ({ label, value, icon }: { label: string; value: any; icon?: React.ReactNode }) => (
  <Box sx={{ py: 1.5 }}>
    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
      {icon && <Box sx={{ color: 'primary.main' }}>{icon}</Box>}
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
    <Typography
      sx={{
        maxHeight: 200,
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        pl: icon ? 3 : 0
      }}
      variant="body1"
    >
      {value || '-'}
    </Typography>
    <Divider sx={{ mt: 1.5 }} />
  </Box>
);

export default ProductDetails;
