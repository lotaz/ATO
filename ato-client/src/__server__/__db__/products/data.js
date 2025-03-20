import bazaarReactDatabase from "data/bazaar-react-database";
import products from "data/product-database";
import { products as healthBeauty } from "../health-beauty/data";
import {
  frequentlyBoughtData,
  relatedProducts,
} from "../related-products/data";
const dbProducts = [...bazaarReactDatabase, ...products]; // all used products in the bazaar template

const productList = [
  ...dbProducts,
  ...healthBeauty,
  ...relatedProducts,
  ...frequentlyBoughtData,
]; // get unique products from prouct list

const uniqueProudcts = [...new Set(productList.map((item) => item.slug))].map(
  (item) => productList.find((it) => it.slug === item)
); // get the all slugs

const slugs = uniqueProudcts.map((item) => ({
  params: {
    slug: item.slug,
  },
}));
export { slugs, uniqueProudcts };
