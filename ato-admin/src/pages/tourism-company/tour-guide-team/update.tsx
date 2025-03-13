import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tourGuideService } from '../../../services/tour-guide';
import { ITourGuide } from '../../../services/tour-guide/types';
import CreateTourGuide from './create';

const UpdateTourGuide = () => {
  const { id } = useParams();
  const [tourGuide, setTourGuide] = useState<ITourGuide | null>(null);

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
