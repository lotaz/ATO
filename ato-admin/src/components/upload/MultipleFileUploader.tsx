import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';
import { Box, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useRef } from 'react';
import axios from 'axios';

interface FileUploaderProps {
  values?: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
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

const ImagePreview = styled(Box)(({}) => ({
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

const DeleteOverlay = styled(Box)(({}) => ({
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

export const MultipleFileUploader = ({ values = [], onChange, accept = 'image/*', maxFiles = 5, disabled }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/file/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response?.data?.fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxFiles - values.length;
    const allowedFiles = files.slice(0, remainingSlots);

    try {
      const uploadPromises = allowedFiles.map((file) => uploadFile(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...values, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }

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
                {!disabled && (
                  <DeleteOverlay className="delete-overlay">
                    <Tooltip title="Xóa ảnh">
                      <IconButton size="small" sx={{ color: 'red' }} onClick={() => handleRemoveImage(index)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </DeleteOverlay>
                )}
              </ImagePreview>
            </Grid>
          ))}
        </Grid>
      )}

      {values.length < maxFiles && !disabled && (
        <UploadWrapper onClick={() => fileInputRef.current?.click()}>
          <Stack spacing={1} alignItems="center">
            <CameraOutlined color="primary" />
            <Typography variant="body1">Bấm để tải ảnh</Typography>
            <Typography variant="caption" color="textSecondary">
              {`Bạn có thể tải lên tối đa ${maxFiles} hình ảnh (${maxFiles - values.length} còn lại)`}
            </Typography>
          </Stack>
        </UploadWrapper>
      )}

      <input type="file" multiple accept={accept} style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
    </Stack>
  );
};
