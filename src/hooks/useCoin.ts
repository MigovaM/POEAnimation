import {useEffect, useRef, useState} from 'react';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Coordinates = {
  x: number;
  y: number;
};

type useCoinProps = {
  setIsAnimateActive: (value: boolean) => void;
  editText: (isLast: boolean) => void;
  isLast: boolean;
  index: number;
  coordinates: Coordinates;
};

export const useCoin = (props: useCoinProps) => {
  const {setIsAnimateActive, editText, isLast, index, coordinates} = props;
  const [coinCoordinate, setCoinCoordinate] = useState<Coordinates | null>();
  const iconSize = useSharedValue<number>(30);
  const iconTransition = useSharedValue<number>(0);
  const imageRef = useRef<Animated.Image>(null);
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    iconSize.value = withSpring(60, {damping: 100});
    setTimeout(() => {
      iconSize.value = withSpring(30, {damping: 100});
      iconTransition.value = withTiming(20, {duration: 2000});
      editText(isLast);
      setTimeout(() => {
        if (isLast) {
          setIsAnimateActive(false);
        }
      }, 300);
    }, 1000 + index * 100);
  }, []);

  const coinStyle = useAnimatedStyle(() => {
    return {
      width: iconSize.value,
      height: iconSize.value,
      opacity: interpolate(iconTransition.value, [0, 0.9, 1], [1, 1, 0]),
      transform: [
        {
          translateX: interpolate(
            iconTransition.value,
            [0, 0.5, 1],
            [0, 10, coordinates.x - (coinCoordinate?.x || 0)],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            iconTransition.value,
            [0, 1],
            [0, coordinates.y - (coinCoordinate?.y || 0) + top],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [coordinates.y]);

  const onLayoutImg = () => {
    if (imageRef.current && !coinCoordinate) {
      imageRef.current.measure((x, y, width, height, pageX, pageY) => {
        setCoinCoordinate({x: pageX, y: pageY});
      });
    }
  };

  return {
    index,
    imageRef,
    coinStyle,
    onLayoutImg,
  };
};
