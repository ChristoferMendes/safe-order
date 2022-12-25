import {
  Box, useToast, Text,
} from 'native-base';

export function useSuccesToast() {
  const toast = useToast();

  const showToast = ({ message = '' }) => {
    toast.show({
      render: () => (
        <Box bg="green.400" px="7" py="4" rounded="xl" mb={5}>
          <Text color="white">
            { message }
          </Text>
        </Box>
      ),
    });
  };

  return showToast;
}
