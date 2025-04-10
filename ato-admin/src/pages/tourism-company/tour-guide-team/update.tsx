import { useEffect, useState } from 'react';
import { tourGuideService } from '../../../services/tour-guide';
import { TourGuideResponse } from '../../../types/tourism-company/tour-guide.types';
import CreateTourGuide from './create';

const UpdateTourGuide = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [tourGuide, setTourGuide] = useState<TourGuideResponse | null>(null);

  useEffect(() => {
    const fetchTourGuide = async () => {
      if (id) {
        const data = await tourGuideService.getTourGuideById(id);
        setTourGuide(data);
      }
    };
    fetchTourGuide();
  }, [id]);

  if (!tourGuide) return null;

  return <CreateTourGuide initialValues={tourGuide} isUpdate />;
};

export default UpdateTourGuide;
