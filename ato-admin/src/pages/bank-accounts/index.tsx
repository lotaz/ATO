import { useState, useEffect } from 'react';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import { get } from '../../helpers/axios-helper';
import AppSearchBar from '../../components/table/SearchBar';
import { BankAccountResponse } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BANK_URLs } from '../../constants/bank-account-urls';
// hello
const BankAccountList = () => {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState<BankAccountResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await get(`/bank-accounts/user`);
        setBankAccounts(response.data);
      } catch (error) {
        console.error('Failed to fetch bank accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankAccounts();
  }, []);

  const filteredAccounts = bankAccounts.filter(
    (account) =>
      account.bankName.toLowerCase().includes(searchText.toLowerCase()) ||
      account.accountNumber.includes(searchText) ||
      account.accountName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent={'space-between'} spacing={2}>
        <AppSearchBar
          placeholder="Tìm kiếm theo tên ngân hàng, số tài khoản hoặc tên tài khoản"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="contained" onClick={() => navigate(BANK_URLs.CREATE)} sx={{ whiteSpace: 'nowrap' }}>
          Thêm Tài Khoản Mới
        </Button>
      </Stack>

      <Grid container spacing={0}>
        {filteredAccounts.map((account) => (
          <Grid sx={{ paddingBottom: 2, paddingRight: 2 }} item xs={12} sm={6} md={4} key={account.bankAccountId}>
            <Card
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #e0e0e0',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  {account.bankName}
                </Typography>
                <Typography>
                  <strong>Số Tài Khoản:</strong> {account.accountNumber}
                </Typography>
                <Typography>
                  <strong>Tên Tài Khoản:</strong> {account.accountName}
                </Typography>
                <Typography>
                  <strong>Chi Nhánh:</strong> {account.branchName}
                </Typography>
                {account.isPrimary && (
                  <Typography
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: '#e3f2fd',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      width: 'fit-content'
                    }}
                  >
                    Tài Khoản Chính
                  </Typography>
                )}
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default BankAccountList;
