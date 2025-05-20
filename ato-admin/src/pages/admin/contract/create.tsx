import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ADMIN_URLs } from '../../../constants/admin-urls';
import { createContract } from '../../../redux/admin/contract.slice';
import { getCompanies } from '../../../redux/companySlice';
import { getFacilities } from '../../../redux/facilitySlice';
import { RootState } from '../../../redux/store';
import { Facility } from '../../../services/facility/types';
import { CreateContractRequest } from '../../../types/admin/contract.types';

const CreateContract = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const tourCompanies = useSelector((state: RootState) => state.company.data);
  const touristFacilities = useSelector((state: RootState) => state.facility.list);
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState<Partial<CreateContractRequest>>({
    tourCompanyId: undefined,
    touristFacilityId: undefined,
    discountRate: 0,
    startDate: undefined, // Set a default start date if neede,
    endDate: undefined, // Set a default end date if needed,
    contractContent: ''
  });

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getFacilities());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createContract(formData));
      navigate(ADMIN_URLs.CONTRACT.INDEX);
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleDateChange = (field: string) => (date: any) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<ArrowLeftOutlined />} onClick={() => navigate(ADMIN_URLs.CONTRACT.INDEX)}>
          Quay lại danh sách
        </Button>
        <Typography variant="h5">Tạo hợp đồng mới</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Hợp đồng công ty" />
            <Tab label="Hợp đồng cơ sở du lịch" />
          </Tabs>

          <Grid container spacing={3}>
            {activeTab === 0 ? (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Công ty du lịch</InputLabel>
                  <Select value={formData.tourCompanyId} onChange={handleChange('tourCompanyId')} label="Công ty du lịch" required>
                    {tourCompanies.map((company) => (
                      <MenuItem key={company.tourCompanyId} value={company.tourCompanyId}>
                        {company.companynName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Cơ sở du lịch</InputLabel>
                  <Select value={formData.touristFacilityId} onChange={handleChange('touristFacilityId')} label="Cơ sở du lịch" required>
                    {touristFacilities.map((facility: Facility) => (
                      <MenuItem key={facility.touristFacilityId} value={facility.touristFacilityId}>
                        {facility.touristFacilityName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tỷ lệ chiết khấu"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
                value={formData.discountRate}
                onChange={handleChange('discountRate')}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày bắt đầu"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày kết thúc"
                value={formData.endDate}
                onChange={handleDateChange('endDate')}
                format="DD/MM/YYYY"
                minDate={dayjs(formData.startDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nội dung hợp đồng"
                multiline
                rows={12}
                value={formData.contractContent}
                onChange={handleChange('contractContent')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="outlined" onClick={() => navigate(ADMIN_URLs.CONTRACT.INDEX)}>
                  Hủy
                </Button>
                <Button type="submit" variant="contained">
                  Tạo hợp đồng
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CreateContract;
