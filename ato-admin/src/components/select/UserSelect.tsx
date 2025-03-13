import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { accountService } from '../../services/account/accountService';
import { User } from '../../types';

interface UserSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const UserSelect = ({ value, onChange, error }: UserSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await accountService.getAccounts();
        setUsers(response);
        if (value) {
          const user = response.find((u) => u.id === value);
          setSelectedUser(user || null);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [value]);

  return (
    <Autocomplete
      options={users}
      value={selectedUser}
      onChange={(_, newValue) => {
        setSelectedUser(newValue);
        onChange(newValue?.id || '0');
      }}
      getOptionLabel={(option) => `${option.fullname} (${option.email})`}
      renderInput={(params) => <TextField {...params} error={error} placeholder="Chọn người dùng" />}
    />
  );
};
