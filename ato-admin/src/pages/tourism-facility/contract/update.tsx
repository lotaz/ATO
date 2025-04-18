import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TOURISM_FACILITY_URLs } from '../../../constants/tourism-facility-urls';
import { RootState } from '../../../redux/store';
import { fetchContract, updateContract } from '../../../redux/tourism-facility/contract.slice';
import { MultipleFileUploader } from '../../../components/upload/MultipleFileUploader';

const UpdateContract = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [images, setImages] = useState<string[]>([]);
  const { specific: contract, loading } = useSelector((state: RootState) => state.contractSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchContract(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (contract?.contractImgs) {
      setImages(contract.contractImgs);
    }
  }, [contract]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(
        updateContract({
          ...values,
          contractId: Number(id),
          contractImgs: images,
          startDate: dayjs(values.startDate).toISOString(),
          endDate: dayjs(values.endDate).toISOString(),
          signedDate: values.signedDate ? dayjs(values.signedDate).toISOString() : null
        })
      ).unwrap();
      navigate(TOURISM_FACILITY_URLs.CONTRACT.INDEX);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !contract) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_FACILITY_URLs.CONTRACT.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Cập nhật hợp đồng</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Formik
            initialValues={{
              companyId: contract.companyId,
              contractContent: contract.contractContent,
              discountRate: contract.discountRate,
              startDate: dayjs(contract.startDate),
              endDate: dayjs(contract.endDate),
              signedDate: contract.signedDate ? dayjs(contract.signedDate) : null
            }}
            validationSchema={Yup.object().shape({
              companyId: Yup.string().required('Vui lòng chọn công ty'),
              contractContent: Yup.string().required('Vui lòng nhập nội dung hợp đồng'),
              discountRate: Yup.number()
                .min(0, 'Tỷ lệ chiết khấu không được âm')
                .max(100, 'Tỷ lệ chiết khấu không được vượt quá 100%')
                .required('Vui lòng nhập tỷ lệ chiết khấu'),
              startDate: Yup.date().required('Vui lòng chọn ngày bắt đầu'),
              endDate: Yup.date().min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu').required('Vui lòng chọn ngày kết thúc')
            })}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      name="companyId"
                      label="Công ty du lịch"
                      value={values.companyId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.companyId && errors.companyId)}
                      helperText={touched.companyId && errors.companyId}
                    >
                      <MenuItem value="1">Công ty A</MenuItem>
                      <MenuItem value="2">Công ty B</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="contractContent"
                      label="Nội dung hợp đồng"
                      value={values.contractContent}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.contractContent && errors.contractContent)}
                      helperText={touched.contractContent && errors.contractContent}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="discountRate"
                      label="Tỷ lệ chiết khấu (%)"
                      value={values.discountRate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.discountRate && errors.discountRate)}
                      helperText={touched.discountRate && errors.discountRate}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="Ngày ký"
                      value={values.signedDate}
                      onChange={(date) => setFieldValue('signedDate', date)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="Ngày bắt đầu"
                      value={values.startDate}
                      onChange={(date) => setFieldValue('startDate', date)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="Ngày kết thúc"
                      value={values.endDate}
                      onChange={(date) => setFieldValue('endDate', date)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Hình ảnh hợp đồng
                    </Typography>
                    <MultipleFileUploader values={images} onChange={setImages} />
                  </Grid>

                  <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" disabled={isSubmitting}>
                      Cập nhật hợp đồng
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

export default UpdateContract;
