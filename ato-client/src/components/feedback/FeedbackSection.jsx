import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { get, post } from "helpers/axios-helper";
import useSWR from "swr";

const FeedbackSection = ({ entityId, entityType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [reload, setReload] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!entityId) return;

      try {
        const response = await get(
          entityType === "product"
            ? `/tourist/feedback/get-list-product-feedbacks/${entityId}`
            : `/tourist/feedback/get-list-tour-feedbacks/${entityId}`
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [entityId, reload]);

  console.log("feedbacks", feedbacks);

  const handleSubmit = async () => {
    try {
      await post(`/tourist/feedback/create-feeback`, {
        productId: entityType === "product" ? entityId : null,
        tourId: entityType === "tour" ? entityId : null,
        content,
        rating,
      });

      setReload(reload + 1);
      enqueueSnackbar("Đánh giá thành công", { variant: "success" });
      setContent("");
      setRating(0);
    } catch (error) {
      enqueueSnackbar("Gửi đánh giá thất bại", { variant: "error" });
    }
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Đánh giá
        </Typography>

        {/* Feedback Form */}
        <Box mb={4}>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập đánh giá của bạn..."
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={!content || !rating}
          >
            Gửi đánh giá
          </Button>
        </Box>

        {/* Feedback List */}
        {feedbacks?.map((feedback) => (
          <Box
            key={feedback.feedbackId}
            mb={3}
            sx={{ borderBottom: "1px solid #eee", pb: 2 }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar
                src={feedback.account?.avatarURL || "/placeholder.jpg"}
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography fontWeight="600">
                  {feedback.account?.fullname || "Khách hàng"}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Rating value={feedback.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {new Date(feedback.createTime).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography>{feedback.content}</Typography>
          </Box>
        ))}

        {!feedbacks?.length && (
          <Typography color="text.secondary" textAlign="center" py={2}>
            Chưa có đánh giá nào
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
