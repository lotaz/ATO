import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import BlogCard2 from "components/blog-cards/BlogCard2";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { useState } from "react";
import { H2 } from "components/Typography";
import Footer from "components/footer/Footer";
import api from "utils/__api__/healthbeauty-shop";

const BlogsPage = ({ blogs }) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 6;

  // Categories for blogs
  const categories = [
    { label: "Tất cả", value: "all" },
    { label: "Tin tức", value: "news" },
    { label: "Sự kiện", value: "event" },
    { label: "Du lịch", value: "travel" },
    { label: "Nông nghiệp", value: "agriculture" },
  ];

  // Filter blogs based on search and category
  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "event" && blog.blogType === 0) ||
      (selectedCategory === "news" && blog.blogType === 1);
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs?.length / itemsPerPage);
  const currentBlogs = filteredBlogs?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ShopLayout2>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            backgroundImage: "url('/assets/small-banners/blur-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: { xs: 6, md: 10 },
            mb: 6,
          }}
        >
          <Container maxWidth="lg">
            <H2 color="white" textAlign="center" mb={2}>
              Tin tức & Sự kiện
            </H2>
            <Typography color="white" textAlign="center" mb={4}>
              Cập nhật tin tức mới nhất về du lịch nông nghiệp
            </Typography>

            {/* Search Bar */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Tìm kiếm bài viết..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 600,
                mx: "auto",
                display: "block",
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                },
              }}
            />
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Blog Categories */}
            <Grid item xs={12} mb={4}>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                gap={1}
                justifyContent="center"
              >
                {categories.map((category) => (
                  <Chip
                    key={category.value}
                    label={category.label}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setPage(1);
                    }}
                    color={
                      selectedCategory === category.value
                        ? "primary"
                        : "default"
                    }
                    sx={{
                      fontSize: "1rem",
                      py: 2.5,
                      "&:hover": { bgcolor: "primary.light", color: "white" },
                    }}
                  />
                ))}
              </Stack>
            </Grid>

            {/* Blogs Grid or Not Found */}
            {currentBlogs?.length > 0 ? (
              <Grid container spacing={4}>
                {currentBlogs.map((blog) => (
                  <Grid item xs={12} md={4} key={blog.blogId}>
                    <BlogCard2
                      id={blog.blogId}
                      title={blog.title}
                      date={blog.createDate}
                      image={blog.linkImg}
                      description={blog.description}
                      author={blog.createByName}
                      blogType={blog.blogType === 0 ? "Sự kiện" : "Tin tức"}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  px: 2,
                  backgroundColor: "grey.50",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <SentimentDissatisfied
                  sx={{
                    fontSize: 60,
                    color: "grey.400",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" color="grey.600" gutterBottom>
                  Không tìm thấy bài viết
                </Typography>
                <Typography color="grey.500">
                  Không tìm thấy bài viết phù hợp với từ khóa "{searchQuery}"
                </Typography>
              </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" width="100%" mt={8}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: 16,
                    },
                  }}
                />
              </Box>
            )}
          </Grid>
        </Container>
      </Box>

      <Footer
        id="footer"
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800",
          mt: 8,
        }}
      />
    </ShopLayout2>
  );
};

export const getStaticProps = async () => {
  const blogs = await api.getBlogs();
  return {
    props: {
      blogs,
    },
  };
};

export default BlogsPage;
