import React from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import coin from '../assets/icons/coin.png';
import {useCoin} from '../hooks/useCoin';

type Coordinates = {
  x: number;
  y: number;
};

type CoinProps = {
  setIsAnimateActive: (value: boolean) => void;
  editText: (isLast: boolean) => void;
  isLast: boolean;
  index: number;
  coordinates: Coordinates;
};

export const Coin = (props: CoinProps) => {
  const {index, imageRef, coinCoordinate, coinStyle, setCoinCoordinate} =
    useCoin(props);

  return (
    <Animated.Image
      ref={imageRef}
      onLayout={() => {
        if (imageRef.current && !coinCoordinate) {
          imageRef.current.measure((x, y, width, height, pageX, pageY) => {
            setCoinCoordinate({x: pageX, y: pageY});
          });
        }
      }}
      source={coin}
      style={[styles.coin, coinStyle, {zIndex: 20 - index}]}
    />
  );
};

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    left: 10,
    bottom: 5,
    zIndex: 2,
  },
});
