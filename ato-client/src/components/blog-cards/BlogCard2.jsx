import Link from "next/link";
import Image from "next/image";
import { Box, Card, styled } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import NavLink3 from "components/nav-link/NavLink3";
import { H4, Paragraph } from "components/Typography"; // custom styled components
import { useRouter } from "next/router";

const ImageBox = styled(Box)(() => ({
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": {
    transition: "0.3s",
  },
  ":hover": {
    "& img": {
      transform: "scale(1.1)",
    },
  },
}));
const DateBox = styled(FlexRowCenter)(({ theme }) => ({
  top: 30,
  left: 30,
  width: 50,
  height: 50,
  textAlign: "center",
  position: "absolute",
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.grey[200],
})); // =====================================================

const StyledParagraph = styled(Paragraph)(() => ({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
  height: "4.5em",
  lineHeight: "1.5em",
}));
const StyledTitle = styled(H4)(() => ({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
  height: "3em",
  lineHeight: "1.5em",
}));
// =====================================================
const BlogCard2 = ({ id, image, title, date, description }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 2,
      }}
      onClick={handleClick}
    >
      <ImageBox p={2} maxHeight={220}>
        <img
          style={{ objectFit: "cover" }}
          width={"100%"}
          height={272}
          src={image}
          alt="blog-1"
        />
      </ImageBox>

      <Box px={2} pt={1} pb={3}>
        <Link href="#">
          <a>
            <StyledTitle fontWeight={700}>{title}</StyledTitle>
          </a>
        </Link>

        <StyledParagraph mt={0.5} mb={3}>
          {description}
        </StyledParagraph>

        <NavLink3 text="Xem chi tiết" href="#" />
      </Box>
    </Card>
  );
};

export default BlogCard2;
