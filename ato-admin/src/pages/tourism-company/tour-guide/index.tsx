import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTable from '../../../components/table/AppTable';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import dayjs from 'dayjs';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';

const TourGuideList = () => {
  const navigate = useNavigate();
  const [tourGuides, setTourGuides] = useState<TourGuideResponse[]>([]);
  const [searchText, setSearchText] = useState('');

  const columns: TColumn[] = [
    {
      id: 'fullname',
      label: 'Họ tên',
      minWidth: 170,
      format: (row) => row.account?.fullname || '-'
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      format: (row) => row.account?.email || '-'
    },
    {
      id: 'phoneNumber',
      label: 'Số điện thoại',
      minWidth: 130,
      format: (row) => row.account?.phoneNumber || '-'
    },
    {
      id: 'languages',
      label: 'Ngôn ngữ',
      minWidth: 130
    },
    {
      id: 'expertiseArea',
      label: 'Chuyên môn',
      minWidth: 130
    },
    {
      id: 'rating',
      label: 'Đánh giá',
      minWidth: 100,
      align: 'right',
      format: (row) => row.rating.toFixed(1)
    },
    {
      id: 'createDate',
      label: 'Ngày tạo',
      minWidth: 130,
      format: (row) => dayjs(row.createDate).format('DD/MM/YYYY')
    }
  ];

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      const response = await tourGuideService.getTourGuides();
      setTourGuides(response.data);
    } catch (error) {
      console.error('Failed to fetch tour guides:', error);
    }
  };

  const filteredData = tourGuides.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.account?.fullname?.toLowerCase().includes(searchLower) ||
      item.account?.email?.toLowerCase().includes(searchLower) ||
      item.account?.phoneNumber?.toLowerCase().includes(searchLower) ||
      item.languages?.toLowerCase().includes(searchLower) ||
      item.expertiseArea?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm hướng dẫn viên" />
        <Button variant="contained" onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.CREATE)}>
          Thêm hướng dẫn viên
        </Button>
      </Stack>

      <AppTable
        columns={columns}
        rows={filteredData}
        rowKey="guideId"
        handleViewDetails={(id) => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.DETAILS}/${id}`)}
        handleUpdate={(id) => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}/${id}`)}
      />
    </Stack>
  );
};

export default TourGuideList;
