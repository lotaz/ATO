import { Grid, MenuItem, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Driver } from '../../../types/tourism-company/tour-destination.types';

interface TransportFormProps {
  values: any;
  touched: any;
  errors: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: (field: string, value: any) => void;
}

const TransportForm = ({ values, touched, errors, handleChange, handleBlur, setFieldValue }: TransportFormProps) => {
  // Mock data - replace with API call
  const [drivers] = useState<Driver[]>([
    { id: 1, name: 'Nguyễn Văn A', age: 35, phone: '0123456789', vehicle: 'Toyota 16 chỗ - 30A-12345' },
    { id: 2, name: 'Trần Văn B', age: 42, phone: '0987654321', vehicle: 'Hyundai 29 chỗ - 30A-54321' }
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Chọn tài xế"
          name="driverId"
          value={values.driverId || ''}
          onChange={(e) => {
            handleChange(e);
            const selectedDriver = drivers.find((d) => d.id === Number(e.target.value));
            if (selectedDriver) {
              setFieldValue('driver', {
                name: selectedDriver.name,
                age: selectedDriver.age,
                phone: selectedDriver.phone,
                vehicle: selectedDriver.vehicle
              });

              setFieldValue('driverId', selectedDriver.id);
            }
          }}
          onBlur={handleBlur}
          error={Boolean(touched.driverId && errors.driverId)}
          helperText={touched.driverId && errors.driverId}
        >
          {drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.id}>
              {driver.name} - {driver.vehicle}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {values.driver && (
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth disabled label="Tên tài xế" value={values.driver.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth disabled label="Tuổi" value={values.driver.age} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth disabled label="Số điện thoại" value={values.driver.phone} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth disabled label="Thông tin phương tiện" value={values.driver.vehicle} />
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} md={6}>
        <DateTimePicker
          label="Thời gian khởi hành"
          value={values.departureTime}
          onChange={(date) => setFieldValue('departureTime', date)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: Boolean(touched.departureTime && errors.departureTime),
              helperText: touched.departureTime && errors.departureTime
            }
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DateTimePicker
          label="Thời gian đến"
          value={values.arrivalTime}
          onChange={(date) => setFieldValue('arrivalTime', date)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: Boolean(touched.arrivalTime && errors.arrivalTime),
              helperText: touched.arrivalTime && errors.arrivalTime
            }
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Ghi chú"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.notes && errors.notes)}
          helperText={touched.notes && errors.notes}
        />
      </Grid>
    </Grid>
  );
};

export default TransportForm;
