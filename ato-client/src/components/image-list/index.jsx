import { Box, ImageList, ImageListItem, Typography } from "@mui/material";

// Add this new component at the top of your file
export const HoverImageGallery = ({ images, title }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 10,
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 1,
        p: 2,
        display: "none",
        "&.visible": {
          display: "block",
        },
      }}
      className="image-gallery"
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <ImageList cols={3} gap={8}>
        {images.map((img, index) => (
          <ImageListItem key={index}>
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              style={{
                width: "100%",
                height: 100,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export const ImageGallery = ({ images, title }) => {
  return (
    <Box
      sx={{
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 1,
        p: 2,
      }}
      className="image-gallery"
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <ImageList cols={3} gap={8}>
        {images.map((img, index) => (
          <ImageListItem key={index}>
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              style={{
                width: "100%",
                height: 100,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
