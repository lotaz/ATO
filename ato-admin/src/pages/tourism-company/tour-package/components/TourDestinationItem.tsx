import {
  CarOutlined,
  DeleteOutlined,
  HomeOutlined,
  InfoCircleFilled,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Box, Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getIn } from 'formik';
import { FormValues } from '../type';
import { Accommodation, Driver } from '../type';
import AppRichTextEditor from '../../../../components/AppRichTextEditor';
import { VehicleType } from '../../../../types/tourism-company/driver.types';

interface TourDestinationItemProps {
  destination: FormValues['tourDestinations'][number];
  index: number;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
  remove: (index: number) => void;
  touched: any;
  errors: any;
  drivers: Driver[];
  accommodations: Accommodation[];
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver | null) => void;
  selectedAccommodation: Accommodation | null;
  setSelectedAccommodation: (accommodation: Accommodation | null) => void;
  openPackageDialog: () => void;
}

const TourDestinationItem = ({
  destination,
  index,
  handleChange,
  handleBlur,
  setFieldValue,
  remove,
  touched,
  errors,
  drivers,
  accommodations,
  selectedDriver,
  setSelectedDriver,
  selectedAccommodation,
  setSelectedAccommodation,
  openPackageDialog
}: TourDestinationItemProps) => {
  const getVehicleTypeName = (value: VehicleType) => {
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
  };

  return (
    <Stack spacing={2} key={index} pr={4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button color="error" onClick={() => remove(index)} startIcon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tiêu đề"
            name={`tourDestinations.${index}.title`}
            value={destination.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(getIn(touched, `tourDestinations.${index}.title`) && getIn(errors, `tourDestinations.${index}.title`))}
            helperText={getIn(touched, `tourDestinations.${index}.title`) && getIn(errors, `tourDestinations.${index}.title`)}
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
                  getIn(touched, `tourDestinations.${index}.startTime`) && getIn(errors, `tourDestinations.${index}.startTime`)
                ),
                helperText:
                  (getIn(touched, `tourDestinations.${index}.startTime`) && getIn(errors, `tourDestinations.${index}.startTime`)) ||
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
                error: Boolean(getIn(touched, `tourDestinations.${index}.endTime`) && getIn(errors, `tourDestinations.${index}.endTime`)),
                helperText:
                  (getIn(touched, `tourDestinations.${index}.endTime`) && getIn(errors, `tourDestinations.${index}.endTime`)) ||
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
              getIn(touched, `tourDestinations.${index}.typeActivity`) && getIn(errors, `tourDestinations.${index}.typeActivity`)
            )}
            helperText={getIn(touched, `tourDestinations.${index}.typeActivity`) && getIn(errors, `tourDestinations.${index}.typeActivity`)}
          >
            <MenuItem value={0}>Hoạt động</MenuItem>
            <MenuItem value={1}>Lái xe</MenuItem>
            <MenuItem value={2}>Lưu trú</MenuItem>
          </TextField>
        </Grid>

        {destination.typeActivity === 0 && (
          <>
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" onClick={openPackageDialog} startIcon={<SearchOutlined />}>
                Chọn hoạt động từ gói du lịch
              </Button>
            </Grid>
          </>
        )}

        {destination.typeActivity === 1 && (
          <>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Tài xế"
                name={`tourDestinations.${index}.driverId`}
                value={destination.driverId || ''}
                onChange={(e) => {
                  handleChange(e);
                  const driver = drivers.find((d) => d.driverId === e.target.value);
                  setSelectedDriver(driver || null);
                }}
                error={Boolean(getIn(touched, `tourDestinations.${index}.driverId`) && getIn(errors, `tourDestinations.${index}.driverId`))}
                helperText={getIn(touched, `tourDestinations.${index}.driverId`) && getIn(errors, `tourDestinations.${index}.driverId`)}
              >
                <MenuItem value="">Chọn tài xế</MenuItem>
                {drivers.map((driver) => (
                  <MenuItem key={driver.driverId} value={driver.driverId} disabled={!driver.isAvailable}>
                    <Stack direction={'column'}>
                      <Typography fontWeight={'bold'}>{driver.driverName}</Typography>
                      <Typography>
                        <PhoneOutlined /> {driver.phoneNumber}
                      </Typography>
                      <Typography>
                        <CarOutlined /> {getVehicleTypeName(driver.vehicleType)}
                      </Typography>
                      {!driver.isAvailable && (
                        <Typography color={'red'}>
                          <InfoCircleFilled /> {driver.message}
                        </Typography>
                      )}
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        )}

        {destination.typeActivity === 2 && (
          <>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Chỗ ở"
                name={`tourDestinations.${index}.accommodationId`}
                value={destination.accommodationId || ''}
                onChange={(e) => {
                  handleChange(e);
                  const accommodation = accommodations.find((a) => a.accommodationId === e.target.value);
                  setSelectedAccommodation(accommodation || null);
                }}
                error={Boolean(
                  getIn(touched, `tourDestinations.${index}.accommodationId`) && getIn(errors, `tourDestinations.${index}.accommodationId`)
                )}
                helperText={
                  getIn(touched, `tourDestinations.${index}.accommodationId`) && getIn(errors, `tourDestinations.${index}.accommodationId`)
                }
              >
                <MenuItem value="">Chọn chỗ ở</MenuItem>
                {accommodations.map((accommodation) => (
                  <MenuItem key={accommodation.accommodationId} value={accommodation.accommodationId}>
                    <Stack direction={'column'}>
                      <Typography fontWeight={'bold'}>{accommodation.accommodationName}</Typography>
                      <Typography>
                        <PhoneOutlined /> {accommodation.phoneNumber}
                      </Typography>

                      <Typography>
                        <HomeOutlined /> {accommodation.address}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        )}

        <Grid item xs={12} sx={{ opacity: 0 }}>
          <TextField
            fullWidth
            type="hidden"
            label="Thứ tự"
            name={`tourDestinations.${index}.visitOrder`}
            value={destination.visitOrder}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(getIn(touched, `tourDestinations.${index}.visitOrder`) && getIn(errors, `tourDestinations.${index}.visitOrder`))}
            helperText={getIn(touched, `tourDestinations.${index}.visitOrder`) && getIn(errors, `tourDestinations.${index}.visitOrder`)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TourDestinationItem;
