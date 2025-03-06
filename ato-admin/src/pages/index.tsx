import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_BASE_URL } from '../constants/admin-urls';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${ADMIN_BASE_URL}`);
  });
  return <>Trang chủ</>;
};

export default Index;
