import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Top 10 Điểm Đến Đẹp Mê Hồn Năm 2025",
    paragraph:
      "Khám phá những địa điểm đẹp nhất để ghé thăm vào năm 2025, từ bãi biển hoang sơ đến những ngọn núi hùng vĩ.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Emma Watson",
      image: "/images/blog/author-01.jpg",
      designation: "Blogger Du Lịch",
    },
    tags: ["điểm đến", "mẹo du lịch"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Cách Du Lịch Tiết Kiệm: Mẹo & Thủ Thuật Thông Minh",
    paragraph:
      "Tìm hiểu cách tận hưởng chuyến đi của bạn mà không tốn kém quá nhiều với những mẹo du lịch thực tế này.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "John Doe",
      image: "/images/blog/author-02.png",
      designation: "Người Du Lịch Bụi & Nhà Văn",
    },
    tags: ["du lịch tiết kiệm", "mẹo"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Hướng Dẫn Những Chuyến Tàu Có Cảnh Đẹp Nhất Thế Giới",
    paragraph:
      "Trải nghiệm vẻ đẹp của thế giới qua ô cửa sổ tàu hỏa với những tuyến đường sắt tuyệt đẹp không thể bỏ lỡ này.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Sophia Lee",
      image: "/images/blog/author-03.png",
      designation: "Người Yêu Thích Phiêu Lưu",
    },
    tags: ["du lịch bằng tàu", "tuyến đường tuyệt đẹp"],
    publishDate: "2025",
  },
];

export default blogData;
