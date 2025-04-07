import { Autocomplete, Chip, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { productService } from '../../services/tourism-facility/product.service';

interface Product {
  productId: string;
  productName: string;
}

interface ProductSelectorProps {
  selectedProducts: Product[];
  onChange: (products: Product[]) => void;
}

const ProductSelector = ({ selectedProducts, onChange }: ProductSelectorProps) => {
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Autocomplete
      multiple
      options={products}
      loading={loading}
      getOptionLabel={(option) => option.productName}
      value={selectedProducts}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Chọn sản phẩm"
          placeholder="Tìm kiếm sản phẩm..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? 'Đang tải...' : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => <Chip {...getTagProps({ index })} key={option.productId} label={option.productName} />)
      }
      isOptionEqualToValue={(option, value) => option.productId === value.productId}
    />
  );
};

export default ProductSelector;
