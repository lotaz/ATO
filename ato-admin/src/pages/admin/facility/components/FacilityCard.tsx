import { Card, CardContent, CardMedia, Stack, Typography, Avatar, Tooltip } from '@mui/material';
import { Facility } from '../../../../services/facility/types';
import { useNavigate } from 'react-router-dom';
import { ADMIN_URLs } from '../../../../constants/admin-urls';

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard = ({ facility }: FacilityCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[8]
        }
      }}
      onClick={() => navigate(`${ADMIN_URLs.FACILITY.DETAILS}?id=${facility.touristFacilityId}`)}
    >
      <CardMedia component="img" height="140" image={facility.logoURL} alt={facility.touristFacilityName} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="div" noWrap>
              {facility.touristFacilityName}
            </Typography>
            {facility.account ? (
              <Tooltip title={`Người phụ trách: ${facility.account.fullname}`}>
                <Avatar src={facility.account.avatarURL} alt={facility.account.fullname} sx={{ width: 32, height: 32 }} />
              </Tooltip>
            ) : (
              <Tooltip title="Chưa có người phụ trách">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>-</Avatar>
              </Tooltip>
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" noWrap>
            {facility.emailTouristFacility}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {facility.address}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FacilityCard;
