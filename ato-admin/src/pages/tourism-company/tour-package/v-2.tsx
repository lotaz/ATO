import { ArrowLeftOutlined, CloseOutlined, DeleteOutlined, InfoCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
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
  ImageList,
  ImageListItem,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FieldArray, Formik, getIn } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { accommodationService } from '../../../services/accommodation/accommodation.service';
import { driverService } from '../../../services/drive/drive.service';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourismPackageResponse, tourismPackageService } from '../../../services/tourism-company/tourism-package.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import { DurationType } from '../../../types/tourism-company/tour-package.types';
import { Accommodation, createTourInitialValues, createTourPackageSchema, Driver, FormValues } from './type';

const CreateTourPackage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [tourGuides, setTourGuides] = useState<TourGuideResponse[]>([]);
  const [tourPackages, setTourPackages] = useState<TourismPackageResponse[]>([]);
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPackages, setFilteredPackages] = useState<typeof tourPackages>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversResponse, accommodationsResponse, tourPackagesResponse, tourGuideResponse] = await Promise.all([
          driverService.getDrivers(),
          accommodationService.getAccommodations(),
          tourismPackageService.getListTourismPackages(),
          tourGuideService.getTourGuides()
        ]);

        console.log('tourPackagesResponse', tourPackagesResponse.data);
        setDrivers(driversResponse.data);
        setAccommodations(accommodationsResponse.data);
        setTourPackages(tourPackagesResponse.data);
        setFilteredPackages(tourPackagesResponse.data);
        setTourGuides(tourGuideResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  // Add this function before the return statement
  const filterPackages = (packages: TourismPackageResponse[], term: string) => {
    if (!term) return packages;

    const searchValue = term.toLowerCase();
    return packages.filter(
      (pkg) =>
        pkg.touristFacility?.touristFacilityName?.toLowerCase().includes(searchValue) ||
        pkg.packageName?.toLowerCase().includes(searchValue)
    );
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const requestData = {
        ...values,
        tourGuides: values?.tourGuides?.map((guideId) => ({ guideId }))
      };

      await agriculturalTourService.createPackage(requestData as any);
      navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX);
    } catch (error) {
      console.error('Failed to create package:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Thêm gói du lịch mới</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Formik initialValues={createTourInitialValues} validationSchema={createTourPackageSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Tên gói du lịch"
                      name="packageName"
                      value={values.packageName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.packageName && errors.packageName)}
                      helperText={touched.packageName && errors.packageName}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Số chỗ"
                      name="slot"
                      value={values.slot}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.slot && errors.slot)}
                      helperText={touched.slot && errors.slot}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Mô tả"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Giá người lớn (VNĐ)"
                      name="priceOfAdults"
                      value={values.priceOfAdults}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.priceOfAdults && errors.priceOfAdults)}
                      helperText={touched.priceOfAdults && errors.priceOfAdults}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Giá trẻ em (VNĐ)"
                      name="priceOfChildren"
                      value={values.priceOfChildren}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.priceOfChildren && errors.priceOfChildren)}
                      helperText={touched.priceOfChildren && errors.priceOfChildren}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DateTimePicker
                      label="Thời gian bắt đầu"
                      value={values.startTime}
                      minDateTime={dayjs()}
                      onChange={(date) => setFieldValue('startTime', date)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DateTimePicker
                      minDateTime={dayjs()}
                      label="Thời gian kết thúc"
                      value={values.endTime}
                      onChange={(date) => setFieldValue('endTime', date)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Thời lượng"
                      name="durations"
                      value={values.durations}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.durations && errors.durations)}
                      helperText={touched.durations && errors.durations}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Đơn vị thời gian"
                      name="durationsType"
                      value={values.durationsType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.durationsType && errors.durationsType)}
                      helperText={touched.durationsType && errors.durationsType}
                    >
                      <MenuItem value={DurationType.HOURS}>Giờ</MenuItem>
                      <MenuItem value={DurationType.DAYS}>Ngày</MenuItem>
                      <MenuItem value={DurationType.WEEKS}>Tuần</MenuItem>
                      <MenuItem value={DurationType.MONTHS}>Tháng</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Add image upload section */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Hình ảnh
                    </Typography>
                    <MultipleFileUploader
                      values={values.imgs}
                      onChange={(urls) => setFieldValue('imgs', urls)}
                      accept="image/*"
                      maxFiles={5}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Điểm đến
                      </Typography>
                      <FieldArray name="tourDestinations">
                        {({ push, remove }) => (
                          <Stack spacing={2}>
                            {(values.tourDestinations || []).map((destination: FormValues['tourDestinations'][number], index) => (
                              <Card key={index} variant="outlined" sx={{ p: 2 }}>
                                <Stack spacing={2}>
                                  {/* Keep existing header and basic fields */}
                                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle1">Điểm đến {index + 1}</Typography>
                                    <Button startIcon={<DeleteOutlined />} color="error" onClick={() => remove(index)}>
                                      Xóa
                                    </Button>
                                  </Stack>

                                  <Grid container spacing={2}>
                                    {/* Keep existing title, description fields */}
                                    <Grid item xs={12}>
                                      <TextField
                                        fullWidth
                                        label="Tiêu đề"
                                        name={`tourDestinations.${index}.title`}
                                        value={destination.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(
                                          getIn(touched, `tourDestinations.${index}.title`) &&
                                            getIn(errors, `tourDestinations.${index}.title`)
                                        )}
                                        helperText={
                                          getIn(touched, `tourDestinations.${index}.title`) &&
                                          getIn(errors, `tourDestinations.${index}.title`)
                                        }
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <TextField
                                        fullWidth
                                        multiline
                                        rows={2}
                                        label="Mô tả"
                                        name={`tourDestinations.${index}.description`}
                                        value={destination.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                      <DateTimePicker
                                        minDateTime={dayjs()}
                                        label="Thời gian bắt đầu *"
                                        value={destination.startTime}
                                        onChange={(date) => setFieldValue(`tourDestinations.${index}.startTime`, date)}
                                        slotProps={{
                                          textField: {
                                            fullWidth: true,
                                            required: true,
                                            error: Boolean(
                                              getIn(touched, `tourDestinations.${index}.startTime`) &&
                                                getIn(errors, `tourDestinations.${index}.startTime`)
                                            ),
                                            helperText:
                                              (getIn(touched, `tourDestinations.${index}.startTime`) &&
                                                getIn(errors, `tourDestinations.${index}.startTime`)) ||
                                              'Vui lòng chọn thời gian bắt đầu'
                                          }
                                        }}
                                      />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                      <DateTimePicker
                                        minDateTime={dayjs()}
                                        label="Thời gian kết thúc *"
                                        value={destination.endTime}
                                        onChange={(date) => setFieldValue(`tourDestinations.${index}.endTime`, date)}
                                        slotProps={{
                                          textField: {
                                            fullWidth: true,
                                            required: true,
                                            error: Boolean(
                                              getIn(touched, `tourDestinations.${index}.endTime`) &&
                                                getIn(errors, `tourDestinations.${index}.endTime`)
                                            ),
                                            helperText:
                                              (getIn(touched, `tourDestinations.${index}.endTime`) &&
                                                getIn(errors, `tourDestinations.${index}.endTime`)) ||
                                              'Vui lòng chọn thời gian kết thúc'
                                          }
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                      <TextField
                                        select
                                        fullWidth
                                        label="Loại hoạt động"
                                        name={`tourDestinations.${index}.typeActivity`}
                                        value={destination.typeActivity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(
                                          getIn(touched, `tourDestinations.${index}.typeActivity`) &&
                                            getIn(errors, `tourDestinations.${index}.typeActivity`)
                                        )}
                                        helperText={
                                          getIn(touched, `tourDestinations.${index}.typeActivity`) &&
                                          getIn(errors, `tourDestinations.${index}.typeActivity`)
                                        }
                                      >
                                        <MenuItem value={0}>Hoạt động</MenuItem>
                                        <MenuItem value={1}>Lái xe</MenuItem>
                                        <MenuItem value={2}>Lưu trú</MenuItem>
                                      </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                      <TextField
                                        fullWidth
                                        type="number"
                                        label="Thứ tự"
                                        name={`tourDestinations.${index}.visitOrder`}
                                        value={destination.visitOrder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(
                                          getIn(touched, `tourDestinations.${index}.visitOrder`) &&
                                            getIn(errors, `tourDestinations.${index}.visitOrder`)
                                        )}
                                        helperText={
                                          getIn(touched, `tourDestinations.${index}.visitOrder`) &&
                                          getIn(errors, `tourDestinations.${index}.visitOrder`)
                                        }
                                      />
                                    </Grid>

                                    {destination.typeActivity === 0 && (
                                      <>
                                        <Grid item xs={12} md={6}>
                                          <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => setOpenPackageDialog(true)}
                                            startIcon={<SearchOutlined />}
                                          >
                                            Chọn hoạt động từ gói du lịch
                                          </Button>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                          <TextField
                                            select
                                            fullWidth
                                            SelectProps={{
                                              multiple: true,
                                              renderValue: (selected: string[]) => {
                                                const selectedGuides = tourGuides.filter((g) => selected.includes(g.guideId));
                                                return selectedGuides.map((g) => g.account?.fullname).join(', ');
                                              }
                                            }}
                                            label="Chọn hướng dẫn viên"
                                            name={`tourDestinations.${index}.tourGuides`}
                                            value={destination.tourGuides?.map((g) => g.guideId) || []}
                                            onChange={(e) => {
                                              const selectedGuideIds = e.target.value as string[];
                                              setFieldValue(
                                                `tourDestinations.${index}.tourGuides`,
                                                selectedGuideIds.map((guideId) => ({ guideId }))
                                              );
                                            }}
                                          >
                                            {tourGuides.map((guide) => (
                                              <MenuItem key={guide.guideId} value={guide.guideId}>
                                                {guide.account?.fullname} - {guide.account?.email}
                                              </MenuItem>
                                            ))}
                                          </TextField>
                                        </Grid>
                                        <Dialog
                                          open={openPackageDialog}
                                          onClose={() => setOpenPackageDialog(false)}
                                          maxWidth="lg"
                                          fullWidth
                                        >
                                          <DialogTitle>
                                            <Stack spacing={2}>
                                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="h4">
                                                  <strong>Chọn hoạt động từ gói du lịch</strong>
                                                </Typography>
                                                <IconButton onClick={() => setOpenPackageDialog(false)} size="small">
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
                                                  setSearchTerm(e.target.value);
                                                  const filtered = filterPackages(tourPackages, e.target.value);
                                                  setFilteredPackages(filtered);
                                                }}
                                              />
                                            </Stack>
                                          </DialogTitle>
                                          <DialogContent>
                                            <Stack spacing={3}>
                                              {filteredPackages.length > 0 ? (
                                                <>
                                                  {filteredPackages.map((pkg) => (
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
                                                              <Chip
                                                                label={`${new Intl.NumberFormat('vi-VN').format(pkg.price)} VNĐ`}
                                                                size="small"
                                                                color="success"
                                                              />
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
                                                              {pkg.activities?.map((activity) => (
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
                                                                    </CardContent>
                                                                    <CardActions>
                                                                      <Button
                                                                        fullWidth
                                                                        variant="contained"
                                                                        onClick={() => {
                                                                          setFieldValue(
                                                                            `tourDestinations.${index}.activityId`,
                                                                            activity.activityId
                                                                          );
                                                                          setFieldValue(
                                                                            `tourDestinations.${index}.title`,
                                                                            activity.activityName
                                                                          );
                                                                          setFieldValue(
                                                                            `tourDestinations.${index}.description`,
                                                                            activity.description
                                                                          );
                                                                          setOpenPackageDialog(false);
                                                                        }}
                                                                      >
                                                                        Chọn hoạt động này
                                                                      </Button>
                                                                    </CardActions>
                                                                  </Card>
                                                                </Grid>
                                                              ))}
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      </CardContent>
                                                    </Card>
                                                  ))}
                                                </>
                                              ) : (
                                                <>Không tìm thấy hoạt động nào</>
                                              )}
                                            </Stack>
                                          </DialogContent>
                                        </Dialog>
                                      </>
                                    )}
                                    {destination.typeActivity === 1 && (
                                      <Grid item xs={12} md={6}>
                                        <Stack spacing={2}>
                                          <TextField
                                            select
                                            fullWidth
                                            label="Chọn tài xế"
                                            name={`tourDestinations.${index}.driverId`}
                                            value={destination.driverId || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(
                                              getIn(touched, `tourDestinations.${index}.driverId`) &&
                                                getIn(errors, `tourDestinations.${index}.driverId`)
                                            )}
                                            helperText={
                                              getIn(touched, `tourDestinations.${index}.driverId`) &&
                                              getIn(errors, `tourDestinations.${index}.driverId`)
                                            }
                                          >
                                            <MenuItem value="">Chọn tài xế</MenuItem>
                                            {drivers.map((driver) => (
                                              <MenuItem
                                                key={driver.driverId}
                                                value={driver.driverId}
                                                sx={{
                                                  display: 'flex',
                                                  justifyContent: 'space-between',
                                                  alignItems: 'center',
                                                  gap: 1
                                                }}
                                              >
                                                <span>
                                                  {driver.driverName} - {driver.phoneNumber}
                                                </span>
                                                <IconButton
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedDriver(driver);
                                                  }}
                                                >
                                                  <InfoCircleOutlined />
                                                </IconButton>
                                              </MenuItem>
                                            ))}
                                          </TextField>
                                        </Stack>
                                      </Grid>
                                    )}
                                    <Dialog open={Boolean(selectedDriver)} onClose={() => setSelectedDriver(null)} maxWidth="sm" fullWidth>
                                      <DialogTitle
                                        sx={{
                                          m: 0,
                                          p: 2,
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <Typography variant="h4">
                                          <strong>Chi tiết phương tiện và tài xế</strong>
                                        </Typography>
                                        <IconButton onClick={() => setSelectedDriver(null)} size="small">
                                          <CloseOutlined />
                                        </IconButton>
                                      </DialogTitle>
                                      <DialogContent>
                                        {selectedDriver && (
                                          <Grid container spacing={2}>
                                            <Box sx={{ mx: 2, width: '100%', mt: 4 }}>
                                              <Typography variant="body2" gutterBottom>
                                                <strong>Lái Xe: </strong>
                                                {selectedDriver.driverName}
                                              </Typography>
                                              <Typography variant="body2" gutterBottom>
                                                <strong>Số điện thoại: </strong>
                                                {selectedDriver.phoneNumber}
                                              </Typography>
                                              <Typography variant="body2" gutterBottom>
                                                <strong>Loại Xe: </strong>
                                                {{
                                                  0: 'Xe 4 chỗ',
                                                  1: 'Xe 7 chỗ',
                                                  2: 'Xe 16 chỗ',
                                                  3: 'Xe 29 chỗ',
                                                  4: 'Xe 45 chỗ',
                                                  5: 'Xe giường nằm đơn',
                                                  6: 'Xe giường nằm đôi',
                                                  7: 'Máy bay'
                                                }[selectedDriver.vehicleType] || 'Không xác định'}
                                              </Typography>
                                              {selectedDriver.imgs?.length > 0 && (
                                                <Box>
                                                  <Typography variant="subtitle2" gutterBottom>
                                                    <strong>Hình ảnh:</strong>
                                                  </Typography>
                                                  <ImageList cols={2} gap={8}>
                                                    {selectedDriver.imgs.map((img, index) => (
                                                      <ImageListItem key={index}>
                                                        <img
                                                          src={img}
                                                          alt={`Driver image ${index + 1}`}
                                                          loading="lazy"
                                                          style={{
                                                            width: '100%',
                                                            height: 200,
                                                            objectFit: 'cover',
                                                            borderRadius: 8
                                                          }}
                                                        />
                                                      </ImageListItem>
                                                    ))}
                                                  </ImageList>
                                                </Box>
                                              )}
                                            </Box>
                                          </Grid>
                                        )}
                                      </DialogContent>
                                    </Dialog>
                                    {destination.typeActivity === 2 && (
                                      <>
                                        <Grid item xs={12} md={6}>
                                          <TextField
                                            select
                                            fullWidth
                                            label="Chọn nơi lưu trú"
                                            name={`tourDestinations.${index}.accommodationId`}
                                            value={destination.accommodationId || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(
                                              getIn(touched, `tourDestinations.${index}.accommodationId`) &&
                                                getIn(errors, `tourDestinations.${index}.accommodationId`)
                                            )}
                                            helperText={
                                              getIn(touched, `tourDestinations.${index}.accommodationId`) &&
                                              getIn(errors, `tourDestinations.${index}.accommodationId`)
                                            }
                                          >
                                            <MenuItem value="">Chọn nơi lưu trú</MenuItem>
                                            {accommodations.map((accommodation) => (
                                              <MenuItem
                                                key={accommodation.accommodationId}
                                                value={accommodation.accommodationId}
                                                sx={{
                                                  display: 'flex',
                                                  justifyContent: 'space-between',
                                                  alignItems: 'center',
                                                  gap: 1
                                                }}
                                              >
                                                <span>
                                                  {accommodation.accommodationName} - {accommodation.phoneNumber}
                                                </span>
                                                <IconButton
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedAccommodation(accommodation);
                                                  }}
                                                >
                                                  <InfoCircleOutlined />
                                                </IconButton>
                                              </MenuItem>
                                            ))}
                                          </TextField>
                                        </Grid>
                                        <Dialog
                                          open={Boolean(selectedAccommodation)}
                                          onClose={() => setSelectedAccommodation(null)}
                                          maxWidth="sm"
                                          fullWidth
                                        >
                                          <DialogTitle
                                            sx={{
                                              m: 0,
                                              p: 2,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center'
                                            }}
                                          >
                                            <Typography variant="h4">
                                              <strong>Chi tiết nơi lưu trú</strong>
                                            </Typography>
                                            <IconButton onClick={() => setSelectedAccommodation(null)} size="small">
                                              <CloseOutlined />
                                            </IconButton>
                                          </DialogTitle>
                                          <DialogContent>
                                            {selectedAccommodation && (
                                              <Grid container spacing={2}>
                                                <Box sx={{ mx: 2, width: '100%', mt: 4 }}>
                                                  <Typography variant="body2" gutterBottom>
                                                    <strong>Tên: </strong>
                                                    {selectedAccommodation.accommodationName}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                    <strong>Mô tả: </strong>
                                                    {selectedAccommodation.accommodationDescription}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                    <strong>Địa chỉ: </strong>
                                                    {selectedAccommodation.address}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                    <strong>Số điện thoại: </strong>
                                                    {selectedAccommodation.phoneNumber}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                    <strong>Đánh giá: </strong>
                                                    {selectedAccommodation.star} sao
                                                  </Typography>
                                                  {selectedAccommodation.imgs && selectedAccommodation.imgs.length > 0 && (
                                                    <Box>
                                                      <Typography variant="subtitle2" gutterBottom>
                                                        <strong>Hình ảnh:</strong>
                                                      </Typography>
                                                      <ImageList cols={2} gap={8}>
                                                        {selectedAccommodation.imgs.map((img, index) => (
                                                          <ImageListItem key={index}>
                                                            <img
                                                              src={img}
                                                              alt={`Accommodation image ${index + 1}`}
                                                              loading="lazy"
                                                              style={{
                                                                width: '100%',
                                                                height: 200,
                                                                objectFit: 'cover',
                                                                borderRadius: 8
                                                              }}
                                                            />
                                                          </ImageListItem>
                                                        ))}
                                                      </ImageList>
                                                    </Box>
                                                  )}
                                                </Box>
                                              </Grid>
                                            )}
                                          </DialogContent>
                                        </Dialog>
                                        <Grid item xs={12} md={6}>
                                          <DateTimePicker
                                            label="Ngày check-in"
                                            value={destination.checkInDate}
                                            onChange={(date) => setFieldValue(`tourDestinations.${index}.checkInDate`, date)}
                                            slotProps={{
                                              textField: {
                                                fullWidth: true,
                                                error: Boolean(
                                                  getIn(touched, `tourDestinations.${index}.checkInDate`) &&
                                                    getIn(errors, `tourDestinations.${index}.checkInDate`)
                                                ),
                                                helperText:
                                                  getIn(touched, `tourDestinations.${index}.checkInDate`) &&
                                                  getIn(errors, `tourDestinations.${index}.checkInDate`)
                                              }
                                            }}
                                          />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <DateTimePicker
                                            label="Ngày check-out"
                                            value={destination.checkOutDate}
                                            onChange={(date) => setFieldValue(`tourDestinations.${index}.checkOutDate`, date)}
                                            slotProps={{
                                              textField: {
                                                fullWidth: true,
                                                error: Boolean(
                                                  getIn(touched, `tourDestinations.${index}.checkOutDate`) &&
                                                    getIn(errors, `tourDestinations.${index}.checkOutDate`)
                                                ),
                                                helperText:
                                                  getIn(touched, `tourDestinations.${index}.checkOutDate`) &&
                                                  getIn(errors, `tourDestinations.${index}.checkOutDate`)
                                              }
                                            }}
                                          />
                                        </Grid>
                                      </>
                                    )}
                                  </Grid>
                                </Stack>
                              </Card>
                            ))}

                            <Button
                              startIcon={<PlusOutlined />}
                              onClick={() =>
                                push({
                                  title: '',
                                  description: '',
                                  startTime: null,
                                  endTime: null,
                                  checkInDate: null,
                                  checkOutDate: null,
                                  visitOrder: values.tourDestinations.length + 1,
                                  typeActivity: 0,
                                  driverId: null,
                                  accommodationId: null,
                                  activityId: null,
                                  tourGuides: []
                                })
                              }
                            >
                              Thêm điểm đến
                            </Button>
                          </Stack>
                        )}
                      </FieldArray>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Điểm hẹn"
                      name="gatheringLocation"
                      value={values.gatheringLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.gatheringLocation && errors.gatheringLocation)}
                      helperText={touched.gatheringLocation && errors.gatheringLocation}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Hướng dẫn viên cho toàn bộ gói
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      SelectProps={{
                        multiple: true,
                        renderValue: (selected: string[]) => {
                          const selectedGuides = tourGuides.filter((g) => selected.includes(g.guideId));
                          return selectedGuides.map((g) => g.account?.fullname).join(', ');
                        }
                      }}
                      label="Chọn hướng dẫn viên"
                      name="tourGuides"
                      value={values.tourGuides || []}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {tourGuides.map((guide) => (
                        <MenuItem key={guide.guideId} value={guide.guideId}>
                          {guide.account?.fullname} - {guide.account?.email}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" disabled={isSubmitting || uploading}>
                      Tạo gói du lịch
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CreateTourPackage;
