import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  ImageList,
  ImageListItem,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { TimeType } from '../../../types/tourism-facility/package.types';
import { DurationType } from '../../../types/tourism-company/tour-package.types';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';

interface FormValues {
  packageName: string;
  description: string;
  imgs: string[];
  slot: number;
  price: number;
  startTime: Date | null;
  endTime: Date | null;
  durations: number;
  durationsType: TimeType;
  tourGuides: string[];
}

const CreateTourPackage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required('Vui lòng nhập tên gói'),
    description: Yup.string(),
    slot: Yup.number().min(1, 'Số chỗ phải lớn hơn 0').required('Vui lòng nhập số chỗ'),
    price: Yup.number().min(0, 'Giá không được âm').required('Vui lòng nhập giá'),
    startTime: Yup.date().required('Vui lòng chọn thời gian bắt đầu'),
    endTime: Yup.date()
      .min(Yup.ref('startTime'), 'Thời gian kết thúc phải sau thời gian bắt đầu')
      .required('Vui lòng chọn thời gian kết thúc'),
    durations: Yup.number().min(0.5, 'Thời lượng phải lớn hơn 0.5').required('Vui lòng nhập thời lượng'),
    durationsType: Yup.string().required('Vui lòng chọn đơn vị thời gian'),
    tourGuides: Yup.array().of(Yup.string())
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    currentImages: string[]
  ) => {
    const files = event.target.files;
    if (!files?.length) return;

    try {
      setUploading(true);
      const response = await agriculturalTourService.uploadImages(Array.from(files));
      setFieldValue('imgs', [...currentImages, ...response.data]);
    } catch (error) {
      console.error('Failed to upload images:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const requestData = {
        ...values,
        tourGuides: values.tourGuides.map((guideId) => ({ guideId }))
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
          <Formik
            initialValues={{
              packageName: '',
              description: '',
              imgs: [],
              slot: 0,
              price: 0,
              startTime: null,
              endTime: null,
              durations: 0,
              durationsType: TimeType.DAY,
              tourGuides: []
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Giá (VNĐ)"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DateTimePicker
                      label="Thời gian bắt đầu"
                      value={values.startTime}
                      onChange={(date) => setFieldValue('startTime', date)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DateTimePicker label="Thời gian kết thúc" value={values.endTime} onChange={(date) => setFieldValue('endTime', date)} />
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

                  {/* Add tour guide selection */}
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      SelectProps={{
                        multiple: true,
                        renderValue: (selected: any) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value: string) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )
                      }}
                      label="Hướng dẫn viên"
                      name="tourGuides"
                      value={values.tourGuides}
                      onChange={handleChange}
                      error={Boolean(touched.tourGuides && errors.tourGuides)}
                      helperText={touched.tourGuides && errors.tourGuides}
                    >
                      {/* Add your tour guide options here */}
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
