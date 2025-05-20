import { CameraOutlined } from '@ant-design/icons';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useRef } from 'react';
import axios from 'axios';

interface FileUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
}

const UploadWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '150px',
  height: '150px',
  margin: '0 auto',
  borderRadius: '50%',
  '&:hover .upload-overlay': {
    opacity: 1
  }
}));

const UploadOverlay = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s',
  borderRadius: '100%',
  cursor: 'pointer'
}));

export const FileUploader = ({ value, onChange, accept = 'image/*' }: FileUploaderProps) => {
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
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadFile(file);
        onChange(imageUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <UploadWrapper>
        <Avatar
          src={value}
          sx={{
            width: '100%',
            height: '100%',
            border: '3px solid #f0f0f0'
          }}
        >
          {!value && <CameraOutlined />}
        </Avatar>
        <UploadOverlay className="upload-overlay" onClick={() => fileInputRef.current?.click()}>
          <IconButton sx={{ color: 'white' }}>
            <CameraOutlined />
          </IconButton>
        </UploadOverlay>
      </UploadWrapper>

      <input type="file" accept={accept} style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />

      <Typography variant="caption" color="textSecondary" align="center">
        Click để tải lên ảnh đại diện
      </Typography>
    </Stack>
  );
};
