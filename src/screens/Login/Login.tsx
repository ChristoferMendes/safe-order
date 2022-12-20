import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import SignIn from '../../components/SignIn/SignIn';

interface IUser {
  uuid: string
  name: string
}

function Login() {
  const dispatch = useDispatch();
  const users: IUser[] = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log('HEYYYY', users);
  }, [users]);

  return (
    <SignIn />
  );
}

export default Login;
