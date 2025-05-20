import Search from "@mui/icons-material/Search";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { H2 } from "components/Typography";
// Add import for no data icon

const Hero = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #1976d2, #0d47a1)",
        py: { xs: 6, md: 10 },
        mb: 6,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8} sx={{ mx: "auto", textAlign: "center" }}>
            <H2 color="white" mb={2}>
              Công ty Du lịch
            </H2>
            <Typography color="white" sx={{ mb: 4, opacity: 0.9 }}>
              Khám phá và trải nghiệm cùng những công ty du lịch hàng đầu tại
              Việt Nam
            </Typography>

            {/* Search Bar in Hero */}
            {searchQuery && (
              <TextField
                fullWidth
                value={searchQuery}
                variant="outlined"
                placeholder="Tìm kiếm công ty..."
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "white",
                    borderRadius: 2,
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
