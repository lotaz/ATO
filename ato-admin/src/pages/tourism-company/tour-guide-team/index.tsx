import {
  EditOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
  TranslationOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSearchBar from '../../../components/table/SearchBar';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';

const TourGuideList = () => {
  const navigate = useNavigate();
  const [tourGuides, setTourGuides] = useState<TourGuideResponse[]>([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, _] = useState(8);

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

  const filteredData = tourGuides.filter((item: TourGuideResponse) => {
    const searchLower = searchText.toLowerCase();
    return (
      item?.account?.fullname?.toLowerCase().includes(searchLower) ||
      item?.account?.email?.toLowerCase().includes(searchLower) ||
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

      <Grid container spacing={0}>
        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((guide) => (
          <Grid sx={{ paddingBottom: 2, paddingRight: 2 }} item xs={12} sm={6} md={4} lg={3} key={guide.guideId}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ padding: 2, position: 'relative' }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.DETAILS}?id=${guide.guideId}`)}
                    sx={{
                      color: 'info.main',
                      '&:hover': { bgcolor: 'info.lighter' }
                    }}
                  >
                    <EyeOutlined />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}?id=${guide.guideId}`)}
                    sx={{
                      color: 'warning.main',
                      '&:hover': { bgcolor: 'warning.lighter' }
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                </Stack>

                <Stack spacing={1.5} alignItems="center">
                  <Avatar src={guide.account?.avatarURL || '/default-avatar.png'} sx={{ width: 80, height: 80 }} />
                  <Typography variant="h6" align="center" sx={{ mb: 0 }}>
                    {guide.account?.fullname || '-'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarOutlined style={{ color: '#faaf00' }} />
                    <Typography variant="body2">{guide.rating?.toFixed(1) || '-'} / 5.0</Typography>
                  </Box>
                  <Stack spacing={1} width="100%">
                    {' '}
                    {/* Reduced spacing from 1.5 to 1 */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MailOutlined style={{ color: '#666', fontSize: '14px' }} />
                      <Typography variant="body2" noWrap>
                        {guide.account?.email || '-'}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneOutlined style={{ color: '#666', fontSize: '14px' }} />
                      <Typography variant="body2">{guide.account?.phoneNumber || '-'}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <TranslationOutlined style={{ color: '#666', fontSize: '14px', marginTop: '4px' }} />
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {guide.languages?.split(',').map((lang) => (
                          <Chip
                            key={lang.trim()}
                            label={lang.trim()}
                            size="small"
                            sx={{
                              marginBottom: '4px',
                              height: '24px' // Reduced chip height
                            }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <TrophyOutlined style={{ color: '#666', fontSize: '14px' }} />
                      <Typography variant="body2">{guide.expertiseArea || '-'}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          color="primary"
        />
      </Box>
    </Stack>
  );
};

export default TourGuideList;
