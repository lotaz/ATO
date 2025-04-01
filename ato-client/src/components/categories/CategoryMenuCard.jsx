import { Box, styled } from "@mui/material";
import useSWR from "swr";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import { get } from "helpers/axios-helper";
import { API_URLs } from "constants/api-url";

const Wrapper = styled(Box)(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  overflow: "auto",
  maxHeight: "400px",

  /* Webkit-based browsers scrollbar styling */
  "::-webkit-scrollbar": {
    width: "6px", // Set the width for vertical scrollbar
    height: "6px", // Set the height for horizontal scrollbar
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // Color of the scrollbar thumb
    borderRadius: "10px", // Round the edges of the thumb
  },

  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555", // Darken the thumb when hovered
  },
})); // ===============================================================

// ===============================================================
const fetcher = (url) => get(url).then((res) => res.data);

const CategoryMenuCard = (props) => {
  const { open, position } = props;
  const { data, error, isLoading } = useSWR(API_URLs.COMPANY.LIST, fetcher);

  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };

  if (isLoading)
    return (
      <Wrapper open={open} position={position}>
        Đang tải ...
      </Wrapper>
    );
  if (error) return <Wrapper open={open} position={position}></Wrapper>;

  const companies = data || [];

  console.log("data", data);

  const companyNavigations =
    companies?.map((company) => ({
      title: company.companynName,
      href: `/tour-companies/${company.tourCompanyId}`,
      iconSrc: company.logoURL || "/assets/images/default-company.png",
      menuComponent: "MegaMenu1",
    })) || [];

  return (
    <Wrapper open={open} position={position}>
      {companyNavigations.map((item) => {
        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            iconSrc={item.iconSrc}
            title={item.title}
            caret={false}
          />
        );
      })}
    </Wrapper>
  );
};

CategoryMenuCard.defaultProps = {
  position: "absolute",
};

export default CategoryMenuCard;
