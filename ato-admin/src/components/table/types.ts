// ... existing types

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
