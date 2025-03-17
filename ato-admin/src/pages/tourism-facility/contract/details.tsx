import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Grid, Stack, Typography, Box, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { fetchContract } from '../../../redux/tourism-facility/contract.slice';
import { RootState } from '../../../redux/store';

const ContractDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const { specific: contract, loading } = useSelector((state: RootState) => state.contractSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchContract(Number(id)));
    }
  }, [dispatch, id]);

  if (loading || !contract) {
    return <Typography>Đang tải...</Typography>;
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
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.CONTRACT.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Chi tiết hợp đồng</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin hợp đồng
              </Typography>
              <DetailItem label="Mã hợp đồng" value={contract.contractId} />
              <DetailItem label="Công ty du lịch" value={contract.company?.companynName} />
              <DetailItem label="Tỷ lệ chiết khấu" value={`${contract.discountRate}%`} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin thời gian
              </Typography>
              <DetailItem label="Ngày bắt đầu" value={dayjs(contract.startDate).format('DD/MM/YYYY')} />
              <DetailItem label="Ngày kết thúc" value={dayjs(contract.endDate).format('DD/MM/YYYY')} />
              <DetailItem label="Ngày ký" value={contract.signedDate ? dayjs(contract.signedDate).format('DD/MM/YYYY') : 'Chưa ký'} />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Nội dung hợp đồng
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {contract.contractContent}
              </Typography>
            </Grid>

            {contract.contractImgs && contract.contractImgs.length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Hình ảnh hợp đồng
                </Typography>
                <Grid container spacing={2}>
                  {contract.contractImgs.map((img, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Box
                        component="img"
                        src={img}
                        alt={`Contract image ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 1
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ContractDetails;
