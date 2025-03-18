import { Box, styled, useTheme } from "@mui/material";
import Carousel from "components/carousel/Carousel";

// styled components
const StyledBox = styled(Box)(() => ({
  overflow: "hidden",
  backgroundColor: "#efefef",

  "& .carousel__back-button": {
    left: "10px",
  },
  "& .carousel__next-button": {
    right: "10px",
  },
}));

const BannerSection = ({ carouselData }) => {
  const { palette } = useTheme();

  return (
    <StyledBox id="carouselBox">
      <Carousel
        spacing="0px"
        totalSlides={4}
        autoPlay
        showArrow
        visibleSlides={1}
      >
        {carouselData.map((item, ind) => (
          <Image key={`carousel-${ind}`} src={item.imgUrl} alt={item.title} />
        ))}
      </Carousel>
    </StyledBox>
  );
};

const Image = styled("img")`
  width: 100%;
  object-fit: cover;

  max-height: 600px;
`;

export default BannerSection;
