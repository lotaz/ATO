import Link from "next/link";
import { Box, MenuItem, styled } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useSettings from "hooks/useSettings"; //styled component

const Wrapper = styled(Box)(({ theme }) => ({
  fontWeight: "600",
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 250ms ease-in-out",
    "& .title": {
      flexGrow: 1,
      paddingLeft: "0.75rem",
    },
  },
  "&:hover": {
    "& > .category-dropdown-link": {
      color: theme.palette.primary.main,
      background: theme.palette.action.hover,
    },
    "& > .mega-menu": {
      display: "block",
    },
  },
})); // =============================================================

// =============================================================
const CategoryMenuItem = (props) => {
  const { href, title, caret, children, ...rest } = props;
  const { settings } = useSettings();
  return (
    <Wrapper>
      <Link href={href} target="_blank" passHref>
        <MenuItem className="category-dropdown-link">
          {rest?.iconSrc && (
            <img
              src={rest?.iconSrc}
              style={{ objectFit: "contain" }}
              width={32}
              height={32}
            />
          )}
          <span className="title">{title}</span>
          {caret &&
            (settings.direction === "ltr" ? (
              <ChevronRight fontSize="small" />
            ) : (
              <ChevronLeft fontSize="small" />
            ))}
        </MenuItem>
      </Link>

      {children}
    </Wrapper>
  );
};

CategoryMenuItem.defaultProps = {
  caret: true,
};
export default CategoryMenuItem;
