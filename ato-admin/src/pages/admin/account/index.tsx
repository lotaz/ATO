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
import { useState } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const accounts: any = useSelector((state: RootState) => state.account.data);
  const dispatch = useDispatch<any>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  // Add search filter function
  const filteredAccounts = accounts?.filter((account: any) =>
    Object.values(account).some((value: any) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      format: (value: any) => value
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
          <AppSearchBar
            placeholder="Nhập tên, vai trò, đơn vị, email, số điện thoại"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button onClick={() => navigate(ADMIN_URLs.ACCOUNT.CREATE)} type="button" variant="contained" color="primary">
            Thêm mới
          </Button>
        </Stack>
        {filteredAccounts && (
          <AppTable
            columns={columns}
            rows={filteredAccounts}
            handleViewDetails={handleViewDetails}
            handleUpdate={handleUpdate}
            rowKey="id"
          />
        )}
      </Stack>
    </>
  );
};

export default Index;
