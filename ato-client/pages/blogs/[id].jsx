import {
  Box,
  Container,
  Typography,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import { H2, H6 } from "components/Typography";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { AccessTime, Person } from "@mui/icons-material";
import Footer from "components/footer/Footer";
import api from "utils/__api__/healthbeauty-shop";
import { format } from "date-fns";
import parse from "html-react-parser";
import { sanitizeHtml } from "utils/htmlParser";
import { useState, useEffect } from "react";

const BlogDetails = ({ blog }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <ShopLayout2>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/assets/small-banners/blur-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container>
          <H2 color="white" textAlign="center" mb={2}>
            {blog?.title}
          </H2>
          <Box display="flex" justifyContent="center" gap={3}>
            <Typography color="white" display="flex" alignItems="center">
              <Person sx={{ mr: 1 }} /> {blog?.createByName}
            </Typography>
            <Typography color="white" display="flex" alignItems="center">
              <AccessTime sx={{ mr: 1 }} />
              {format(new Date(blog?.createDate), "dd MMMM, yyyy")}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container sx={{ mb: 8 }}>
        {/* Featured Image */}
        <Box mb={4}>
          <img
            src={blog?.linkImg}
            alt={blog?.title}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Blog Type Tag */}
        <Box mb={3}>
          <Chip
            label={blog?.blogType === 0 ? "Sự kiện" : "Tin tức"}
            color="primary"
            size="medium"
          />
        </Box>

        {/* Blog Content */}
        <Box mb={4}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "text.secondary",
              "& p": { mb: 2 },
            }}
            dangerouslySetInnerHTML={{ __html: blog?.content ?? "<div></div>" }}
          />
        </Box>

        {/* Author Section */}
        <Divider sx={{ mb: 4 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "grey.50",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Avatar src={blog?.authorAvatar} sx={{ width: 64, height: 64 }} />
          <Box>
            <H6 mb={1}>{blog?.createByName}</H6>
            <Typography variant="body2" color="text.secondary">
              Tác giả
            </Typography>
          </Box>
        </Box>
      </Container>

      <Footer
        id="footer"
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800",
        }}
      />
    </ShopLayout2>
  );
};

export const getStaticPaths = async () => {
  const blogs = await api.getBlogs();
  const paths = blogs.map((blog) => ({
    params: { id: blog.blogId.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const blog = await api.getBlogById(params.id);
  return {
    props: {
      blog,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default BlogDetails;
