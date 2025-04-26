export enum StatusBooking {
  Processing = 0,
  Completed = 1,
  Canceled = 2,
  ConfirmBooking = 3
}

export interface UpdateBookingDestinationRequest {
  actualStartTime?: string;
  actualEndTime?: string;
  notes?: string;
  status: StatusBooking;
}
