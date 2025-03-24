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
import { fetchAccommodations } from '../../../redux/tourism-company/accommodation.slice';

const AccommodationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { accommodations } = useSelector((state: RootState) => state.accommodationSlice);
  const [searchText, setSearchText] = useState('');

  const columns: TColumn[] = [
    {
      id: 'accommodationName',
      label: 'Tên nhà nghỉ',
      minWidth: 170
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      minWidth: 200
    },
    {
      id: 'phoneNumber',
      label: 'Số điện thoại',
      minWidth: 130
    },
    {
      id: 'star',
      label: 'Số sao',
      minWidth: 100
    }
  ];

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleViewDetails = (id: string) => {
    navigate(`${TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS.replace(':id', id)}`);
  };

  const handleUpdate = (id: string) => {
    navigate(`${TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE.replace(':id', id)}`);
  };

  const filteredAccommodations = accommodations.filter(
    (acc) =>
      acc.accommodationName.toLowerCase().includes(searchText.toLowerCase()) ||
      acc.address.toLowerCase().includes(searchText.toLowerCase()) ||
      acc.phoneNumber.includes(searchText)
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar placeholder="Tìm kiếm nhà nghỉ" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE)}>
          Thêm nhà nghỉ
        </Button>
      </Stack>

      <Card>
        <AppTable
          rowKey="accommodationId"
          columns={columns}
          rows={filteredAccommodations}
          handleViewDetails={handleViewDetails}
          handleUpdate={handleUpdate}
        />
      </Card>
    </Stack>
  );
};

export default AccommodationList;
