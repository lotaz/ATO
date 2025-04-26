import { Email, Language, LocationOn } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Link from "next/link";

const CompanyCard = ({ company }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        // height="200"
        image={company.logoURL}
        alt={company.companynName}
        sx={{ objectFit: "cover", bgcolor: "grey.50", height: 250 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Link href={`/tour-companies/${company.tourCompanyId}`} passHref>
          <Typography
            component="h3"
            variant="h6"
            sx={{
              mb: 1,
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            {company.companynName}
          </Typography>
        </Link>

        {company.companyDescription && (
          <Typography
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {company.companyDescription}
          </Typography>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {company.addressCompany}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email fontSize="small" color="action" />
            <MuiLink href={`mailto:${company.emailCompany}`} variant="body2">
              {company.emailCompany}
            </MuiLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Language fontSize="small" color="action" />
            <MuiLink href={company.website} target="_blank" variant="body2">
              Visit Website
            </MuiLink>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
