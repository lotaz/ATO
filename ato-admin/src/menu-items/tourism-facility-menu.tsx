// assets
import { ProductOutlined } from '@ant-design/icons';
import { TOURISM_FACILITY_URLs } from '../constants/tourism-facility-urls';
import { TMenu } from './types';

const tourismFacilityMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'product',
      title: 'Quản lý sản phẩm',
      type: 'item',
      url: TOURISM_FACILITY_URLs.PRODUCT.INDEX,
      icon: ProductOutlined,
      subItems: [
        {
          id: 'create-product',
          title: 'Thêm mới sản phẩm',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.CREATE,
          icon: ProductOutlined
        },
        {
          id: 'view-product',
          title: 'Thông tin sản phẩm',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.DETAILS,
          icon: ProductOutlined
        },
        {
          id: 'update-product',
          title: 'Chỉnh sửa thông tin sản phẩm',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.UPDATE,
          icon: ProductOutlined
        }
      ]
    }
  ]
};

export default tourismFacilityMenu;
