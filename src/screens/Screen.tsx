import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Coin} from '../components/Coin';
import coin from '../assets/icons/coin.png';
import reset from '../assets/icons/reset.png';
import {useScreen} from '../hooks/useScreen';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Screen = () => {
  const {
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
  } = useScreen();

  const renderCoins = () =>
    [...new Array(score > 10 ? 10 : score)].map((value, index) => (
      <Coin
        key={index}
        index={index}
        setIsAnimateActive={setIsAnimateActive}
        isLast={index === (score > 10 ? 10 : score) - 1}
        editText={editText}
        coordinates={coordinates}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.sumContainer}>
            <View ref={iconViewRef} onLayout={onLayoutImg}>
              <Image source={coin} style={styles.img} />
            </View>
            <AnimatedTextInput
              style={[styles.sum, sumStyle]}
              ref={sumRef}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.emptyBlock} />
        <View style={styles.block}>
          <View style={styles.blockContent}>
            <View style={styles.scoreContainer}>
              <Animated.Image source={coin} style={[styles.img, scoreStyle]} />
              {isAnimateActive && renderCoins()}
              <AnimatedTextInput
                style={styles.score}
                ref={scoreRef}
                editable={false}
              />
            </View>
            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Image source={reset} style={styles.img} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onClick}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50599b',
  },
  header: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sumContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
  },
  sum: {
    marginLeft: 10,
    fontSize: 24,
    color: 'white',
    minWidth: 35,
    textAlign: 'right',
    padding: 0,
  },
  emptyBlock: {
    height: 400,
  },
  block: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 30,
    padding: 15,
    margin: 20,
  },
  blockContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#50599b',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  score: {
    marginLeft: 10,
    fontSize: 16,
    minWidth: 30,
    textAlign: 'right',
    padding: 0,
    color: 'black',
  },
  coin: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 10,
    bottom: 5,
  },
  img: {
    width: 30,
    height: 30,
  },
  resetButton: {
    padding: 15,
  },
});
