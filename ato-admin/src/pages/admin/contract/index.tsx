import { PlusOutlined, EditOutlined, CalendarOutlined, PercentageOutlined, BankOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Chip, IconButton, Stack, Grid, Typography, Box, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { RootState } from '../../../redux/store';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { Contract, SigningStatus } from '../../../types/admin/contract.types';
import { fetchContracts } from '../../../redux/admin/contract.slice';
import AppSearchBar from '../../../components/table/SearchBar';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const getSigningStatusInfo = (status: SigningStatus) => {
  switch (status) {
    case SigningStatus.New:
      return { label: 'Mới', color: 'default' };
    case SigningStatus.Signed:
      return { label: 'Đã ký', color: 'success' };
    case SigningStatus.RequestExtend:
      return { label: 'Yêu cầu gia hạn', color: 'warning' };
    case SigningStatus.ApprovedExtend:
      return { label: 'Đã duyệt gia hạn', color: 'info' };
    case SigningStatus.AboutToEnd:
      return { label: 'Sắp hết hạn', color: 'warning' };
    case SigningStatus.Ended:
      return { label: 'Đã hết hạn', color: 'error' };
    case SigningStatus.Rejected:
      return { label: 'Đã từ chối', color: 'error' };
    default:
      return { label: 'Không xác định', color: 'default' };
  }
};

const ContractList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { list: contracts, loading } = useSelector((state: RootState) => state.contractSlice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, _] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<SigningStatus | 'all'>('all');
  const [entityFilter, setEntityFilter] = useState<'company' | 'facility' | 'all'>('all');

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  const filteredContracts = contracts.filter((contract: Contract) => {
    const matchesSearch =
      contract.contractId?.toString().includes(searchTerm) ||
      (contract.tourCompany?.companynName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contract.touristFacility?.touristFacilityName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.discountRate?.toString().includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || contract.signingStatus === statusFilter;

    const matchesEntity =
      entityFilter === 'all' ||
      (entityFilter === 'company' && contract.tourCompany) ||
      (entityFilter === 'facility' && contract.touristFacility);

    return matchesSearch && matchesStatus && matchesEntity;
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <AppSearchBar placeholder="Tìm kiếm hợp đồng" onChange={(e) => setSearchTerm(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select value={statusFilter} label="Trạng thái" onChange={(e) => setStatusFilter(e.target.value as SigningStatus | 'all')}>
              <MenuItem value="all">Tất cả</MenuItem>
              {Object.values([0, 1, 2, 3, 4, 5, 6]).map((status) => (
                <MenuItem key={status} value={status}>
                  {getSigningStatusInfo(status).label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Loại hợp đồng</InputLabel>
            <Select
              value={entityFilter}
              label="Loại hợp đồng"
              onChange={(e) => setEntityFilter(e.target.value as 'company' | 'facility' | 'all')}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="company">Công ty du lịch</MenuItem>
              <MenuItem value="facility">Cơ sở du lịch</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(ADMIN_URLs.CONTRACT.CREATE)}>
          Tạo hợp đồng mới
        </Button>
      </Stack>

      {loading && (
        <Box textAlign="center">
          <Typography>Đang tải...</Typography>
        </Box>
      )}

      {!loading && filteredContracts.length === 0 && (
        <Box textAlign="center">
          <Typography>Không tìm thấy hợp đồng nào</Typography>
        </Box>
      )}

      {contracts.length > 0 && (
        <>
          <Grid container spacing={0}>
            {filteredContracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contract) => {
              const statusInfo = getSigningStatusInfo(contract.signingStatus);
              return (
                <Grid sx={{ paddingBottom: 2, paddingRight: 2 }} item xs={12} sm={6} md={4} key={contract.contractId}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6">Mã HĐ: {contract.contractId}</Typography>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`${ADMIN_URLs.CONTRACT.UPDATE}?id=${contract.contractId}`)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white'
                              }
                            }}
                          >
                            <EditOutlined />
                          </IconButton>
                        </Stack>

                        {contract.tourCompany?.companynName && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BankOutlined style={{ color: '#666' }} />
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Công ty du lịch
                              </Typography>
                              <Typography>{contract.tourCompany?.companynName}</Typography>
                            </Box>
                          </Box>
                        )}

                        {contract.touristFacility?.touristFacilityName && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HomeOutlined style={{ color: '#666' }} />
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Cơ sở du lịch
                              </Typography>
                              <Typography>{contract.touristFacility?.touristFacilityName}</Typography>
                            </Box>
                          </Box>
                        )}

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PercentageOutlined style={{ color: '#666' }} />
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Chiết khấu
                              </Typography>
                              <Typography>{contract.discountRate}%</Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={statusInfo.label}
                            color={statusInfo.color as any}
                            size="small"
                            sx={{
                              fontWeight: 500,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                          />
                        </Stack>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarOutlined style={{ color: '#666' }} />
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                              Thời hạn
                            </Typography>
                            <Typography>
                              {dayjs(contract.startDate).format('DD/MM/YYYY')} - {dayjs(contract.endDate).format('DD/MM/YYYY')}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredContracts.length / rowsPerPage)}
              page={page + 1}
              onChange={(_, newPage) => setPage(newPage - 1)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ContractList;
