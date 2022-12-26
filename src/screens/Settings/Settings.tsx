import { View } from 'native-base';
import React from 'react';
import { LogoutBox } from '../../components/LogoutBox';

export function Settings() {
  return (
    <View>
      <LogoutBox>
        <LogoutBox.Icon />
        <LogoutBox.Button />
      </LogoutBox>
    </View>
  );
}
