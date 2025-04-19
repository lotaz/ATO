import { styled, bgcolor, compose, spacing, borderRadius } from "@mui/system";
const LazyImage = styled(({ borderRadius, ...rest }) => (
  <img style={{ objectFit: "cover" }} {...rest} />
))(compose(spacing, borderRadius, bgcolor));
export default LazyImage;
