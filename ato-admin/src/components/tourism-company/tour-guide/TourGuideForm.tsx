import { Grid, MenuItem, TextField } from '@mui/material';
import { User } from '../../../services/admin/user.service';

interface TourGuideFormProps {
  values: any;
  touched: any;
  errors: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: (field: string, value: any) => void;
  users: User[];
}

const TourGuideForm = ({ values, touched, errors, handleChange, handleBlur, users }: TourGuideFormProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          select
          fullWidth
          label="Chọn người dùng"
          name="userId"
          value={values.userId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.userId && errors.userId)}
          helperText={touched.userId && errors.userId}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullname} - {user.email}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Giới thiệu"
          name="bio"
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.bio && errors.bio)}
          helperText={touched.bio && errors.bio}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ngôn ngữ"
          name="languages"
          value={values.languages}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.languages && errors.languages)}
          helperText={touched.languages && errors.languages}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Chuyên môn"
          name="expertiseArea"
          value={values.expertiseArea}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.expertiseArea && errors.expertiseArea)}
          helperText={touched.expertiseArea && errors.expertiseArea}
        />
      </Grid>
    </Grid>
  );
};

export default TourGuideForm;
