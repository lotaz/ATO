export type TColumn = {
  id: string;
  label?: string;
  minWidth?: number;
  align?: 'right' | 'left';
  hidden?: boolean;
  format?: (value: any) => any;
};

export type TAppTable = {
  columns: TColumn[];
  rows: any[];
  rowKey: 'id' | 'email' | 'driverId' | 'accommodationId' | 'guideId';
  handleViewDetails: (id: any) => void;
  handleUpdate: (id: any) => void;
};
export interface RequestData {
  id: string;
  title: string;
  sender: string;
  date: string;
  status: 'pending' | 'replied' | 'closed';
  priority: 'high' | 'medium' | 'low';
}

export interface RequestTableColumn {
  id: keyof RequestData;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}
