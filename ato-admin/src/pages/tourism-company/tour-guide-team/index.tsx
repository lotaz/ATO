import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppTable from '../../../components/table/AppTable';
import AppSearchBar from '../../../components/table/SearchBar';
import { TColumn } from '../../../components/table/types';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { useEffect, useState } from 'react';
import { tourGuideService } from '../../../services/tour-guide';
import { ITourGuide } from '../../../services/tour-guide/types';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';

const TourGuideList = () => {
  const navigate = useNavigate();
  const [_, setLoading] = useState(false);
  const [tourGuides, setTourGuides] = useState<ITourGuide[]>([]);
  const [searchText, setSearchText] = useState('');

  const columns: TColumn[] = [
    {
      id: 'fullName',
      label: 'Họ tên',
      minWidth: 150,
      format: (row) => row.user?.fullName || '-'
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 200,
      format: (row) => row.user?.email || '-'
    },
    {
      id: 'languages',
      label: 'Ngôn ngữ',
      minWidth: 200,
      format: (languages: string[]) => (
        <Stack direction="row" spacing={1}>
          {languages.map((lang) => (
            <Chip key={lang} label={lang} size="small" />
          ))}
        </Stack>
      )
    },
    {
      id: 'expertiseArea',
      label: 'Chuyên môn',
      minWidth: 150
    },
    {
      id: 'rating',
      label: 'Đánh giá',
      minWidth: 100,
      align: 'right',
      format: (rating: number) => rating?.toFixed(1) || '-'
    },
    {
      id: 'createdDate',
      label: 'Ngày gia nhập',
      minWidth: 120,
      format: (date: string) => dayjs(date).format('DD/MM/YYYY')
    }
  ];

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      setLoading(true);
      const data = await tourGuideService.getTourGuides();
      setTourGuides(data);
    } catch (error) {
      console.error('Failed to fetch tour guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = tourGuides.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.user?.fullname?.toLowerCase().includes(searchLower) ||
      item.user?.email?.toLowerCase().includes(searchLower) ||
      item.expertiseArea?.toLowerCase().includes(searchLower) ||
      item.languages?.some((lang) => lang.toLowerCase().includes(searchLower))
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
        rowKey="id"
        handleViewDetails={(id) => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.DETAILS}/${id}`)}
        handleUpdate={(id) => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}/${id}`)}
      />
    </Stack>
  );
};

export default TourGuideList;
