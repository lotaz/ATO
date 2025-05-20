import { useState } from 'react';
import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageCarouselProps {
  images: string[];
  maxHeight?: number;
  maxWidth?: number;
}

export const ImageCarousel = ({ images, maxHeight = 400, maxWidth = 600 }: ImageCarouselProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images?.length || 0;

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Box sx={{ maxWidth, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default'
        }}
      >
        <Typography>{`Ảnh ${activeStep + 1} trên ${maxSteps}`}</Typography>
      </Paper>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              sx={{
                height: maxHeight,
                display: 'block',
                maxWidth,
                overflow: 'hidden',
                width: '100%',
                objectFit: 'contain',
                backgroundColor: 'background.paper'
              }}
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" disabled={activeStep === maxSteps - 1}>
            <Typography mr={1}> Tiếp</Typography>
            <ArrowRightOutlined />
          </Button>
        }
        backButton={
          <Button size="small" disabled={activeStep === 0}>
            <ArrowLeftOutlined />
            <Typography ml={1}> Trước</Typography>
          </Button>
        }
      />
    </Box>
  );
};
