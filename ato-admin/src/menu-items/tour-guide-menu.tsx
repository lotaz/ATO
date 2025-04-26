// assets
import { BoxPlotOutlined, HeatMapOutlined } from '@ant-design/icons';
import { TOUR_GUIDE_URLs } from '../constants/tour-guide-urls';
import { TMenu } from './types';

const tourGuideMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'tour-packages',
      title: 'Quản lý lịch trình tour',
      type: 'item',
      url: TOUR_GUIDE_URLs.PACKAGE.INDEX,
      icon: BoxPlotOutlined,
      subItems: [
        {
          id: 'package-list',
          title: 'Danh sách tour ',
          type: 'item',
          url: TOUR_GUIDE_URLs.PACKAGE.INDEX,
          icon: BoxPlotOutlined,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default tourGuideMenu;
