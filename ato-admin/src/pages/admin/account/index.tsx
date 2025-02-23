import AppTable from '../../../components/table/AppTable';
import { TColumn } from '../../../components/table/types';

export default function () {
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

  return <AppTable columns={columns} rows={rows} />;
}

export type TAccount = {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  status: string;
};
