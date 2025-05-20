import { SaveOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookingDestinationStatus, UpdateBookingDestinationRequest } from './types';

const DestinationStatusPage = () => {
  const [searchParams] = useSearchParams();
  const destinationId = searchParams.get('id');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateBookingDestinationRequest>({
    status: BookingDestinationStatus.Pending,
    actualStartTime: undefined,
    actualEndTime: undefined,
    notes: undefined
  });

  const statusLabels = {
    [BookingDestinationStatus.Pending]: 'Chưa bắt đầu',
    [BookingDestinationStatus.InProgress]: 'Đang diễn ra',
    [BookingDestinationStatus.Completed]: 'Đã hoàn thành',
    [BookingDestinationStatus.Canceled]: 'Đã hủy',
    [BookingDestinationStatus.Skipped]: 'Đã bỏ qua'
  };

  const handleSubmit = async () => {
    if (!destinationId) return;

    try {
      setLoading(true);
      const response = await fetch(`api/tour-guide/tracking/destination/${destinationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          actualStartTime: formData.actualStartTime ? dayjs(formData.actualStartTime)?.toISOString() : undefined,
          actualEndTime: formData.actualEndTime ? dayjs(formData.actualEndTime)?.toISOString() : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      navigate(-1);
    } catch (error) {
      console.error('Error updating destination status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto">
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Cập nhật trạng thái điểm đến</Typography>

          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={formData.status}
              label="Trạng thái"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingDestinationStatus })}
            >
              {Object.values(BookingDestinationStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {statusLabels[status]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DateTimePicker
            label="Thời gian bắt đầu thực tế"
            value={formData.actualStartTime ? dayjs(formData.actualStartTime) : null}
            onChange={(newValue) =>
              setFormData({
                ...formData,
                actualStartTime: newValue ? newValue.toISOString() : undefined
              })
            }
          />

          <DateTimePicker
            label="Thời gian kết thúc thực tế"
            value={formData.actualEndTime ? dayjs(formData.actualEndTime) : null}
            onChange={(newValue) =>
              setFormData({
                ...formData,
                actualEndTime: newValue ? newValue.toISOString() : undefined
              })
            }
          />

          <TextField
            label="Ghi chú"
            multiline
            rows={4}
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <LoadingButton loading={loading} variant="contained" startIcon={<SaveOutlined />} onClick={handleSubmit}>
            Cập nhật
          </LoadingButton>
        </Stack>
      </Card>
    </Box>
  );
};

export default DestinationStatusPage;
