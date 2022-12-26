import { Image, View } from 'native-base';
import React from 'react';
import { LogoutBox } from '../../components/LogoutBox';

export function Settings() {
  const image = 'https://b4c9-201-40-65-124.sa.ngrok.io/files/0b15340b9eee81768517-WhatsApp%20Image%202022-11-28%20at%2017.43.16.jpeg';
  return (
    <View>
      <LogoutBox>
        <LogoutBox.Icon />
        <LogoutBox.Button />
      </LogoutBox>
    </View>
  );
}
