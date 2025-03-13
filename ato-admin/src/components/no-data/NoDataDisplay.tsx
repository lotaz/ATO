import { Box, Typography } from '@mui/material';
import { InboxOutlined } from '@ant-design/icons';

export const NoDataDisplay = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      bgcolor: 'background.paper',
      borderRadius: 1,
      border: '1px dashed',
      borderColor: 'divider'
    }}
  >
    <InboxOutlined style={{ fontSize: 48, marginBottom: 16 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom>
      Không tìm thấy dữ liệu
    </Typography>
  </Box>
);
