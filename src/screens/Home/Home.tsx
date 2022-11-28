import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../services/api';
import { RootState } from '../../store';

interface IUser {
  uuid: string
  name: string
}

function Home() {
  const dispatch = useDispatch();
  const users: IUser[] = useSelector((state: RootState) => state.user);

  const handleHelloRedux = async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2NjAwMDMsImV4cCI6MTY2OTc0NjQwMywic3ViIjoiM2RlNTAzY2UtOWNhMi00ZTRjLWE5YjAtY2EyOWI0MmRjODdjIn0.yI3bwDPY86P6mGRd4FMlOVTKjrwVVL6bbOawNep2Vbo';

    const res = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'HELLO_REDUX',
      payload: res.data,
    });
  };

  useEffect(() => {
    console.log('HEYYYY', users);
  }, [users]);

  return (
    <View>
      <Button title="hello" onPress={handleHelloRedux} />
      {users && users.map((item) => (
        <Text key={item.uuid}>{item.name}</Text>
      ))}
    </View>
  );
}

export default Home;
