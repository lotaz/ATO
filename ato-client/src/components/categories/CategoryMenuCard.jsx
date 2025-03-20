import { Box, styled } from "@mui/material";
import navigations from "data/navigations";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2"; // styled component

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
const CategoryMenuCard = (props) => {
  const { open, position } = props;
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };
  return (
    <Wrapper open={open} position={position}>
      {navigations.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];
        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            iconSrc={item.iconSrc}
            title={item.title}
            caret={!!item.menuData}
          >
            <MegaMenu data={item.menuData || {}} />
          </CategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};

CategoryMenuCard.defaultProps = {
  position: "absolute",
};
export default CategoryMenuCard;
