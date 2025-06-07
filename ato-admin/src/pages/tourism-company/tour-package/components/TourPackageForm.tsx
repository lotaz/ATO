import {
  CloseCircleOutlined,
  DeleteOutlined,
  GlobalOutlined,
  InfoCircleFilled,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  TrophyOutlined,
  XFilled
} from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Tabs,
  Tab,
  Box,
  Slider,
  Avatar,
  Chip,
  IconButton,
  Alert,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FieldArray, FormikProps } from 'formik';
import { useState } from 'react';
import { MultipleFileUploader } from '../../../../components/upload/MultipleFileUploader';
import { DurationType } from '../../../../types/tourism-company/tour-package.types';
import { FormValues } from '../type';
import TourDestinationItem from './TourDestinationItem';
import PackageDialog from './PackageDialog';
import { TourismPackageResponse } from '../../../../services/tourism-company/tourism-package.service';
import { TourGuideResponse } from '../../../../types/tourism-company/tour-guide.types';
import { Accommodation, Driver } from '../type';
import AppRichTextEditor from '../../../../components/AppRichTextEditor';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ActivityResponse } from '../../../../types/tourism-facility/package.types';

interface TourPackageFormProps {
  isEdit?: boolean;
  formik: FormikProps<FormValues>;
  tourGuides: TourGuideResponse[];
  drivers: Driver[];
  accommodations: Accommodation[];
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver | null) => void;
  selectedAccommodation: Accommodation | null;
  setSelectedAccommodation: (accommodation: Accommodation | null) => void;
  filteredPackages: TourismPackageResponse[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tour-package-tabpanel-${index}`}
      aria-labelledby={`tour-package-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tour-package-tab-${index}`,
    'aria-controls': `tour-package-tabpanel-${index}`
  };
}

const TourPackageForm = ({
  isEdit = false,
  formik,
  tourGuides,
  drivers,
  accommodations,
  selectedDriver,
  setSelectedDriver,
  selectedAccommodation,
  setSelectedAccommodation,
  filteredPackages,
  searchTerm,
  setSearchTerm
}: TourPackageFormProps) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = formik;
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState<number | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleOpenPackageDialog = (index: number) => {
    setCurrentDestinationIndex(index);
    setOpenPackageDialog(true);
  };

  const handleSelectPackage = (pkg: ActivityResponse) => {
    if (currentDestinationIndex !== null) {
      setFieldValue(`tourDestinations.${currentDestinationIndex}.activityId`, pkg.activityId);
      setFieldValue(`tourDestinations.${currentDestinationIndex}.title`, pkg.activityName);
      setFieldValue(`tourDestinations.${currentDestinationIndex}.description`, pkg.description);
    }
    setOpenPackageDialog(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle drag end event
  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // If the item didn't move, do nothing
    if (sourceIndex === destinationIndex) {
      return;
    }

    // Create a copy of the destinations array
    const destinations = [...values.tourDestinations];

    // Remove the dragged item from the array
    const [removed] = destinations.splice(sourceIndex, 1);

    // Insert the item at the new position
    destinations.splice(destinationIndex, 0, removed);

    // Update the visitOrder for each destination
    const updatedDestinations = destinations.map((dest, index) => ({
      ...dest,
      visitOrder: index + 1
    }));

    // Update the form values
    setFieldValue('tourDestinations', updatedDestinations);
  };

  console.log(formik.values.statusActive);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="tour package form tabs">
              <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
              <Tab label="Thời gian & Giá" {...a11yProps(1)} />
              <Tab label="Điểm đến" {...a11yProps(2)} />
              <Tab label="Hình ảnh" {...a11yProps(3)} />
              <Tab label="Hướng dẫn viên" {...a11yProps(4)} />
            </Tabs>
          </Box>

          {/* Tab 1: Basic Information */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <Typography id="slot-slider" gutterBottom>
                  Số chỗ: {values.slot}
                </Typography>
                <Slider
                  aria-labelledby="slot-slider"
                  value={typeof values.slot === 'number' ? values.slot : 0}
                  onChange={(_, newValue) => {
                    setFieldValue('slot', newValue);
                  }}
                  onBlur={handleBlur}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={100}
                  name="slot"
                />
                {Boolean(touched.slot && errors.slot) && (
                  <Typography color="error" variant="caption">
                    {errors.slot}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <AppRichTextEditor
                  label="Mô tả"
                  value={values.description}
                  handleChange={(value) => setFieldValue('description', value)}
                  error={Boolean(touched.description && errors.description)}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <AppRichTextEditor
                  label="Điểm hẹn"
                  value={values.gatheringLocation}
                  handleChange={(value) => setFieldValue('gatheringLocation', value)}
                  error={Boolean(touched.gatheringLocation && errors.gatheringLocation)}
                  helperText={errors.gatheringLocation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.statusActive === 0}
                      onChange={(e) => formik.setFieldValue('statusActive', e.target.checked ? 0 : 1)}
                      name="statusActive"
                    />
                  }
                  label="Đang hoạt động"
                />{' '}
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 2: Time & Price */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
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

              <Grid item xs={12}>
                <Typography id="durations-slider" gutterBottom>
                  Thời lượng: {values.durations}
                </Typography>
                <Slider
                  aria-labelledby="durations-slider"
                  value={typeof values.durations === 'number' ? values.durations : 0}
                  onChange={(_, newValue) => {
                    setFieldValue('durations', newValue);
                  }}
                  onBlur={handleBlur}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={100}
                  name="durations"
                />
                {Boolean(touched.durations && errors.durations) && (
                  <Typography color="error" variant="caption">
                    {errors.durations}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
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
            </Grid>
          </TabPanel>

          {/* Tab 3: Destinations */}
          <TabPanel value={tabValue} index={2}>
            <FieldArray name="tourDestinations">
              {({ push, remove }) => (
                <Stack spacing={2}>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="tourDestinations">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {(values.tourDestinations || []).map((destination, index) => (
                            <Draggable key={`destination-${index}`} draggableId={`destination-${index}`} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    marginBottom: '16px'
                                  }}
                                >
                                  <Card
                                    variant="outlined"
                                    sx={{
                                      backgroundColor: snapshot.isDragging ? '#f0f7ff' : 'inherit',
                                      boxShadow: snapshot.isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'inherit'
                                    }}
                                  >
                                    <Box
                                      {...provided.dragHandleProps}
                                      sx={{
                                        p: 1,
                                        m: 0,
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: 1,
                                        cursor: 'grab',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <Typography variant="subtitle1">Điểm đến {index + 1}</Typography>
                                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        Kéo để sắp xếp
                                      </Typography>
                                    </Box>
                                    <TourDestinationItem
                                      destination={destination}
                                      index={index}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      setFieldValue={setFieldValue}
                                      remove={remove}
                                      touched={touched}
                                      errors={errors}
                                      drivers={drivers}
                                      accommodations={accommodations}
                                      selectedDriver={selectedDriver}
                                      setSelectedDriver={setSelectedDriver}
                                      selectedAccommodation={selectedAccommodation}
                                      setSelectedAccommodation={setSelectedAccommodation}
                                      openPackageDialog={() => handleOpenPackageDialog(index)}
                                    />
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div>
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<PlusOutlined />}
                      onClick={() =>
                        push({
                          title: '',
                          description: '',
                          startTime: null,
                          endTime: null,
                          typeActivity: 0,
                          visitOrder: values.tourDestinations.length + 1,
                          packageId: null,
                          driverId: null,
                          accommodationId: null
                        })
                      }
                    >
                      Thêm điểm đến
                    </Button>
                  </div>
                </Stack>
              )}
            </FieldArray>
          </TabPanel>

          {/* Tab 4: Tour Guides & Images */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Hình ảnh
                </Typography>
                <MultipleFileUploader values={values.imgs} onChange={(urls) => setFieldValue('imgs', urls)} accept="image/*" maxFiles={5} />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  SelectProps={{ multiple: true }}
                  label="Hướng dẫn viên"
                  name="tourGuides"
                  value={values.tourGuides}
                  onChange={handleChange}
                  error={Boolean(touched.tourGuides && errors.tourGuides)}
                  helperText={touched.tourGuides && errors.tourGuides}
                >
                  {tourGuides.map((guide) => (
                    <MenuItem
                      value={guide.guideId}
                      disabled={!guide.isAvailable} // Optionally disable the MenuItem
                    >
                      <Stack direction={'column'}>
                        <Typography fontWeight={'bold'}>{guide.account?.fullname}</Typography>
                        <Typography>
                          <PhoneOutlined /> {guide.account?.phoneNumber}
                        </Typography>
                        <Typography>
                          <MailOutlined /> {guide.account?.email}
                        </Typography>
                        {!guide.isAvailable && (
                          <Typography color={'red'}>
                            <InfoCircleFilled /> {guide.message}
                          </Typography>
                        )}
                      </Stack>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                {values.tourGuides && values.tourGuides.length > 0 ? (
                  <Grid container spacing={3}>
                    {values.tourGuides.map((guide, index) => {
                      const selectedGuide = tourGuides.find((g) => g.guideId === guide);
                      if (!selectedGuide) return null;

                      return (
                        <Grid item xs={12} md={6} key={index}>
                          <Card
                            variant="outlined"
                            sx={{
                              '&:hover': {
                                boxShadow: 3,
                                transition: 'box-shadow 0.3s ease-in-out'
                              }
                            }}
                          >
                            <CardContent>
                              <Stack spacing={2}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                  <Avatar
                                    sx={{
                                      width: 64,
                                      height: 64,
                                      bgcolor: 'primary.main'
                                    }}
                                    src={selectedGuide.account?.avatarURL}
                                  >
                                    {selectedGuide.account?.fullname?.charAt(0)}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="h6" gutterBottom>
                                      {selectedGuide.account?.fullname}
                                    </Typography>
                                    <Chip
                                      icon={<TrophyOutlined />}
                                      label={`${selectedGuide.expertiseArea} `}
                                      size="small"
                                      color="primary"
                                      variant="outlined"
                                    />
                                  </Box>
                                </Stack>

                                <Stack spacing={1}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <MailOutlined style={{ color: 'text.secondary' }} />
                                    <Typography>{selectedGuide.account?.email}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneOutlined style={{ color: 'text.secondary' }} />
                                    <Typography>{selectedGuide.account?.phoneNumber}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <GlobalOutlined style={{ color: 'text.secondary' }} />
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                      {selectedGuide.languages
                                        ?.split(',')
                                        .map((language, idx) => (
                                          <Chip key={idx} label={language.trim()} size="small" variant="outlined" sx={{ margin: '2px' }} />
                                        ))}
                                    </Stack>
                                  </Box>
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <Typography>Không có hướng dẫn viên nào</Typography>
                )}
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Submit Button - Always visible */}
      <Box sx={{ mt: 3 }}>
        <Button fullWidth type="submit" variant="contained" disabled={formik.isSubmitting}>
          {isEdit ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </Box>

      <PackageDialog
        open={openPackageDialog}
        onClose={() => setOpenPackageDialog(false)}
        packages={filteredPackages}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelectPackage={handleSelectPackage}
      />
    </form>
  );
};

export default TourPackageForm;
