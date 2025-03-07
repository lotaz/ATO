import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppTable from '../../../components/table/AppTable';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAccounts } from '../../../redux/accountSlice';
export type User = {
  email: string;
  phoneNumber: string;
  fullname: string;
  gender: boolean; // True or false
  dob: string; // ISO 8601 format date string
  isAccountActive: boolean;
  roleName: string;
};

const Index = () => {
  const navigate = useNavigate();

  const accounts: any = useSelector((state: RootState) => state.account.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  const columns: TColumn[] = [
    { id: 'id', hidden: true },
    { id: 'fullname', label: 'Họ Tên', minWidth: 170 },
    { id: 'roleName', label: 'Vai Trò', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      format: (value: any) => value.toLocaleString('en-US')
    },
    {
      id: 'phoneNumber',
      label: 'Số điện thoại',
      minWidth: 170,
      format: (value: any) => value?.toFixed(2)
    },
    {
      id: 'isAccountActive',
      label: 'Trạng thái',
      minWidth: 170,
      format: (value: any) => (value ? 'Đang hoạt động' : 'Ngừng hoạt động ')
    }
  ];

  const handleViewDetails = (id: any) => navigate(`${ADMIN_URLs.ACCOUNT.DETAILS}?id=${id}`);
  const handleUpdate = (id: any) => navigate(`${ADMIN_URLs.ACCOUNT.UPDATE}?id=${id}`);

  return (
    <>
      <Stack direction={'column'} spacing={2}>
        <Stack direction={'row'} display={'flex'} alignItems={'start'} justifyContent={'space-between'}>
          <AppSearchBar placeholder="Nhập tên, vai trò, đơn vị, email, số điện thoại" />

          <Button onClick={() => navigate(ADMIN_URLs.ACCOUNT.CREATE)} type="button" variant="contained" color="primary">
            Thêm mới
          </Button>
        </Stack>
        {accounts && (
          <AppTable columns={columns} rows={accounts} handleViewDetails={handleViewDetails} handleUpdate={handleUpdate} rowKey="id" />
        )}

        {!accounts && <Typography>Không tìm thấy dữ liệu tài khoản.</Typography>}
      </Stack>
    </>
  );
};

export default Index;
