import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppTable from '../../../components/table/AppTable';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchDrivers } from '../../../redux/tourism-company/driver.slice';
import { VehicleType } from '../../../types/tourism-company/driver.types';

const DriverList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { drivers } = useSelector((state: RootState) => state.driverSlice);
  const [searchText, setSearchText] = useState('');

  const columns: TColumn[] = [
    {
      id: 'driverName',
      label: 'Tên tài xế',
      minWidth: 170
    },
    {
      id: 'phoneNumber',
      label: 'Số điện thoại',
      minWidth: 130
    },
    {
      id: 'vehicleType',
      label: 'Loại xe',
      minWidth: 130,
      format: (value: VehicleType) => {
        const displayNames: Record<VehicleType, string> = {
          [VehicleType.CAR_4]: 'Xe 4 chỗ',
          [VehicleType.CAR_7]: 'Xe 7 chỗ',
          [VehicleType.CAR_16]: 'Xe 16 chỗ',
          [VehicleType.CAR_29]: 'Xe 29 chỗ',
          [VehicleType.CAR_45]: 'Xe 45 chỗ',
          [VehicleType.SLEEPER_BUS_SINGLE]: 'Xe giường nằm đơn',
          [VehicleType.SLEEPER_BUS_COUPLE]: 'Xe giường nằm đôi',
          [VehicleType.FLY]: 'Máy bay'
        };
        return displayNames[value] || value;
      }
    }
  ];

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const filteredDrivers = drivers.filter(
    (driver) => driver.driverName.toLowerCase().includes(searchText.toLowerCase()) || driver.phoneNumber.includes(searchText)
  );

  const handleViewDetails = (driverId: string) => {
    navigate(`${TOURISM_COMPANY_URLs.DRIVER.DETAILS}/${driverId}`);
  };

  const handleUpdate = (driverId: string) => {
    navigate(`${TOURISM_COMPANY_URLs.DRIVER.UPDATE}/${driverId}`);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm tài xế" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.DRIVER.CREATE)}>
          Thêm tài xế
        </Button>
      </Stack>

      <Card>
        <AppTable
          rowKey="driverId"
          columns={columns}
          rows={filteredDrivers}
          handleViewDetails={handleViewDetails}
          handleUpdate={handleUpdate}
        />
      </Card>
    </Stack>
  );
};

export default DriverList;
