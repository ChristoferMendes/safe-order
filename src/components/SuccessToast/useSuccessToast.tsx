import {
  Box, useToast, Text,
} from 'native-base';

export function useSuccesToast({ message }: { message: string }) {
  const toast = useToast();

  const showToast = () => {
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
