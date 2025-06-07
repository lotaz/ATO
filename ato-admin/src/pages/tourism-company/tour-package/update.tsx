import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { agriculturalTourService } from '../../../services/tourism-company/agricultural-tour.service';
import { FormValues } from './type';
import TourPackageForm from './components/TourPackageForm';
import { useTourPackageData } from './hooks/useTourPackageData';
import dayjs from 'dayjs';
import { TimeType } from '../../../types/tourism-facility/package.types';
import { enqueueSnackbar } from 'notistack';

const UpdateTourPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [tourPackage, setTourPackage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {
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
  } = useTourPackageData(id);

  // Fetch package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!id) {
        navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX);
        return;
      }

      try {
        setLoading(true);
        const response = await agriculturalTourService.getPackageById(id);
        setTourPackage(response.data);
      } catch (error) {
        console.error('Failed to fetch package details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id, navigate]);

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const requestData = {
        ...values,
        tourGuides: values?.tourGuides?.map((guideId) => ({ guideId }))
      };

      if (id) {
        const response = await agriculturalTourService.updatePackage(id, requestData as any);
        const data = response.data;

        if (data.status === false) {
          enqueueSnackbar(data.message, { variant: 'error' });
          return;
        }
      }
      navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX);
    } catch (error) {
      console.error('Failed to update package:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !tourPackage) {
    return <Typography>Loading...</Typography>;
  }

  console.log(tourPackage); // Log the tourPackage object t

  const initialValues = {
    packageName: tourPackage?.packageName || '',
    description: tourPackage?.description || '',
    imgs: tourPackage?.imgs || [],
    slot: tourPackage?.slot || 0,
    priceOfAdults: tourPackage?.priceOfAdults || 0,
    priceOfChildren: tourPackage?.priceOfChildren || 0,
    childTicketAge: tourPackage?.childTicketAge || '',
    startTime: tourPackage?.startTime ? dayjs(tourPackage?.startTime) : null,
    endTime: tourPackage?.endTime ? dayjs(tourPackage?.endTime) : null,
    durations: tourPackage?.durations || 0,
    durationsType: tourPackage?.durationsType || TimeType.DAY,
    tourGuides: tourPackage?.tourGuides?.map((g: any) => g.guideId) || [],
    statusActive: tourPackage?.statusActive ?? 1,
    gatheringLocation: tourPackage?.gatheringLocation || '',
    tourDestinations:
      tourPackage?.tourDestinations?.map((dest: any) => ({
        title: dest.title || '',
        description: dest.description || '',
        startTime: dest.startTime ? dayjs(dest.startTime) : null,
        endTime: dest.endTime ? dayjs(dest.endTime) : null,
        checkInDate: dest.checkInDate ? dayjs(dest.checkInDate) : null,
        checkOutDate: dest.checkOutDate ? dayjs(dest.checkOutDate) : null,
        visitOrder: dest.visitOrder || 0,
        typeActivity: dest.typeActivity || 0,
        driverId: dest?.driver?.driverId || null,
        accommodationId: dest?.accommodation?.accommodationId || null,
        activityId: dest.activityId || null,
        tourGuides: dest.tourGuides || [],
        maxCapacity: dest.maxCapacity || 0,
        currentCapacity: dest.currentCapacity || 0
      })) || []
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Cập nhật tour du lịch</Typography>
      </Stack>

      <Formik initialValues={initialValues} validationSchema={null} onSubmit={handleSubmit}>
        {(formikProps) => (
          <TourPackageForm
            isEdit={true}
            formik={formikProps as any}
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

export default UpdateTourPackage;
