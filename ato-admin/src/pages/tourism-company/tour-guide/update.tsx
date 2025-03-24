import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import TourGuideForm from '../../../components/tourism-company/tour-guide/TourGuideForm';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { tourGuideService } from '../../../services/tourism-company/tour-guide.service';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';

const UpdateTourGuide = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tourGuide, setTourGuide] = useState<TourGuideResponse | null>(null);

  useEffect(() => {
    if (id) {
      fetchTourGuide(id);
    }
  }, [id]);

  const fetchTourGuide = async (guideId: string) => {
    try {
      const response = await tourGuideService.getTourGuide(guideId);
      setTourGuide(response);
    } catch (error) {
      console.error('Failed to fetch tour guide:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    bio: Yup.string().required('Vui lòng nhập giới thiệu'),
    languages: Yup.string().required('Vui lòng nhập ngôn ngữ'),
    expertiseArea: Yup.string().required('Vui lòng nhập chuyên môn')
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (id) {
        await tourGuideService.updateTourGuide(id, values);
        navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX);
      }
    } catch (error) {
      console.error('Failed to update tour guide:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!tourGuide) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Cập nhật hướng dẫn viên</Typography>
      </Stack>

      <Formik
        initialValues={{
          bio: tourGuide.bio || '',
          languages: tourGuide.languages || '',
          expertiseArea: tourGuide.expertiseArea || '',
          rating: tourGuide.rating,
          account: tourGuide.account
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

export default UpdateTourGuide;
