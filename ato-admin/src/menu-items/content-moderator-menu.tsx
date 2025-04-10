// assets
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  CheckSquareOutlined,
  ExclamationCircleOutlined,
  NotificationOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { CONTENT_MODERATOR_URLs } from '../constants/content-moderator-urls';
import { TMenu } from './types';

const contentModeratorMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'news',
      title: 'Quản lý tin tức',
      type: 'item',
      url: CONTENT_MODERATOR_URLs.BLOG.INDEX,
      icon: NotificationOutlined,
      subItems: [
        {
          id: 'create-news',
          title: 'Thêm mới tin tức',
          type: 'item',
          url: CONTENT_MODERATOR_URLs.BLOG.CREATE,
          icon: ProfileOutlined
        },
        {
          id: 'view-news',
          title: 'Chi tiết tin tức',
          type: 'item',
          url: CONTENT_MODERATOR_URLs.BLOG.DETAILS,
          icon: ProfileOutlined
        },
        {
          id: 'update-news',
          title: 'Chỉnh sửa tin tức',
          type: 'item',
          url: CONTENT_MODERATOR_URLs.BLOG.UPDATE,
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: 'review',
      title: 'Quản lý đánh giá',
      type: 'item',
      url: CONTENT_MODERATOR_URLs.REVIEW.INDEX,
      icon: ExclamationCircleOutlined,
      subItems: [
        {
          id: 'view-review',
          title: 'Chi tiết đánh giá',
          type: 'item',
          url: CONTENT_MODERATOR_URLs.REVIEW.DETAILS,
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: 'certificate',
      title: 'Phê duyệt chứng chỉ',
      type: 'item',
      url: CONTENT_MODERATOR_URLs.CER.INDEX,
      icon: CheckSquareOutlined,
      subItems: [
        {
          id: 'view-review',
          title: 'Chi tiết chứng chỉ',
          type: 'item',
          url: CONTENT_MODERATOR_URLs.CER.DETAILS,
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: 'product',
      title: 'Phê duyệt sản phẩm',
      type: 'item',
      url: CONTENT_MODERATOR_URLs.PRODUCT.INDEX,
      icon: CheckCircleOutlined,
      subItems: [
        {
          id: 'view-review',
          title: 'Chi tiết sản phẩm',
          type: 'item',
          url: CONTENT_MODERATOR_URLs.PRODUCT.DETAILS,
          icon: ProfileOutlined
        }
      ]
    }
  ]
};

export default contentModeratorMenu;
