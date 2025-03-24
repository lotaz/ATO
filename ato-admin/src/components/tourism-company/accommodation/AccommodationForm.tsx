import { Grid, TextField, Rating } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import { MultipleFileUploader } from '../../upload/MultipleFileUploader';

interface AccommodationFormProps {
  values: any;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
}

const AccommodationForm = ({ values, touched, errors, handleChange, handleBlur, setFieldValue }: AccommodationFormProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="accommodationName"
          label="Tên nhà nghỉ"
          value={values.accommodationName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.accommodationName && Boolean(errors.accommodationName)}
          helperText={touched.accommodationName && errors.accommodationName}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          name="phoneNumber"
          label="Số điện thoại"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          name="address"
          label="Địa chỉ"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          name="accommodationDescription"
          label="Mô tả"
          value={values.accommodationDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.accommodationDescription && Boolean(errors.accommodationDescription)}
          helperText={touched.accommodationDescription && errors.accommodationDescription}
        />
      </Grid>

      <Grid item xs={12}>
        <Rating
          name="star"
          value={values.star || 0}
          onChange={(_, newValue) => {
            setFieldValue('star', newValue);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <MultipleFileUploader values={values.imgs || []} onChange={(images) => setFieldValue('imgs', images)} />
      </Grid>
    </Grid>
  );
};

export default AccommodationForm;
