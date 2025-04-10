import { Box, Grid, styled, useTheme } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import CategorySectionCreator from "components/CategorySectionCreator";
import LazyImage from "components/LazyImage";
import { H6, Paragraph, Tiny } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import { API_URLs } from "constants/api-url";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import useSWR from "swr";
// styled component
// Add the Company interface
export const mockCompanies = [
  {
    tourCompanyId: "1",
    companynName: "Du Lịch Bình Minh",
    companyDescription:
      "Công ty du lịch hàng đầu chuyên về các tour du lịch cao cấp và trải nghiệm độc đáo khắp Việt Nam.",
    addressCompany: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    emailCompany: "contact@sunrisetravel.com",
    website: "https://sunrisetravel.com",
    logoURL:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500",
    createDate: "2023-01-15",
  },
  {
    tourCompanyId: "2",
    companynName: "Khám Phá Việt Nam",
    companyDescription:
      "Trải nghiệm địa phương đích thực và các tour du lịch văn hóa tại những điểm đến đẹp nhất Việt Nam.",
    addressCompany: "45 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
    emailCompany: "info@vietnamexplorer.com",
    website: "https://vietnamexplorer.com",
    logoURL:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500",
    createDate: "2023-02-20",
  },
  {
    tourCompanyId: "3",
    companynName: "Du Lịch Di Sản",
    companyDescription:
      "Chuyên về các tour du lịch di sản văn hóa và khám phá lịch sử khắp Việt Nam.",
    addressCompany: "78 Đường Bạch Đằng, Hải Châu, Đà Nẵng",
    emailCompany: "contact@heritagetours.com",
    website: "https://heritagetours.com",
    logoURL:
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=500",
    createDate: "2023-03-10",
  },
  {
    tourCompanyId: "4",
    companynName: "Du Lịch Sinh Thái",
    companyDescription:
      "Tour du lịch bền vững và thân thiện với môi trường, tập trung vào thiên nhiên và bảo tồn môi trường.",
    addressCompany: "156 Nguyễn Huệ, Đà Lạt",
    emailCompany: "info@ecoadventures.com",
    website: "https://ecoadventures.com",
    logoURL:
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=500",
    createDate: "2023-04-05",
  },
];

// Rename the styled components (keeping same styles)
// Update the StyledBazaarCard styles
const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  gap: "0.5rem",
  height: "100%",
  display: "flex",
  padding: "1rem",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  overflow: "hidden",

  "& .imageWrapper": {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "1rem",
  },

  "& .companyInfo": {
    padding: "0.5rem",
    width: "100%",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "15px",
    "& .imageWrapper": {
      height: "140px",
    },
  },
}));

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ===========================================================
// Rename component and update props
const CompanySection = () => {
  const fetcher = (url) => get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(API_URLs.COMPANY.LIST, fetcher);

  const companies = data || [];

  const width = useWindowSize();
  const { palette } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(3);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]); // CUSTOM STYLE FOR ARROW BUTTONS

  const CAROUSEL_STYLE = {
    "& #backArrowButton, #backForwardButton": {
      color: palette.primary.main,
      background: palette.primary[50],
      "&:hover": {
        background: palette.primary[100],
      },
    },
  };

  return (
    <CategorySectionCreator title="Công ty du lịch" seeMoreLink="#" mb={0}>
      <SubTitle>Xem tất cả các công ty du lịch</SubTitle>
      <Carousel
        infinite={true}
        sx={CAROUSEL_STYLE}
        visibleSlides={visibleSlides}
        autoPlay
        totalSlides={companies.length}
      >
        {companies.map((company, ind) => (
          <Grid item lg={3} xs={6} key={company.tourCompanyId}>
            <StyledBazaarCard hoverEffect>
              <Box className="imageWrapper">
                <LazyImage
                  width="100%"
                  height="100%"
                  alt={company.companynName}
                  src={company.logoURL}
                  objectFit="contain"
                />
              </Box>

              <Box className="companyInfo">
                <H6 mb={0.5}>{company.companynName}</H6>
                <Tiny color="primary.main">{company.addressCompany}</Tiny>
              </Box>
            </StyledBazaarCard>
          </Grid>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default CompanySection;
