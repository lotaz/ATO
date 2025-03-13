// assets
import { TeamOutlined } from '@ant-design/icons';
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
    }
  ]
};

export default tourCompanuMenu;
