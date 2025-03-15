import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, CardMedia, Grid, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { getCompanies } from '../../../redux/companySlice';
import { RootState } from '../../../redux/store';
import { Company } from '../../../services/company/types';
import { NoDataDisplay } from '../../../components/no-data/NoDataDisplay';
import { filterCompanies } from '../../../utils/filters';
import { Avatar, Tooltip } from '@mui/material';

const CompanyList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<any>();
  const companies = useSelector((state: RootState) => state.company.data) as any as Company[] | undefined;

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const CompanyCard = ({ company }: { company: Company }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={company.logoURL}
        alt={company.companynName}
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
              {company.companynName}
            </Typography>
            {company.account ? (
              <Tooltip title={`Người phụ trách: ${company.account.fullname}`}>
                <Avatar src={company.account.avatarURL} alt={company.account.fullname} sx={{ width: 32, height: 32 }} />
              </Tooltip>
            ) : (
              <Tooltip title="Chưa có người phụ trách">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>-</Avatar>
              </Tooltip>
            )}
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Ngày thành lập:</strong> {company.createDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {company.emailCompany}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>
                Website:{' '}
                <a target="_blank" href={company.website}>
                  {company.website}
                </a>
              </strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Địa chỉ:</strong> {company.addressCompany}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              onClick={() => navigate(`${ADMIN_URLs.COMPANY.DETAILS}?id=${company.tourCompanyId}`)}
              size="small"
              variant="outlined"
              color="primary"
            >
              Chi tiết
            </Button>
            <Button
              onClick={() => navigate(`${ADMIN_URLs.COMPANY.UPDATE}?id=${company.tourCompanyId}`)}
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

  const filteredCompanies = companies ? filterCompanies(companies, searchTerm) : [];

  return (
    <Stack direction={'column'}>
      <MuiCard sx={{ padding: '15px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <OutlinedInput
            size="small"
            placeholder="Tìm kiếm công ty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            }
            sx={{ minWidth: 300 }}
          />
          <Button variant="contained" color="primary" startIcon={<PlusOutlined />} onClick={() => navigate(ADMIN_URLs.COMPANY.CREATE)}>
            Thêm mới
          </Button>
        </Stack>
      </MuiCard>

      <Grid container spacing={3} mt={1}>
        {filteredCompanies.map((company) => (
          <Grid item xs={12} sm={6} md={3} key={company.tourCompanyId}>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>
      {filteredCompanies.length === 0 && <NoDataDisplay />}
    </Stack>
  );
};

export default CompanyList;
