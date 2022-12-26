import { URI } from 'react-native-dotenv';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box, HStack,
  Icon as NativeBaseIcon,
  Button as NativeBaseButton,
  AlertDialog as NativeBaseAlertDialog,
  useDisclose,
  Text,
  Image,
} from 'native-base';
import { ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../screens/Register/Register';
import { RootState } from '../../store';
import { invalidateToken } from '../../store/modules/token/actions';
import { LoadingSpinner } from '../LoadingSpinner';
import { IAlertDialog } from './ILogoutBox';

function Main({ children }: { children: ReactNode }) {
  return (
    <Box
      borderWidth="1"
      borderRadius="md"
      mx="10"
      mt="3"
      h="12"
      justifyContent="center"
      borderColor="gray.300"
    >
      <HStack alignItems="center" justifyContent="space-around">
        {children}
      </HStack>
    </Box>
  );
}

function Icon() {
  const user = useSelector<RootState, IUser | null>((state) => state.user);
  const imageUrl = user?.avatar_url?.replace('http://localhost:3333', URI);

  return (
    <HStack alignItems="center" space={2}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} alt="" size="10" rounded="full" />
      ) : (
        <NativeBaseIcon as={MaterialIcons} name="account-circle" size="3xl" />
      )}
      <Text>{user?.name}</Text>
    </HStack>
  );
}

function AlertDialog({
  isOpen, onClose, handleLogout, loading,
}: IAlertDialog) {
  const cancelRef = useRef(null);

  return (
    <NativeBaseAlertDialog leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
      <NativeBaseAlertDialog.Content>
        <NativeBaseAlertDialog.CloseButton />
        <NativeBaseAlertDialog.Header>Logout</NativeBaseAlertDialog.Header>
        <NativeBaseAlertDialog.Body>
          Are you sure you want to logout?
        </NativeBaseAlertDialog.Body>
        <NativeBaseAlertDialog.Footer>
          <NativeBaseButton.Group>
            <NativeBaseButton variant="unstyled" colorScheme="coolGray" onPress={onClose}>Cancel</NativeBaseButton>
            <NativeBaseButton colorScheme="danger" onPress={handleLogout} w="20">
              {loading ? <LoadingSpinner /> : 'Confirm'}
            </NativeBaseButton>
          </NativeBaseButton.Group>
        </NativeBaseAlertDialog.Footer>
      </NativeBaseAlertDialog.Content>
    </NativeBaseAlertDialog>
  );
}

function Button() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [loading, setIsLoading] = useState(false);

  const openAlertDialog = () => {
    onOpen();
  };

  const removeToken = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem('@storage_token');
    setIsLoading(false);
  };

  const handleLogout = () => {
    removeToken().then(() => {
      dispatch(invalidateToken());
      onClose();
    });
  };

  return (
    <>
      <NativeBaseButton
        onPress={openAlertDialog}
        variant="ghost"
        _text={{
          color: 'red.500',
        }}
        _pressed={{
          backgroundColor: 'transparent',
          _text: {
            color: 'red.400',
          },
        }}
      >
        Logout
      </NativeBaseButton>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        handleLogout={handleLogout}
        loading={loading}
      />
    </>
  );
}

export const LogoutBox = Object.assign(Main, {
  Icon, Button,
});
