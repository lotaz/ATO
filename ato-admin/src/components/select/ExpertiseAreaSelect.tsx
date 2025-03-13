import { Autocomplete, TextField } from '@mui/material';

const expertiseAreas = [
  'Du lịch văn hóa',
  'Du lịch sinh thái',
  'Du lịch ẩm thực',
  'Du lịch tâm linh',
  'Du lịch nghỉ dưỡng',
  'Du lịch mạo hiểm',
  'Du lịch MICE',
  'Du lịch cộng đồng',
  'Du lịch thể thao',
  'Du lịch giáo dục'
];

interface ExpertiseAreaSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}

export const ExpertiseAreaSelect = ({ value, onChange, error }: ExpertiseAreaSelectProps) => {
  return (
    <Autocomplete
      multiple
      options={expertiseAreas}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} error={error} placeholder="Chọn lĩnh vực chuyên môn" />}
    />
  );
};
