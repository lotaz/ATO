export type TColumn = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
};

export type TAppTable = {
  columns: TColumn[];
  rows: any[];
  rowKey: 'id' | 'email';
  handleViewDetails: (id: any) => void;
  handleUpdate: (id: any) => void;
};
