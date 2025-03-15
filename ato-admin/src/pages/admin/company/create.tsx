import { CameraOutlined } from '@ant-design/icons';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AnimateButton from '../../../components/@extended/AnimateButton';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, getUnAssigedAccounts } from '../../../redux/companySlice';
import { CreateCompanyRequest } from '../../../services/company/types';
import { RootState } from '../../../redux/store';

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState('');
  const unassignedAccounts = useSelector((state: RootState) => state.company.unassigned);

  useEffect(() => {
    dispatch(getUnAssigedAccounts());
  }, [dispatch]);

  const initialValues: CreateCompanyRequest = {
    companynName: '',
    companyDescription: '',
    addressCompany: '',
    emailCompany: '',
    website: '',
    logoURL: '',
    userId: ''
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFieldValue('logoURL', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (values: CreateCompanyRequest, { setSubmitting }: any) => {
    try {
      await dispatch(createCompany(values));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack direction="column" justifyContent="space-between">
      <AppCard variant="outlined">
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          Thêm mới công ty
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            companynName: Yup.string().required('Tên công ty là bắt buộc'),
            emailCompany: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            addressCompany: Yup.string().required('Địa chỉ là bắt buộc'),
            website: Yup.string().url('Website không hợp lệ'),
            logoURL: Yup.string().required('Logo công ty là bắt buộc'),
            userId: Yup.string().required('Người phụ trách là bắt buộc')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Logo Upload Section */}
                <Grid item xs={12}>
                  <Stack alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: 200,
                        height: 200,
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '2px dashed #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover .overlay': {
                          opacity: 1
                        }
                      }}
                      onClick={handleImageClick}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Company Logo"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <Stack spacing={1} alignItems="center">
                          <CameraOutlined style={{ fontSize: '2rem', color: '#666' }} />
                          <Typography color="textSecondary" variant="body2">
                            Tải lên logo công ty
                          </Typography>
                        </Stack>
                      )}
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s'
                        }}
                      >
                        <Stack spacing={1} alignItems="center">
                          <CameraOutlined style={{ fontSize: '2rem', color: 'white' }} />
                          <Typography color="white" variant="body2">
                            Thay đổi logo
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                    {touched.logoURL && errors.logoURL && <FormHelperText error>{errors.logoURL}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Thông tin cơ bản
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="userId">Người phụ trách</InputLabel>
                        <FormControl fullWidth>
                          <Select id="userId" name="userId" value={values.userId} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                            <MenuItem value="">
                              <em>Chọn người phụ trách</em>
                            </MenuItem>
                            {unassignedAccounts &&
                              unassignedAccounts.map((account) => (
                                <MenuItem key={account.id} value={account.id}>
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar src={account.avatarURL} alt={account.fullname} sx={{ width: 24, height: 24 }} />
                                    <Stack>
                                      <Typography variant="body1">{account.fullname}</Typography>
                                      <Typography variant="caption" color="textSecondary">
                                        {account.email}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="companynName">Tên công ty*</InputLabel>
                        <OutlinedInput
                          id="companynName"
                          name="companynName"
                          value={values.companynName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập tên công ty"
                          fullWidth
                          error={Boolean(touched.companynName && errors.companynName)}
                        />
                        {touched.companynName && errors.companynName && <FormHelperText error>{errors.companynName}</FormHelperText>}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="website">Website</InputLabel>
                        <OutlinedInput
                          id="website"
                          name="website"
                          value={values.website}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập website"
                          fullWidth
                          error={Boolean(touched.website && errors.website)}
                        />
                        {touched.website && errors.website && <FormHelperText error>{errors.website}</FormHelperText>}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="emailCompany">Email công ty*</InputLabel>
                        <OutlinedInput
                          id="emailCompany"
                          name="emailCompany"
                          value={values.emailCompany}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập email công ty"
                          fullWidth
                          error={Boolean(touched.emailCompany && errors.emailCompany)}
                        />
                        {touched.emailCompany && errors.emailCompany && <FormHelperText error>{errors.emailCompany}</FormHelperText>}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="addressCompany">Địa chỉ*</InputLabel>
                        <OutlinedInput
                          id="addressCompany"
                          name="addressCompany"
                          value={values.addressCompany}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập địa chỉ"
                          fullWidth
                          multiline
                          rows={3}
                          error={Boolean(touched.addressCompany && errors.addressCompany)}
                        />
                        {touched.addressCompany && errors.addressCompany && <FormHelperText error>{errors.addressCompany}</FormHelperText>}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="companyDescription">Mô tả</InputLabel>
                        <OutlinedInput
                          id="companyDescription"
                          name="companyDescription"
                          value={values.companyDescription}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mô tả về công ty"
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={() => navigate(ADMIN_URLs.COMPANY.INDEX)}>
                      Hủy
                    </Button>
                    <AnimateButton>
                      <Button type="submit" variant="contained" color="primary">
                        Tạo mới
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AppCard>
    </Stack>
  );
};

export default CreateCompany;
