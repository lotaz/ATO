// assets
import { BoxPlotOutlined, TeamOutlined } from '@ant-design/icons';
import { TOURISM_COMPANY_URLs } from '../constants/tourism-company-urls';
import { TMenu } from './types';

const tourCompanuMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'tour-guide-team',
      title: 'Quản lý hướng dẫn viên',
      type: 'item',
      url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX,
      icon: TeamOutlined,
      subItems: [
        {
          id: 'create-tour-guide',
          title: 'Thêm hướng dẫn viên',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.CREATE,
          icon: TeamOutlined
        },
        {
          id: 'request-tour-guide',
          title: 'Yêu cầu làm hướng dẫn viên',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.REQUEST,
          icon: TeamOutlined
        }
      ]
    },
    {
      id: 'tour-package',
      title: 'Quản lý gói du lịch',
      type: 'item',
      url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX,
      icon: BoxPlotOutlined,
      subItems: [
        {
          id: 'create-tour-package',
          title: 'Thêm gói du lịch',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.CREATE,
          icon: BoxPlotOutlined
        },
        {
          id: 'view-tour-package',
          title: 'Chi tiết gói du lịch',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS,
          icon: BoxPlotOutlined
        },
        {
          id: 'update-tour-package',
          title: 'Cập nhật gói du lịch',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.UPDATE,
          icon: BoxPlotOutlined
        }
      ]
    }
  ]
};

export default tourCompanuMenu;
