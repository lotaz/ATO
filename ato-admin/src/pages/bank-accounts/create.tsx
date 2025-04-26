import { useState } from 'react';
import { Button, Card, Stack, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import { post } from '../../helpers/axios-helper';
import { BankAccountRequest, OwnerType } from './types';
import { MenuItem } from '@mui/material';
import { BANK_URLs } from '../../constants/bank-account-urls';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Role } from '../../types';

const CreateBankAccount = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BankAccountRequest>({
    ownerId: '', // Bạn cần lấy giá trị này từ context hoặc props
    ownerType: OwnerType.TourismCompany,
    bankName: '',
    accountNumber: '',
    accountName: '',
    branchName: '',
    isPrimary: false
  });
  const user: any = useSelector((state: RootState) => state.authen.user);
  const ownerType = (user?.role as Role) === 'TourismCompanies' ? OwnerType.TourismCompany : OwnerType.TouristFacility;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await post('/bank-accounts', {
        ...formData,
        ownerType: ownerType
      });
      if (response.data.status === true) {
        navigate(BANK_URLs.INDEX);
        enqueueSnackbar(response.data.message, { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Tạo tài khoản ngân hàng thất bại:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    // Add validation for account number
    if (name === 'accountNumber' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isPrimary' ? checked : value
    }));
  };

  const vietnameseBanks = [
    'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
    'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
    'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)',
    'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)',
    'Ngân hàng TMCP Á Châu (ACB)',
    'Ngân hàng TMCP Quân đội (MB Bank)',
    'Ngân hàng TMCP Phát triển TP.HCM (HDBank)',
    'Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)',
    'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
    'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank)',
    'Ngân hàng TMCP Đông Nam Á (SeABank)',
    'Ngân hàng TMCP Bưu điện Liên Việt (LienVietPostBank)',
    'Ngân hàng TMCP Quốc Dân (NCB)',
    'Ngân hàng TMCP Tiên Phong (TPBank)',
    'Ngân hàng TMCP Hàng Hải Việt Nam (MSB)',
    'Ngân hàng TMCP Phương Đông (OCB)',
    'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam (Eximbank)',
    'Ngân hàng TMCP Bản Việt (VietCapitalBank)',
    'Ngân hàng TMCP Việt Á (VietABank)',
    'Ngân hàng TMCP Nam Á (NamABank)'
  ];

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h5">Thêm Tài Khoản Ngân Hàng Mới</Typography>
      </Stack>

      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField select name="bankName" label="Tên Ngân Hàng" value={formData.bankName} onChange={handleChange} required fullWidth>
              {vietnameseBanks.map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="accountNumber"
              label="Số Tài Khoản"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
            <TextField name="accountName" label="Tên Tài Khoản" value={formData.accountName} onChange={handleChange} required fullWidth />
            <TextField name="branchName" label="Chi Nhánh" value={formData.branchName} onChange={handleChange} required fullWidth />
            <FormControlLabel
              control={<Checkbox name="isPrimary" checked={formData.isPrimary} onChange={handleChange} />}
              label="Đặt làm tài khoản chính"
            />
            <Button type="submit" variant="contained" disabled={loading} sx={{ width: 'fit-content' }}>
              {loading ? 'Đang tạo...' : 'Tạo Tài Khoản'}
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
};

export default CreateBankAccount;
