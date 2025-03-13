import { Autocomplete, Chip, TextField } from '@mui/material';

const languages = [
  'Tiếng Việt',
  'Tiếng Anh',
  'Tiếng Trung',
  'Tiếng Nhật',
  'Tiếng Hàn',
  'Tiếng Pháp',
  'Tiếng Đức',
  'Tiếng Nga',
  'Tiếng Tây Ban Nha',
  'Tiếng Ý'
];

interface LanguageSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}

export const LanguageSelect = ({ value, onChange, error }: LanguageSelectProps) => {
  return (
    <Autocomplete
      multiple
      options={languages}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} error={error} placeholder="Chọn ngôn ngữ" />}
      renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
    />
  );
};
