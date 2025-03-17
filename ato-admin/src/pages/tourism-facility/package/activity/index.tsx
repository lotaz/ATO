import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NoDataDisplay } from '../../../../components/no-data/NoDataDisplay';
import AppSearchBar from '../../../../components/table/SearchBar';
import { TOURISM_FACILITY_URLs } from '../../../../constants/tourism-facility-urls';
import { RootState } from '../../../../redux/store';
import { fetchActivities } from '../../../../redux/tourism-facility/activity.slice';

const ActivityList = ({ packageId }: { packageId: number }) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { activities } = useSelector((state: RootState) => state.activitySlice);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredActivities =
    activities?.filter(
      (activity) =>
        activity.name.toLowerCase().includes(searchText.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  const currentActivities = filteredActivities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    if (packageId) {
      dispatch(fetchActivities(Number(packageId)));
    }
  }, [dispatch, packageId]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <AppSearchBar placeholder="Tìm kiếm hoạt động" onChange={(e) => setSearchText(e.target.value)} />
        <Button
          variant="contained"
          startIcon={<PlusOutlined />}
          onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.ACTIVITY.CREATE(Number(packageId)))}
        >
          Thêm hoạt động
        </Button>
      </Stack>

      <Card>
        {currentActivities?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên hoạt động</TableCell>
                  <TableCell>Thời gian (giờ)</TableCell>
                  <TableCell>Địa điểm</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentActivities?.map((activity) => (
                  <TableRow key={activity.activityId}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.durationInHours || '-'}</TableCell>
                    <TableCell>{activity.location || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={activity.approvalStatus ? 'Đã duyệt' : 'Chưa duyệt'}
                        color={activity.approvalStatus ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{dayjs(activity.createdDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.ACTIVITY.DETAILS(Number(packageId), activity.activityId))}
                        >
                          <EyeOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => navigate(TOURISM_FACILITY_URLs.PACKAGE.ACTIVITY.UPDATE(Number(packageId), activity.activityId))}
                        >
                          <EditOutlined />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredActivities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
            />
          </TableContainer>
        ) : (
          <NoDataDisplay />
        )}
      </Card>
    </Stack>
  );
};

export default ActivityList;
