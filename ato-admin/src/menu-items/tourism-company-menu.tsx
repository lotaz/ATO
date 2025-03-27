// assets
import { BoxPlotOutlined, TeamOutlined, CarOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import { TOURISM_COMPANY_URLs } from '../constants/tourism-company-urls';
import { TMenu } from './types';

const tourCompanuMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
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
    },
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
          id: 'view-tour-guide',
          title: 'Danh sách hướng dẫn viên',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX,
          icon: TeamOutlined
        }
      ]
    },
    {
      id: 'driver',
      title: 'Quản lý tài xế',
      type: 'item',
      url: TOURISM_COMPANY_URLs.DRIVER.INDEX,
      icon: CarOutlined,
      subItems: [
        {
          id: 'create-driver',
          title: 'Thêm tài xế',
          type: 'item',
          url: TOURISM_COMPANY_URLs.DRIVER.CREATE,
          icon: CarOutlined
        },
        {
          id: 'view-driver',
          title: 'Chi tiết tài xế',
          type: 'item',
          url: TOURISM_COMPANY_URLs.DRIVER.DETAILS,
          icon: CarOutlined
        },
        {
          id: 'update-driver',
          title: 'Cập nhật tài xế',
          type: 'item',
          url: TOURISM_COMPANY_URLs.DRIVER.UPDATE,
          icon: CarOutlined
        },
        {
          id: 'accommodation',
          title: 'Quản lý nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX,
          icon: HomeOutlined,
          subItems: [
            {
              id: 'create-accommodation',
              title: 'Thêm nhà nghỉ',
              type: 'item',
              url: TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE,
              icon: HomeOutlined
            },
            {
              id: 'view-accommodation',
              title: 'Chi tiết nhà nghỉ',
              type: 'item',
              url: TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS,
              icon: HomeOutlined
            },
            {
              id: 'update-accommodation',
              title: 'Cập nhật nhà nghỉ',
              type: 'item',
              url: TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE,
              icon: HomeOutlined
            }
          ]
        }
      ]
    },
    {
      id: 'accommodation',
      title: 'Quản lý nhà nghỉ',
      type: 'item',
      url: TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX,
      icon: HomeOutlined,
      subItems: [
        {
          id: 'create-accommodation',
          title: 'Thêm nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE,
          icon: HomeOutlined
        },
        {
          id: 'view-accommodation',
          title: 'Chi tiết nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS,
          icon: HomeOutlined
        },
        {
          id: 'update-accommodation',
          title: 'Cập nhật nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE,
          icon: HomeOutlined
        }
      ]
    }
  ]
};

export default tourCompanuMenu;
