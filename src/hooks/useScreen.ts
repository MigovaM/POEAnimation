import {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Coordinates = {
  x: number;
  y: number;
};

let sum = 0;
let score = 5;

const initialCoordinates = {x: 0, y: 0};

export const useScreen = () => {
  const [isAnimateActive, setIsAnimateActive] = useState<boolean>(false);
  const [coordinates, setCoordinates] =
    useState<Coordinates>(initialCoordinates);
  let iconViewRef = useRef<View>(null);

  const animatedActive = isAnimateActive ? 1 : 0;

  const sumRef = useRef<TextInput>(null);
  const scoreRef = useRef<TextInput>(null);

  const setText = () => {
    sumRef?.current?.setNativeProps({text: `${sum}`});
    scoreRef?.current?.setNativeProps({
      text: `${score > 0 ? '+' : ''}${score}`,
    });
  };

  const sumStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(animatedActive, [0, 1], [16, 20]);

    return {
      fontSize: withTiming(fontSize, {duration: animatedActive ? 800 : 300}),
    };
  });

  const editText = useCallback((isLast: boolean) => {
    if (isLast) {
      sum += score;
      score = 0;
    } else {
      ++sum;
      --score;
    }

    setText();
  }, []);

  useEffect(() => {
    setText();
  }, []);

  const scoreStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedActive, [0, 1], [1, 0]),
    };
  });

  const onClick = () => {
    if (score) {
      setIsAnimateActive(true);
    }
  };

  const onReset = () => {
    score = Math.floor(Math.random() * 15);
    setText();
  };

  const setCoordinatesHandler = (pageX: number, pageY: number) => {
    setCoordinates({x: pageX, y: pageY});
  };

  const onLayoutImg = () => {
    if (iconViewRef.current) {
      iconViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setCoordinatesHandler(pageX, pageY);
      });
    }
  };

  return {
    isAnimateActive,
    score,
    coordinates,
    sumRef,
    scoreRef,
    iconViewRef,
    sumStyle,
    editText,
    scoreStyle,
    setIsAnimateActive,
    onClick,
    onReset,
    onLayoutImg,
  };
};
