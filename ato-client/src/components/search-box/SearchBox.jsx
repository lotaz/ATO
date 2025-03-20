import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, MenuItem, TextField, styled } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import TouchRipple from "@mui/material/ButtonBase";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const SearchBox = () => {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("All Categories");
  const [resultList, setResultList] = useState([]);

  const handleCategoryChange = (cat) => () => setCategory(cat);

  const handleSearch = (e) => {
    startTransition(() => {
      const value = e.target?.value;
      if (!value) setResultList([]);
      else setResultList(dummySearchResult);
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", null);
  }, []);
  const categoryDropdown = (
    <BazaarMenu
      direction="left"
      sx={{
        zIndex: 1502,
      }}
      handler={
        <DropDownHandler
          px={3}
          gap={0.5}
          height="100%"
          color="grey.700"
          bgcolor="grey.100"
          alignItems="center"
          component={TouchRipple}
        >
          {category}
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>
      }
    >
      {categories.map((item) => (
        <MenuItem key={item} onClick={handleCategoryChange(item)}>
          {item}
        </MenuItem>
      ))}
    </BazaarMenu>
  );
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm công ty, tour, sản phẩm"
        onChange={handleSearch}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <MenuItem key={item}>{item}</MenuItem>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

const categories = [
  "All Categories",
  "Car",
  "Clothes",
  "Electronics",
  "Laptop",
  "Desktop",
  "Camera",
  "Toys",
];
const dummySearchResult = [
  "Máy nội nha Endo Motor có đèn",
  "Giá để máy lấy cao",
  "Van điện 30v máy lấy cao",
  "Ghế nha khoa",
];
export default SearchBox;
