import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Grid, Stack, Typography, Box, Divider, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { fetchContract } from '../../../redux/admin/contract.slice';
import { RootState } from '../../../redux/store';
import { SigningStatus } from '../../../types/admin/contract.types';

const getSigningStatusInfo = (status: SigningStatus) => {
  switch (status) {
    case SigningStatus.New:
      return { label: 'New', color: 'default' };
    case SigningStatus.Signed:
      return { label: 'Signed', color: 'success' };
    case SigningStatus.RequestExtend:
      return { label: 'Extension Requested', color: 'warning' };
    case SigningStatus.ApprovedExtend:
      return { label: 'Extension Approved', color: 'info' };
    case SigningStatus.AboutToEnd:
      return { label: 'About to End', color: 'warning' };
    case SigningStatus.Ended:
      return { label: 'Ended', color: 'error' };
    case SigningStatus.Rejected:
      return { label: 'Rejected', color: 'error' };
    default:
      return { label: 'Unknown', color: 'default' };
  }
};

const ContractDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const { specific: contract, loading } = useSelector((state: RootState) => state.contractSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchContract(id));
    }
  }, [dispatch, id]);

  if (loading || !contract) {
    return <Typography>Loading...</Typography>;
  }

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ py: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  );

  const statusInfo = getSigningStatusInfo(contract.signingStatus);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(ADMIN_URLs.CONTRACT.INDEX)}>
          Back to List
        </Button>
        <Typography variant="h5">Contract Details</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Contract Information
              </Typography>
              <DetailItem label="Contract ID" value={contract.contractId} />
              <DetailItem label="Tour Company" value={contract.tourCompany?.companyName} />
              <DetailItem label="Tourist Facility" value={contract.touristFacility?.touristFacilityName} />
              <DetailItem label="Discount Rate" value={`${contract.discountRate}%`} />
              <DetailItem
                label="Status"
                value={<Chip label={statusInfo.label} color={statusInfo.color as any} size="small" sx={{ mt: 1 }} />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Time Information
              </Typography>
              <DetailItem label="Start Date" value={dayjs(contract.startDate).format('DD/MM/YYYY')} />
              <DetailItem label="End Date" value={dayjs(contract.endDate).format('DD/MM/YYYY')} />
              <DetailItem
                label="Signed Date"
                value={contract.signedDate ? dayjs(contract.signedDate).format('DD/MM/YYYY') : 'Not signed'}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Contract Content
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {contract.contractContent}
              </Typography>
            </Grid>

            {contract.contractImgs && contract.contractImgs.length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Contract Images
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
