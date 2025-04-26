import { useState, useEffect } from "react";
import { ArrowBack, Place, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { Formik } from "formik";
import { get, post } from "helpers/axios-helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as yup from "yup";

const CreateAddress = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await get("/tourist/address/provinces");
      console.log("pro", response.data.data);
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
      enqueueSnackbar("Không thể tải danh sách tỉnh/thành phố", {
        variant: "error",
      });
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await get(`/tourist/address/districts/${provinceId}`);
      console.log("Distr", response.data.data);

      setDistricts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
      enqueueSnackbar("Không thể tải danh sách quận/huyện", {
        variant: "error",
      });
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await get(`/tourist/address/wards/${districtId}`);
      console.log("ward", response.data.data);

      setWards(response.data.data);
    } catch (error) {
      console.error("Failed to fetch wards:", error);
      enqueueSnackbar("Không thể tải danh sách phường/xã", {
        variant: "error",
      });
    }
  };

  const initialValues = {
    toName: "",
    toPhone: "",
    toProvinceId: "",
    toDistrictId: "",
    toWardCode: "",
    defaultAddress: false,
  };

  const validationSchema = yup.object().shape({
    toName: yup.string().required("Họ tên là bắt buộc"),
    toPhone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    toProvinceId: yup.number().required("Vui lòng chọn tỉnh/thành phố"),
    toDistrictId: yup.number().required("Vui lòng chọn quận/huyện"),
    toWardCode: yup.string().required("Vui lòng chọn phường/xã"),
  });

  const handleFormSubmit = async (values) => {
    try {
      // Find the selected items to get their names
      const selectedProvince = provinces.find(
        (p) => p.provinceID === values.toProvinceId
      );
      const selectedDistrict = districts.find(
        (d) => d.districtID === values.toDistrictId
      );
      const selectedWard = wards.find((w) => w.wardCode === values.toWardCode);

      const addressData = {
        defaultAddress: values.defaultAddress,
        toName: values.toName,
        toPhone: values.toPhone,
        toProvinceId: values.toProvinceId,
        toProvinceName: selectedProvince?.provinceName || "",
        toDistrictId: values.toDistrictId,
        toDistrictName: selectedDistrict?.districtName || "",
        toWardCode: values.toWardCode,
        toWardName: selectedWard?.wardName || "",
      };

      const response = await post("/tourist/address", addressData);
      const data = response.data;

      enqueueSnackbar(data.message, {
        variant: data.status ? "success" : "error",
      });

      if (data.status) {
        router.push("/address");
      }
    } catch (error) {
      console.error("Create address failed:", error);
      enqueueSnackbar("Thêm địa chỉ thất bại", { variant: "error" });
    }
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Place}
        title="Thêm địa chỉ mới"
        button={
          <Link href="/address" passHref>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<ArrowBack />}
            >
              Quay lại
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card sx={{ p: 4 }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="toName"
                    label="Họ và tên"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.toName}
                    error={!!touched.toName && !!errors.toName}
                    helperText={touched.toName && errors.toName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="toPhone"
                    label="Số điện thoại"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.toPhone}
                    error={!!touched.toPhone && !!errors.toPhone}
                    helperText={touched.toPhone && errors.toPhone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="toProvinceId"
                    label="Tỉnh/Thành phố"
                    onBlur={handleBlur}
                    value={values.toProvinceId}
                    onChange={(e) => {
                      setFieldValue("toProvinceId", e.target.value);
                      setFieldValue("toDistrictId", "");
                      setFieldValue("toWardCode", "");
                      fetchDistricts(e.target.value);
                    }}
                    error={!!touched.toProvinceId && !!errors.toProvinceId}
                    helperText={touched.toProvinceId && errors.toProvinceId}
                  >
                    {provinces?.map((province) => (
                      <MenuItem
                        key={province.provinceID}
                        value={province.provinceID}
                      >
                        {province.provinceName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="toDistrictId"
                    label="Quận/Huyện"
                    onBlur={handleBlur}
                    value={values.toDistrictId}
                    onChange={(e) => {
                      setFieldValue("toDistrictId", e.target.value);
                      setFieldValue("toWardCode", "");
                      fetchWards(e.target.value);
                    }}
                    error={!!touched.toDistrictId && !!errors.toDistrictId}
                    helperText={touched.toDistrictId && errors.toDistrictId}
                    disabled={!values.toProvinceId}
                  >
                    {districts.map((district) => (
                      <MenuItem
                        key={district.districtID}
                        value={district.districtID}
                      >
                        {district.districtName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="toWardCode"
                    label="Phường/Xã"
                    onBlur={handleBlur}
                    value={values.toWardCode}
                    onChange={handleChange}
                    error={!!touched.toWardCode && !!errors.toWardCode}
                    helperText={touched.toWardCode && errors.toWardCode}
                    disabled={!values.toDistrictId}
                  >
                    {wards.map((ward) => (
                      <MenuItem key={ward.wardCode} value={ward.wardCode}>
                        {ward.wardName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="defaultAddress"
                        checked={values.defaultAddress}
                        onChange={handleChange}
                      />
                    }
                    label="Đặt làm địa chỉ mặc định"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    startIcon={<Save />}
                    sx={{ mt: 2 }}
                  >
                    Lưu địa chỉ
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </CustomerDashboardLayout>
  );
};

export default CreateAddress;
