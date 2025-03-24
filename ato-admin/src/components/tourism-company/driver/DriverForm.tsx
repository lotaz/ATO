import { Grid, MenuItem, TextField } from '@mui/material';
import { VehicleType } from '../../../types/tourism-company/driver.types';
import { MultipleFileUploader } from '../../upload/MultipleFileUploader';

interface DriverFormProps {
  values: any;
  touched: any;
  errors: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: (field: string, value: any) => void;
}

const DriverForm = ({ values, touched, errors, handleChange, handleBlur, setFieldValue }: DriverFormProps) => {
  const vehicles = [
    {
      value: VehicleType.CAR_4,
      label: 'Xe 4 chỗ'
    },
    {
      value: VehicleType.CAR_7,
      label: 'Xe 7 chỗ'
    },
    {
      value: VehicleType.CAR_16,
      label: 'Xe 16 chỗ'
    },
    {
      value: VehicleType.CAR_29,
      label: 'Xe 29 chỗ'
    },
    {
      value: VehicleType.CAR_45,
      label: 'Xe 45 chỗ'
    },
    {
      value: VehicleType.SLEEPER_BUS_SINGLE,
      label: 'Xe giường nằm đơn'
    },
    {
      value: VehicleType.SLEEPER_BUS_COUPLE,
      label: 'Xe giường nằm đôi'
    },
    {
      value: VehicleType.FLY,
      label: 'Máy bay'
    }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Tên tài xế"
          name="driverName"
          value={values.driverName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.driverName && errors.driverName)}
          helperText={touched.driverName && errors.driverName}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Số điện thoại"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          select
          fullWidth
          label="Loại xe"
          name="vehicleType"
          value={values.vehicleType}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.vehicleType && errors.vehicleType)}
          helperText={touched.vehicleType && errors.vehicleType}
        >
          {vehicles.map((vehicle) => (
            <MenuItem key={vehicle.value} value={vehicle.value}>
              {vehicle.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <MultipleFileUploader values={values.imgs || []} onChange={(urls) => setFieldValue('imgs', urls)} accept="image/*" maxFiles={5} />
      </Grid>
    </Grid>
  );
};

export default DriverForm;
