import { BankOutlined, CalendarOutlined, EyeOutlined, HomeOutlined, PercentageOutlined } from '@ant-design/icons';
import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AppSearchBar from '../../components/table/SearchBar';
import { CONTRACT_DETAILS } from '../../constants/contract-urls';
import { get } from '../../helpers/axios-helper';
import { RootState } from '../../redux/store';
import { Role } from '../../types';
import { Contract, SigningStatus } from '../../types/admin/contract.types';
import { getSigningStatusInfo } from './common';

const ContractList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, _] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<SigningStatus | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const params = useParams();
  console.log(params.entity);

  const user: any = useSelector((state: RootState) => state.authen.user);
  const entityTarget = (user?.role as Role) === 'TourismCompanies' ? 'company' : 'facility';

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      const response = await get('/contract/' + entityTarget);
      setContracts(response.data);

      setLoading(false);
    };

    fetchContracts();
  }, []);

  const filteredContracts =
    contracts?.filter((contract: Contract) => {
      const matchesSearch =
        contract.contractId?.toString().includes(searchTerm) ||
        (contract.tourCompany?.companynName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contract.touristFacility?.touristFacilityName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.discountRate?.toString().includes(searchTerm);

      const matchesStatus = statusFilter === 'all' || contract.signingStatus === statusFilter;

      return matchesSearch && matchesStatus;
    }) || [];

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
        </Stack>
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
                          onClick={() => navigate(`${CONTRACT_DETAILS.replace(':entity', entityTarget)}?id=${contract.contractId}`)}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              color: 'white'
                            }
                          }}
                        >
                          <EyeOutlined />
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
      )}
    </Stack>
  );
};

export default ContractList;
