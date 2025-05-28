import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { TourismPackageResponse } from '../../../../services/tourism-company/tourism-package.service';
import { ActivityResponse } from '../../../../types/tourism-facility/package.types';

interface PackageDialogProps {
  open: boolean;
  onClose: () => void;
  packages: TourismPackageResponse[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectPackage: (pkg: ActivityResponse) => void;
}

const PackageDialog = ({ open, onClose, packages, searchTerm, onSearchChange, onSelectPackage }: PackageDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">
              <strong>Chọn hoạt động từ gói du lịch</strong>
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseOutlined />
            </IconButton>
          </Stack>

          <TextField
            fullWidth
            placeholder="Tìm kiếm theo tên cơ sở hoặc tên gói..."
            InputProps={{
              startAdornment: <SearchOutlined style={{ color: 'rgba(0,0,0,0.54)', marginRight: 8 }} />
            }}
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
          />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {packages.length > 0 ? (
            <>
              {packages.map((pkg) => {
                return (
                  <Card key={pkg.packageId} variant="outlined">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6">{pkg.packageName}</Typography>
                            <Chip
                              label={`${pkg.durations} ${
                                pkg.durationsType === 3
                                  ? 'ngày'
                                  : pkg.durationsType === 2
                                    ? 'tuần'
                                    : pkg.durationsType === 1
                                      ? 'tháng'
                                      : 'giờ'
                              }`}
                              size="small"
                              color="primary"
                            />
                            <Chip label={`${new Intl.NumberFormat('vi-VN').format(pkg.price)} VNĐ`} size="small" color="success" />
                          </Stack>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {pkg.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                            <strong>Danh sách hoạt động:</strong>
                          </Typography>
                          <Grid container spacing={2}>
                            {pkg.activities?.map((activity) => {
                              const isFull = activity.maxCapacity && activity.currentCapacity >= activity.maxCapacity;
                              return (
                                <Grid item xs={12} md={6} key={activity.activityId}>
                                  <Card variant="outlined">
                                    <CardMedia
                                      component="img"
                                      height="200"
                                      image={activity.imgs?.[0]}
                                      alt={activity.activityName}
                                      sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent>
                                      <Stack spacing={1}>
                                        <Typography variant="h6" gutterBottom>
                                          {activity.activityName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          {activity.description}
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                          <Chip label={`${activity.durationInHours} giờ`} size="small" />
                                          <Chip label={activity.location} size="small" />
                                        </Stack>
                                        <Typography variant="body2" color="red">
                                          Số chỗ còn lại: {activity.maxCapacity - activity.currentCapacity} / {activity.maxCapacity}
                                        </Typography>
                                      </Stack>
                                    </CardContent>
                                    <CardActions>
                                      <Button
                                        disabled={isFull}
                                        fullWidth
                                        variant="contained"
                                        onClick={() => {
                                          onSelectPackage(activity);
                                          onClose();
                                        }}
                                      >
                                        {isFull ? 'Đã đủ chỗ' : 'Chọn hoạt động'}
                                      </Button>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          ) : (
            <>Không tìm thấy hoạt động nào</>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDialog;
