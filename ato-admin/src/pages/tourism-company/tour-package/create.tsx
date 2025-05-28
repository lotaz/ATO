import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { createTourInitialValues, createTourPackageSchema, FormValues } from './type';
import TourPackageForm from './components/TourPackageForm';
import { useTourPackageData } from './hooks/useTourPackageData';

const CreateTourPackage = () => {
  const navigate = useNavigate();
  const {
    uploading,
    drivers,
    selectedDriver,
    setSelectedDriver,
    accommodations,
    selectedAccommodation,
    setSelectedAccommodation,
    tourGuides,
    searchTerm,
    setSearchTerm,
    filteredPackages
  } = useTourPackageData();

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const requestData = {
        ...values,
        tourGuides: values?.tourGuides?.map((guideId) => ({ guideId }))
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

      <Formik initialValues={createTourInitialValues} validationSchema={createTourPackageSchema} onSubmit={handleSubmit}>
        {(formikProps) => (
          <TourPackageForm
            formik={formikProps}
            tourGuides={tourGuides}
            drivers={drivers}
            accommodations={accommodations}
            selectedDriver={selectedDriver}
            setSelectedDriver={setSelectedDriver}
            selectedAccommodation={selectedAccommodation}
            setSelectedAccommodation={setSelectedAccommodation}
            filteredPackages={filteredPackages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </Formik>
    </Stack>
  );
};

export default CreateTourPackage;
