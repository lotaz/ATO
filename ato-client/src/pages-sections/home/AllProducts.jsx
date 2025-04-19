import { Button, Grid, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import ProductCard14 from "components/product-cards/ProductCard14";
import CategorySectionCreator from "components/CategorySectionCreator";
// styled component
const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
})); // ===========================================================

// ===========================================================
const AllProducts = ({ products }) => {
  return (
    <CategorySectionCreator title="Tất cả sản phẩm" seeMoreLink="#" mb={0}>
      <SubTitle>
        Phát triển bền vững, bao trùm và đa giá trị. Nền tảng du lịch nông thôn
        kết hợp giới thiệu sản phẩm OCOP địa phương
      </SubTitle>
      <Grid container mb={-0.5} spacing={3}>
        {products.map((item) => (
          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard14
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.thumbnail}
              product={item}
            />
          </Grid>
        ))}
      </Grid>

      <FlexRowCenter mt={6}>
        <Button color="primary" variant="contained">
          Xem tất cả sản phẩm
        </Button>
      </FlexRowCenter>
    </CategorySectionCreator>
  );
};

export default AllProducts;
