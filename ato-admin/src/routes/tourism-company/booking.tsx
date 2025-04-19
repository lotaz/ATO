import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import BookingList from '../../pages/tourism-company/book_tour/booking-list';
import { TRouteItem } from '../types';

const BookingRoutes: TRouteItem[] = [
  {
    path: TOURISM_COMPANY_URLs.BOOKING.INDEX,
    element: <BookingList />
  }
];

export default BookingRoutes;