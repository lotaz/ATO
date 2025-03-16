import { useState } from 'react';
import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface ImageCarouselProps {
  images: string[];
  maxHeight?: number;
  maxWidth?: number;
}

export const ImageCarousel = ({ images, maxHeight = 400, maxWidth = 600 }: ImageCarouselProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images?.length || 0;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

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

      <SwipeableViews axis="x" index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((img, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
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
            ) : null}
          </div>
        ))}
      </SwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            <Typography mr={1}> Tiếp</Typography>
            <ArrowRightOutlined />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <ArrowLeftOutlined />
            <Typography ml={1}> Trước</Typography>
          </Button>
        }
      />
    </Box>
  );
};
