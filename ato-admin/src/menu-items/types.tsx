export type TMenuItem = {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: any;
  target?: boolean;
  external?: boolean;
  disabled?: boolean;
  breadcrumbs?: boolean;
  subItems?: TMenuItem[];
};

export type TMenuType = 'group';

export type TMenu = {
  id: string;
  children: TMenuItem[];
  title?: string;
  type?: TMenuType;
};
export type TMenuGroup = {
  items: TMenu[];
};
