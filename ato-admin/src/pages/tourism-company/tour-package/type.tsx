import dayjs from 'dayjs';
import { TimeType } from '../../../types/tourism-facility/package.types';
import * as Yup from 'yup';

export interface Driver {
  driverId: string;
  driverName: string;
  phoneNumber: string;
  vehicleType: number;
  imgs: string[];
  isAvailable?: boolean;
  message?: string;
}
export interface Accommodation {
  accommodationId: string;
  accommodationName: string;
  accommodationDescription: string;
  address: string;
  phoneNumber: string;
  star: number;
  imgs?: string[];
}
export interface FormValues {
  packageName: string;
  description: string;
  imgs: string[];
  slot: number;
  priceOfChildren: number;
  priceOfAdults: number;
  childTicketAge?: string;
  startTime: dayjs.Dayjs | null;
  endTime: dayjs.Dayjs | null;
  durations: number;
  durationsType: TimeType;
  tourGuides: string[];
  gatheringLocation?: string;
  tourDestinations: {
    title: string;
    description: string;
    startTime: dayjs.Dayjs | null;
    endTime: dayjs.Dayjs | null;
    checkInDate: dayjs.Dayjs | null;
    checkOutDate: dayjs.Dayjs | null;
    visitOrder: number;
    typeActivity: number;
    driverId: string | null;
    accommodationId: string | null;
    activityId: string | null;
    tourGuides: { guideId: string }[];
  }[];
}

export const createTourInitialValues: FormValues = {
  packageName: '',
  description: '',
  imgs: [],
  slot: 0,
  priceOfAdults: 0,
  priceOfChildren: 0,
  childTicketAge: '',
  startTime: null,
  endTime: null,
  durations: 0,
  durationsType: TimeType.DAY,
  tourGuides: [],
  tourDestinations: [],
  gatheringLocation: ''
};

export const createTourPackageSchema = Yup.object().shape({
  packageName: Yup.string().required('Vui lòng nhập tên gói'),
  description: Yup.string(),
  slot: Yup.number().min(1, 'Số chỗ phải lớn hơn 0').required('Vui lòng nhập số chỗ'),
  priceOfAdults: Yup.number().min(0, 'Giá không được âm').required('Vui lòng nhập giá'),
  priceOfChildren: Yup.number().min(0, 'Giá không được âm').required('Vui lòng nhập giá'),
  startTime: Yup.date().required('Vui lòng chọn thời gian bắt đầu').min(new Date(), 'Thời gian bắt đầu phải trong tương lai'),
  endTime: Yup.date()
    .min(Yup.ref('startTime'), 'Thời gian kết thúc phải sau thời gian bắt đầu')
    .required('Vui lòng chọn thời gian kết thúc'),
  durations: Yup.number().min(0.5, 'Thời lượng phải lớn hơn 0.5').required('Vui lòng nhập thời lượng'),
  durationsType: Yup.string().required('Vui lòng chọn đơn vị thời gian'),
  tourGuides: Yup.array().of(Yup.string()).optional(),
  gatheringLocation: Yup.string().optional(),
  tourDestinations: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Vui lòng nhập tiêu đề'),
      description: Yup.string(),
      startTime: Yup.date().required('Vui lòng chọn thời gian bắt đầu').min(new Date(), 'Thời gian bắt đầu phải trong tương lai'),
      endTime: Yup.date()
        .required('Vui lòng chọn thời gian kết thúc')
        .min(Yup.ref('startTime'), 'Thời gian kết thúc phải sau thời gian bắt đầu'),
      visitOrder: Yup.number().required('Vui lòng nhập thứ tự'),
      typeActivity: Yup.number().required('Vui lòng chọn loại hoạt động')
    })
  )
});
