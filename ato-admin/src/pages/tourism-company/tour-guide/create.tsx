import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TourGuideForm from '../../../components/tourism-company/tour-guide/TourGuideForm';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { User, userService } from '../../../services/admin/user.service';

const CreateTourGuide = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getUsers();
      console.log(response, response);
      setUsers(response?.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('Vui lòng chọn người dùng'),
    bio: Yup.string().required('Vui lòng nhập giới thiệu'),
    languages: Yup.string().required('Vui lòng nhập ngôn ngữ'),
    expertiseArea: Yup.string().required('Vui lòng nhập chuyên môn')
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await tourGuideService.createTourGuide(values);
      navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX);
    } catch (error) {
      console.error('Failed to create tour guide:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Thêm hướng dẫn viên</Typography>
      </Stack>

      <Formik
        initialValues={{
          userId: '',
          bio: '',
          languages: '',
          expertiseArea: '',
          rating: 0
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Card>
                <TourGuideForm
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  users={users}
                />
              </Card>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
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

export default CreateTourGuide;
