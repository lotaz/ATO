import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageCarousel } from '../../../components/carousel/ImageCarousel';
import { get, post } from '../../../helpers/axios-helper';
import { certificationService } from '../../../services/content-moderator/certification.service';
import { StatusApproval } from '../../../types/content-moderator/certification.types';
import { FacilityCertification } from '../../../types/tourism-facility/certificate.types';

const CertificationDetails = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const navigate = useNavigate();
  const [certification, setCertification] = useState<FacilityCertification | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<StatusApproval | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  useEffect(() => {
    const fetchCertification = async () => {
      try {
        setLoading(true);
        if (!id) return;

        const response = await get(`/facility-certifications/${id}`);
        console.log(response.data);
        // Set the fetched certification data to the state variab
        setCertification(response.data);
      } catch (err) {
        setError('Failed to fetch certification details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertification();
  }, [id]);
  const handleApproveReject = (type: StatusApproval) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (!certification) return;

      const endpoint =
        dialogType === StatusApproval.Approved
          ? `/facility-certifications/${certification.certificationId}/approve`
          : `/facility-certifications/${certification.certificationId}/reject`;

      await post(endpoint, { reply: replyMessage });

      // Refresh the certification data
      const response = await get(`/facility-certifications/${certification.certificationId}`);
      setCertification(response.data);
      setOpenDialog(false);
      setReplyMessage('');
    } catch (err) {
      setError('Failed to update certification status');
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!certification) return <div>Không tìm thấy chứng chỉ</div>;

  return (
    <Stack spacing={3}>
      <Button startIcon={<ArrowLeftIcon />} onClick={() => navigate(-1)} sx={{ alignSelf: 'flex-start' }}>
        Quay lại
      </Button>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Chi tiết chứng chỉ</Typography>
            <Chip label={getStatusLabel(certification.statusApproval)} color={getStatusColor(certification.statusApproval)} />
          </Stack>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Hình ảnh chứng chỉ
            </Typography>
            <ImageCarousel images={certification.imgs || []} />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DetailItem label="Tên chứng chỉ" value={certification.certificationName} />
              <DetailItem label="Ngày cấp" value={dayjs(certification.issueDate).format('DD/MM/YYYY')} />
              <DetailItem
                label="Ngày hết hạn"
                value={certification.expiryDate ? dayjs(certification.expiryDate).format('DD/MM/YYYY') : '-'}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {certification.touristFacility && (
                <DetailItem label="Cơ sở du lịch" value={certification.touristFacility.touristFacilityName} />
              )}
            </Grid>

            <Grid item xs={12}>
              <DetailItem label="Chi tiết chứng chỉ" value={certification.certificationDetails || 'Không có thông tin'} />
            </Grid>

            {certification.replyRequest && (
              <Grid item xs={12}>
                <DetailItem label="Phản hồi từ quản trị" value={certification.replyRequest} />
              </Grid>
            )}
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
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
        <DialogTitle>{dialogType === StatusApproval.Approved ? 'Phê duyệt chứng chỉ' : 'Từ chối chứng chỉ'}</DialogTitle>
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

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <Box sx={{ py: 1 }}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || '-'}</Typography>
    <Divider sx={{ mt: 1 }} />
  </Box>
);

export default CertificationDetails;
