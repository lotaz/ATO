import { EditOutlined, EnvironmentOutlined, EyeOutlined, HomeOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Grid, IconButton, Pagination, Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchAccommodations } from '../../../redux/tourism-company/accommodation.slice';

const AccommodationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { accommodations } = useSelector((state: RootState) => state.accommodationSlice);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleViewDetails = (id: string) => {
    navigate(`${TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS.replace(':id', id)}`);
  };

  const handleUpdate = (id: string) => {
    navigate(`${TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE.replace(':id', id)}`);
  };

  const filteredAccommodations = accommodations.filter(
    (acc) =>
      acc.accommodationName.toLowerCase().includes(searchText.toLowerCase()) ||
      acc.address.toLowerCase().includes(searchText.toLowerCase()) ||
      acc.phoneNumber.includes(searchText)
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm nhà nghỉ" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE)}>
          Thêm nhà nghỉ
        </Button>
      </Stack>

      <Grid container spacing={0}>
        {filteredAccommodations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((acc) => (
          <Grid sx={{ paddingRight: 2, paddingBottom: 2 }} item xs={12} sm={6} md={4} lg={3} key={acc.accommodationId}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(-4px)'
                }
              }}
            >
              {acc.imgs && acc.imgs.length > 0 ? (
                <Box
                  sx={{
                    height: 160,
                    position: 'relative',
                    '& img': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }
                  }}
                >
                  <img src={acc.imgs[0]} alt={acc.accommodationName} />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 160,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.lighter',
                    color: 'primary.main'
                  }}
                >
                  <HomeOutlined style={{ fontSize: 64 }} />
                </Box>
              )}

              <CardContent sx={{ padding: 2, position: 'relative' }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetails(acc.accommodationId)}
                    sx={{
                      color: 'info.main',
                      '&:hover': { bgcolor: 'info.lighter' }
                    }}
                  >
                    <EyeOutlined />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdate(acc.accommodationId)}
                    sx={{
                      color: 'warning.main',
                      '&:hover': { bgcolor: 'warning.lighter' }
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                </Stack>

                <Stack spacing={1.5} alignItems="center">
                  <Typography variant="subtitle1" align="center" noWrap title={acc.accommodationName}>
                    {acc.accommodationName}
                  </Typography>

                  <Rating value={acc.star} readOnly size="small" />

                  <Stack spacing={1} width="100%">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneOutlined style={{ color: '#666', fontSize: '14px' }} />
                      <Typography variant="body2" noWrap>
                        {acc.phoneNumber}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <EnvironmentOutlined style={{ color: '#666', fontSize: '14px', marginTop: '4px' }} />
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {acc.address}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredAccommodations.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          color="primary"
        />
      </Box>
    </Stack>
  );
};

export default AccommodationList;
