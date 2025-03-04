import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppTable from '../../../components/table/AppTable';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { ADMIN_URLs } from '../../../constants/admin-urls';

const Index = () => {
  const navigate = useNavigate();

  const columns: TColumn[] = [
    { id: 'name', label: 'Họ Tên', minWidth: 170 },
    { id: 'role', label: 'Vai Trò', minWidth: 100 },
    {
      id: 'company',
      label: 'Đơn Vị',
      minWidth: 170,
      format: (value: number) => value.toLocaleString('en-US')
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      format: (value: number) => value.toLocaleString('en-US')
    },
    {
      id: 'phone',
      label: 'Số điện thoại',
      minWidth: 170,
      format: (value: number) => value.toFixed(2)
    },
    {
      id: 'status',
      label: 'Trạng thái',
      minWidth: 170,
      format: (value: number) => value.toFixed(2)
    }
  ];

  const records = Array(100)
    .fill()
    .map((_, index) => index + 1);

  const rows: TAccount[] = Array.from(records, (index: number) => {
    return {
      name: `Nguyễn Văn ${index}`,
      company: `Công ty ${index}`,
      role: 'Quản trị viên',
      email: `Email${index}@gmail.com`,
      phone: '0123456' + index,
      status: 'Đang hoạt động'
    } as TAccount;
  });

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
        <AppTable columns={columns} rows={rows} handleViewDetails={handleViewDetails} handleUpdate={handleUpdate} rowKey="email" />
      </Stack>
    </>
  );
};

export default Index;

export type TAccount = {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  status: string;
};
