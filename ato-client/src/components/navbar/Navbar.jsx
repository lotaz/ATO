import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Container, styled } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import CategoryMenu from "components/categories/CategoryMenu";
import Category from "components/icons/Category";
import NavLink from "components/nav-link/NavLink";
import { Paragraph } from "components/Typography";
import navbarNavigations from "data/navbarNavigations"; // NavList props interface

// const common css style
const navLinkStyle = {
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "primary.main",
  },
  "&:last-child": {
    marginRight: 0,
  },
}; // style components

const NavBarWrapper = styled(BazaarCard)(({ theme, border }) => ({
  height: "60px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  ...(border && {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  }),
  [theme.breakpoints.down(1150)]: {
    display: "none",
  },
}));

const InnerContainer = styled(Container)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const CategoryMenuButton = styled(Button)(({ theme }) => ({
  width: "278px",
  height: "40px",
  backgroundColor: theme.palette.grey[100],
}));

const FlexBox = styled(Box)`
  display: flex;
  cursor: pointer;
  font-weight: 600;
  & :hover {
    color: blue;
    & ::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px; /* Thickness of the underline */
      background-color: #000; /* Color of the underline */
      transition: width 0.3s ease; /* Smooth transition for the underline effect */
    }
  }
`;

// ==========================================================
const Navbar = ({ navListOpen, hideCategories, elevation, border }) => {
  const renderNestedNav = (list = []) => {
    return list.map((nav) => {
      return <FlexBox key={nav.title}>{nav.title}</FlexBox>;
    });
  };

  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={border}>
      {!hideCategories ? (
        <InnerContainer>
          {/* Category megamenu */}
          <CategoryMenu open={navListOpen}>
            <CategoryMenuButton variant="text">
              <Category fontSize="small" />
              <Paragraph
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml={1.25}
                color="grey.600"
              >
                Danh sách công ty
              </Paragraph>

              <ChevronRight className="dropdown-icon" fontSize="small" />
            </CategoryMenuButton>
          </CategoryMenu>

          {/* Horizontal menu */}
          <FlexBox gap={4}>{renderNestedNav(navbarNavigations)}</FlexBox>
        </InnerContainer>
      ) : (
        <InnerContainer
          sx={{
            justifyContent: "center",
          }}
        >
          <FlexBox gap={4}>{renderNestedNav(navbarNavigations)}</FlexBox>
        </InnerContainer>
      )}
    </NavBarWrapper>
  );
}; //  set default props data

Navbar.defaultProps = {
  elevation: 2,
  navListOpen: false,
  hideCategories: false,
};
export default Navbar;
