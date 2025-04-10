import { FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { get } from "helpers/axios-helper";
import { useEffect, useState } from "react";

const Shipping = ({ values, handleChange, setFieldValue, calculateShippingFee }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    const response = await get("/tourist/order/provinces");
    setProvinces(response.data?.data || []);
  };

  const fetchDistricts = async (provinceId) => {
    const response = await get(`/tourist/order/districts/${provinceId}`);
    setDistricts(response.data?.data || []);
    setWards([]);
    setFieldValue("districtId", "");
    setFieldValue("wardCode", "");
  };

  const fetchWards = async (districtId) => {
    const response = await get(`/tourist/order/wards/${districtId}`);
    setWards(response.data?.data || []);
    setFieldValue("wardCode", "");
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Tỉnh/Thành phố</InputLabel>
        <Select
          name="provinceId"
          value={values.provinceId || ""}
          onChange={(e) => {
            handleChange(e);
            fetchDistricts(e.target.value);
          }}
          label="Tỉnh/Thành phố"
        >
          {provinces.map((province) => (
            <MenuItem key={province.provinceID} value={province.provinceID}>
              {province.provinceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Quận/Huyện</InputLabel>
        <Select
          name="districtId"
          value={values.districtId || ""}
          onChange={(e) => {
            handleChange(e);
            fetchWards(e.target.value);
          }}
          label="Quận/Huyện"
          disabled={!values.provinceId}
        >
          {districts.map((district) => (
            <MenuItem key={district.districtID} value={district.districtID}>
              {district.districtName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Phường/Xã</InputLabel>
        <Select
          name="wardCode"
          value={values.wardCode || ""}
          onChange={(e) => {
            handleChange(e);
            calculateShippingFee({
              ...values,
              wardCode: e.target.value,
            });
          }}
          label="Phường/Xã"
          disabled={!values.districtId}
        >
          {wards.map((ward) => (
            <MenuItem key={ward.wardCode} value={ward.wardCode}>
              {ward.wardName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Shipping;