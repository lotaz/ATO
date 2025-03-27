import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";
import ShopLayout2 from "components/layouts/ShopLayout2";
import { H2 } from "components/Typography";
import Footer from "components/footer/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <ShopLayout2>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1976d2, #0d47a1)",
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <H2 color="white" textAlign="center" mb={2}>
            Liên hệ với chúng tôi
          </H2>
          <Typography
            color="white"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Box mb={4}>
                <Typography variant="h5" gutterBottom fontWeight="600">
                  Thông tin liên hệ
                </Typography>
                <Typography color="text.secondary">
                  Liên hệ với chúng tôi qua các kênh sau
                </Typography>
              </Box>

              <Box mb={3} display="flex" alignItems="center">
                <LocationOn color="primary" sx={{ mr: 2 }} />
                <Typography>
                  123 Đường ABC, Phường XYZ
                  <br />
                  Quận 1, TP.HCM
                </Typography>
              </Box>

              <Box mb={3} display="flex" alignItems="center">
                <Phone color="primary" sx={{ mr: 2 }} />
                <Typography>+84 123 456 789</Typography>
              </Box>

              <Box mb={4} display="flex" alignItems="center">
                <Email color="primary" sx={{ mr: 2 }} />
                <Typography>support@example.com</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  Theo dõi chúng tôi
                </Typography>
                <Box>
                  <IconButton color="primary">
                    <Facebook />
                  </IconButton>
                  <IconButton color="primary">
                    <Twitter />
                  </IconButton>
                  <IconButton color="primary">
                    <Instagram />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="600">
                Gửi tin nhắn cho chúng tôi
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tiêu đề"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nội dung"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{ px: 4 }}
                    >
                      Gửi tin nhắn
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          {/* Google Maps */}
          <Grid item xs={12}>
            <Card sx={{ height: 450, overflow: "hidden" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.69843037465353!3d10.778789989318721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1690341775844!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer
        id="footer"
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800",
        }}
      />
    </ShopLayout2>
  );
};

export default ContactPage;
