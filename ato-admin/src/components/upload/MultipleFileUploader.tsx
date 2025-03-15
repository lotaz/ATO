import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';
import { Box, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useRef } from 'react';

interface FileUploaderProps {
  values?: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  maxFiles?: number;
}

const UploadWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover
  }
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '150px',
  height: '150px',
  '&:hover .delete-overlay': {
    opacity: 1
  }
}));

const PreviewImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px'
});

const DeleteOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s',
  borderRadius: '8px'
}));

export const MultipleFileUploader = ({ values = [], onChange, accept = 'image/*', maxFiles = 5 }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxFiles - values.length;
    const allowedFiles = files.slice(0, remainingSlots);

    const newUrls = allowedFiles.map((file) => URL.createObjectURL(file));
    onChange([...values, ...newUrls]);

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newValues = values.filter((_, index) => index !== indexToRemove);
    onChange(newValues);
  };

  return (
    <Stack spacing={3}>
      {values.length > 0 && (
        <Grid container spacing={2}>
          {values.map((url, index) => (
            <Grid item key={index}>
              <ImagePreview>
                <PreviewImage src={url} alt={`Preview ${index + 1}`} />
                <DeleteOverlay className="delete-overlay">
                  <Tooltip title="Xóa ảnh">
                    <IconButton size="small" sx={{ color: 'red' }} onClick={() => handleRemoveImage(index)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </DeleteOverlay>
              </ImagePreview>
            </Grid>
          ))}
        </Grid>
      )}

      {values.length < maxFiles && (
        <UploadWrapper onClick={() => fileInputRef.current?.click()}>
          <Stack spacing={1} alignItems="center">
            <CameraOutlined color="primary" />
            <Typography variant="body1">Click to upload images</Typography>
            <Typography variant="caption" color="textSecondary">
              {`You can upload up to ${maxFiles} images (${maxFiles - values.length} remaining)`}
            </Typography>
          </Stack>
        </UploadWrapper>
      )}

      <input type="file" multiple accept={accept} style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
    </Stack>
  );
};
