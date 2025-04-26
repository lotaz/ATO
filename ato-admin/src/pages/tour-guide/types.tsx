export interface BookingTourDestination {
  bookingDestinationId?: string;
  tourId: string;
  tourDestinationId: string;
  actualStartTime?: Date;
  actualEndTime?: Date;
  notes?: string;
  status: BookingDestinationStatus;
}

export enum BookingDestinationStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Canceled = 3,
  Skipped = 4
}
