import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AccommodationForm from '../../../components/tourism-company/accommodation/AccommodationForm';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { useDispatch } from 'react-redux';
import { createAccommodation } from '../../../redux/tourism-company/accommodation.slice';

const CreateAccommodation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const validationSchema = Yup.object().shape({
    accommodationName: Yup.string().required('Vui lòng nhập tên nhà nghỉ'),
    phoneNumber: Yup.string()
      .matches(/^(84|0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    star: Yup.number().min(0).max(5).nullable()
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await dispatch(createAccommodation(values)).unwrap();
      navigate(TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Thêm nhà nghỉ mới</Typography>
      </Stack>

      <Formik
        initialValues={{
          accommodationName: '',
          phoneNumber: '',
          address: '',
          accommodationDescription: '',
          star: null,
          imgs: []
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <AccommodationForm
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
                <Button variant="outlined" onClick={() => navigate(TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX)}>
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

export default CreateAccommodation;
