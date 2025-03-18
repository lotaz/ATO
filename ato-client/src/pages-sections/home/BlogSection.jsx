import { Grid, styled } from "@mui/material";
import CategorySectionCreator from "components/CategorySectionCreator";
import { Paragraph } from "components/Typography";
import BlogCard2 from "components/blog-cards/BlogCard2";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

const BlogSection = ({ blogs = [] }) => {
  return (
    <CategorySectionCreator title="Tin tức" seeMoreLink="#" mb={0}>
      <SubTitle>Cập nhật tin tức mới nhất</SubTitle>
      <Grid container spacing={3}>
        {blogs.map((item) => (
          <Grid item md={4} xs={12} key={item.blogId}>
            <BlogCard2
              id={item.blogId}
              title={item.title}
              date={item.createDate}
              image={item.linkImg}
              description={item.description}
              author={item.createByName}
              blogType={item.blogType === 0 ? "Sự kiện" : "Tin tức"}
            />
          </Grid>
        ))}
      </Grid>
    </CategorySectionCreator>
  );
};

export default BlogSection;
