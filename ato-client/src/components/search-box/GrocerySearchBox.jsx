import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";

const GrocerySearchBox = () => {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [resultList, setResultList] = useState([]);

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
          endAdornment: (
            <Button
              color="primary"
              disableElevation
              variant="contained"
              sx={{
                width: 160,
                height: "100%",
                borderRadius: "0 300px 300px 0",
              }}
            >
              Tìm kiếm
            </Button>
          ),
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

const dummySearchResult = [
  "Máy nội nha Endo Motor có đèn",
  "Giá để máy lấy cao",
  "Van điện 30v máy lấy cao",
  "Ghế nha khoa",
];
export default GrocerySearchBox;
