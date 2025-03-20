import { Box, styled } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CategoryMenuCard from "./CategoryMenuCard"; // styled component

const Wrapper = styled(Box)(({ open, theme: { direction } }) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${
      open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"
    })`,
  },
})); // ===========================================================

// ===========================================================
const CategoryMenu = ({ open: isOpen = false, children }) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) setOpen((open) => !open);
  };

  const handleDocumentClick = useCallback(() => {
    if (popoverRef.current && !isOpen) setOpen(false);
  }, [isOpen]);

  const handleCloseMenu = () => setOpen(false);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);
  return (
    <Wrapper
      open={open}
      onMouseEnter={toggleMenu}
      onMouseLeave={handleCloseMenu}
    >
      {children}
      <HiddenBox />
      <CategoryMenuCard open={open} />
    </Wrapper>
  );
};

const HiddenBox = styled("div")`
  position: absolute;
  transform-origin: "top";
  padding: 0.6rem;
  width: 100%;
  z-index: 999;
`;

export default CategoryMenu;
