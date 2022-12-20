/* eslint-disable react/jsx-props-no-spreading */
import {
  IInputProps, FormControl, Input as NativeBaseInput,
} from 'native-base';

type Props = IInputProps & {
  label: string;
  errorMessage?: string | null;
}

export function Input({
  errorMessage = null, label, ...inputProps
}: Props) {
  const isInvalid = !!errorMessage || inputProps.isInvalid;
  const capitalizedFieldName = label.charAt(0).toUpperCase() + label.slice(1);
  const erroMessage = errorMessage ?? `${capitalizedFieldName} is mandatory`;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormControl.Label>{capitalizedFieldName}</FormControl.Label>
      <NativeBaseInput
        isInvalid={isInvalid}
        borderColor={isInvalid ? 'red.300' : ''}
        {...inputProps}
      />
      <FormControl.ErrorMessage>{erroMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
