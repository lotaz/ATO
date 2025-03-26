import { Button, Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTable from '../../../components/table/AppTable';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';

const TourGuideList = () => {
  const navigate = useNavigate();
  const [tourGuides, setTourGuides] = useState<TourGuideResponse[]>([]);
  const [searchText, setSearchText] = useState('');

  const columns: TColumn[] = [
    {
      id: 'fullName',
      label: 'Họ tên',
      minWidth: 150,
      format: (row) => row.account?.fullName || '-'
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 200,
      format: (row) => row.account?.email || '-'
    },
    {
      id: 'phone',
      label: 'Số điện thoại',
      minWidth: 150,
      format: (row) => row.account?.phone || '-'
    },
    {
      id: 'languages',
      label: 'Ngôn ngữ',
      minWidth: 200,
      format: (row) => (
        <Stack direction="row" spacing={1}>
          {row.languages?.split(',').map((lang) => <Chip key={lang.trim()} label={lang.trim()} size="small" />)}
        </Stack>
      )
    },
    {
      id: 'expertiseArea',
      label: 'Chuyên môn',
      minWidth: 150,
      format: (row) => row.expertiseArea || '-'
    },
    {
      id: 'rating',
      label: 'Đánh giá',
      minWidth: 100,
      align: 'right',
      format: (row) => row.rating?.toFixed(1) || '-'
    }
  ];

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      const response = await tourGuideService.getTourGuides();
      console.log('response', response.data);
      setTourGuides(response.data);
    } catch (error) {
      console.error('Failed to fetch tour guides:', error);
    } finally {
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = tourGuides.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.account?.userName?.toLowerCase().includes(searchLower) ||
      item.account?.email?.toLowerCase().includes(searchLower) ||
      item.expertiseArea?.toLowerCase().includes(searchLower) ||
      item.languages?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppSearchBar onChange={(e) => handleSearch(e.target.value)} placeholder="Tìm kiếm hướng dẫn viên" />
        <Button variant="contained" onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.CREATE)}>
          Thêm Hướng Dẫn Viên
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
