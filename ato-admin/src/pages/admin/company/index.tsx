import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, CardMedia, Chip, Grid, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppCard from '../../../components/cards/AppCard';
import { ADMIN_URLs } from '../../../constants/admin-urls';
import MuiCard from '@mui/material/Card';

interface Company {
  id: number;
  name: string;
  foundedDate: string;
  address: string;
  email: string;
  phone: string;
  image: string;
  status: 'active' | 'inactive';
}

const CompanyList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const companies: Company[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `Công ty Du lịch ${['ABC', 'XYZ', 'Việt Nam', 'Sài Gòn', 'Hà Nội', 'Đà Nẵng', 'Huế', 'Nha Trang', 'Phú Quốc', 'Hạ Long'][index]}`,
      foundedDate: `${2010 + index}/01/01`,
      address: `${123 + index} ${['Nguyễn Huệ', 'Lê Lợi', 'Trần Hưng Đạo', 'Lê Duẩn', 'Phan Chu Trinh', 'Hai Bà Trưng', 'Nam Kỳ Khởi Nghĩa', 'Điện Biên Phủ', 'Cách Mạng Tháng 8', 'Võ Văn Kiệt'][index]}, ${['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10'][index]}, TP.HCM`,
      email: `contact${index + 1}@${['abc', 'xyz', 'vietnam', 'saigon', 'hanoi', 'danang', 'hue', 'nhatrang', 'phuquoc', 'halong'][index]}travel.com`,
      phone: `028${(1234567 + index).toString().padStart(7, '0')}`,
      image: `https://caodang.fpt.edu.vn/wp-content/uploads/2024/05/Artboard-3.png`,
      status: index % 3 === 0 ? 'inactive' : 'active'
    }));

  const CompanyCard = ({ company }: { company: Company }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={company.image}
        alt={company.name}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="div" noWrap>
              {company.name}
            </Typography>
            <Chip
              label={company.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
              color={company.status === 'active' ? 'success' : 'default'}
              size="small"
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Ngày thành lập:</strong> {company.foundedDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {company.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Điện thoại:</strong> {company.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Địa chỉ:</strong> {company.address}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button onClick={() => navigate(`${ADMIN_URLs.COMPANY.DETAILS}`)} size="small" variant="outlined" color="primary">
              Chi tiết
            </Button>
            <Button onClick={() => navigate(`${ADMIN_URLs.COMPANY.UPDATE}`)} size="small" variant="contained" color="primary">
              Chỉnh sửa
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Stack direction={'column'}>
      <MuiCard sx={{ padding: '15px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <OutlinedInput
            size="small"
            placeholder="Tìm kiếm công ty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            }
            sx={{ minWidth: 300 }}
          />
          <Button variant="contained" color="primary" startIcon={<PlusOutlined />} onClick={() => navigate(ADMIN_URLs.COMPANY.CREATE)}>
            Thêm mới
          </Button>
        </Stack>
      </MuiCard>

      <Grid container spacing={3} mt={1}>
        {companies
          .filter(
            (company) =>
              company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              company.phone.includes(searchTerm)
          )
          .map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <CompanyCard company={company} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default CompanyList;
