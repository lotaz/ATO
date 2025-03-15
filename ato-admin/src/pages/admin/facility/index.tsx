import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, CardMedia, Grid, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { getFacilities } from '../../../redux/facilitySlice';
import { RootState } from '../../../redux/store';
import { Facility } from '../../../services/facility/types';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import { Avatar, Tooltip } from '@mui/material';

const FacilityList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<any>();
  const facilities = useSelector((state: RootState) => state.facility.list);

  useEffect(() => {
    dispatch(getFacilities());
  }, [dispatch]);

  const FacilityCard = ({ facility }: { facility: Facility }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={facility.logoURL}
        alt={facility.touristFacilityName}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="div" noWrap>
              {facility.touristFacilityName}
            </Typography>
            {facility.account ? (
              <Tooltip title={`Người phụ trách: ${facility.account.fullname}`}>
                <Avatar src={facility.account.avatarURL} alt={facility.account.fullname} sx={{ width: 32, height: 32 }} />
              </Tooltip>
            ) : (
              <Tooltip title="Chưa có người phụ trách">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>-</Avatar>
              </Tooltip>
            )}
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Ngày tạo:</strong> {facility.createDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {facility.emailTouristFacility}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>
                Website:{' '}
                <a target="_blank" href={facility.website} rel="noopener noreferrer">
                  {facility.website}
                </a>
              </strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Địa chỉ:</strong> {facility.address}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              onClick={() => navigate(`${ADMIN_URLs.FACILITY.DETAILS}?id=${facility.touristFacilityId}`)}
              size="small"
              variant="outlined"
              color="primary"
            >
              Chi tiết
            </Button>
            <Button
              onClick={() => navigate(`${ADMIN_URLs.FACILITY.UPDATE}?id=${facility.touristFacilityId}`)}
              size="small"
              variant="contained"
              color="primary"
            >
              Chỉnh sửa
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  const filteredFacilities = facilities
    ? facilities.filter(
        (facility) =>
          facility.touristFacilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          facility.emailTouristFacility.toLowerCase().includes(searchTerm.toLowerCase()) ||
          facility.address?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Stack direction={'column'}>
      <MuiCard sx={{ padding: '15px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <OutlinedInput
            size="small"
            placeholder="Tìm kiếm cơ sở..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            }
            sx={{ minWidth: 300 }}
          />
          <Button variant="contained" color="primary" startIcon={<PlusOutlined />} onClick={() => navigate(ADMIN_URLs.FACILITY.CREATE)}>
            Thêm mới
          </Button>
        </Stack>
      </MuiCard>

      <Grid container spacing={3} mt={1}>
        {filteredFacilities.map((facility) => (
          <Grid item xs={12} sm={6} md={3} key={facility.touristFacilityId}>
            <FacilityCard facility={facility} />
          </Grid>
        ))}
      </Grid>
      {filteredFacilities.length === 0 && <NoDataDisplay />}
    </Stack>
  );
};

export default FacilityList;
