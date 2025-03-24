import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import DriverForm from '../../../components/tourism-company/driver/DriverForm';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { RootState } from '../../../redux/store';
import { fetchDriver, updateDriver } from '../../../redux/tourism-company/driver.slice';

const UpdateDriver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { specific: driver, loading } = useSelector((state: RootState) => state.driverSlice);

  useEffect(() => {
    if (id) {
      dispatch(fetchDriver(id));
    }
  }, [dispatch, id]);

  const validationSchema = Yup.object().shape({
    driverName: Yup.string().required('Vui lòng nhập tên tài xế'),
    phoneNumber: Yup.string()
      .matches(/^(84|0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    vehicleType: Yup.string().required('Vui lòng chọn loại xe'),
    imgs: Yup.array().of(Yup.string())
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(updateDriver({ id: id!, data: values })).unwrap();
      navigate(TOURISM_COMPANY_URLs.DRIVER.INDEX);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !driver) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.DRIVER.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Cập nhật tài xế</Typography>
      </Stack>

      <Formik
        initialValues={{
          driverName: driver.driverName,
          phoneNumber: driver.phoneNumber,
          vehicleType: driver.vehicleType,
          imgs: driver.imgs || []
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <DriverForm
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                  />
                </CardContent>
              </Card>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(TOURISM_COMPANY_URLs.DRIVER.INDEX)}>
                  Hủy
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting} startIcon={<SaveOutlined />}>
                  Lưu
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default UpdateDriver;
