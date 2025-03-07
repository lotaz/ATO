import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import authenSlice from '../../redux/authenSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SignOut() {
  const user = useSelector((state: RootState) => state.authen.user);
  const { signOut } = authenSlice.actions;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/');
  };

  useEffect(() => {
    if (user !== null) handleSignOut();
  }, [user]);

  return <Button onClick={handleSignOut}>Click to Sign Out</Button>;
}
