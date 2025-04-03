import { SearchOutlined } from '@ant-design/icons';
import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';

interface IProps extends OutlinedInputProps {
  placeholder: string;
}

const AppSearchBar = ({ placeholder, onChange }: IProps) => {
  return (
    <OutlinedInput
      onChange={onChange}
      sx={{ backgroundColor: 'white', minWidth: '400px' }}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlined />
        </InputAdornment>
      }
      placeholder={placeholder}
    />
  );
};

export default AppSearchBar;
