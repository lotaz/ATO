import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Giới thiệu",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Tin tức",
    path: "/blog",
    newTab: false,
  },
  {
    id: 4,
    title: "Sản phẩm OCOP",
    path: "/blog",
    newTab: false,
  },
  {
    id: 5,
    title: "Khám phá",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Hoạt động du lịch",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Vẻ đẹp vùng quê",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Mô hình trải nghiệm",
        path: "/blog",
        newTab: false,
      },
    ],
  },
  {
    id: 66,
    title: "Liên hệ",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
