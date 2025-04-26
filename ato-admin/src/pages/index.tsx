import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_BASE_URL } from '../constants/admin-urls';
import { AUTHEN_URLs } from '../constants/authen-url';
import { RootState } from '../redux/store';
import { Role } from '../types';
import { TOURISM_FACILITY_BASE_URL } from '../constants/tourism-facility-urls';
import { CONTENT_MODERATOR_BASE_URL } from '../constants/content-moderator-urls';
import { TOURISM_COMPANY_BASE_URL } from '../constants/tourism-company-urls';
import { CircularProgress } from '@mui/material';
import { TOUR_GUIDE_BASE_URL } from '../constants/tour-guide-urls';

const Index = () => {
  const navigate = useNavigate();

  const user: any = useSelector((state: RootState) => state.authen.user);

  useEffect(() => {
    let url = AUTHEN_URLs.LOGIN;
    if (user !== null) {
      switch (user?.role as Role) {
        case 'Admin':
          url = ADMIN_BASE_URL;
          break;
        case 'TourGuides':
          url = TOUR_GUIDE_BASE_URL;
          break;
        case 'AgriculturalTourismFacilityOwners':
          url = TOURISM_FACILITY_BASE_URL;
          break;
        case 'ContentModerators':
          url = CONTENT_MODERATOR_BASE_URL;
          break;
        case 'TourismCompanies':
          url = TOURISM_COMPANY_BASE_URL;
          break;
      }
      navigate(url);
    } else {
      navigate(url);
    }
  }, [user]);
  return <CircularProgress />;
};

export default Index;
