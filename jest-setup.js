// import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({ children }) => children,
  };
});

jest.mock('react-native-reanimated', () => {
  const ReanimatedMock = {
    useSharedValue: jest.fn((initial) => {
      let val = initial;
      return {
        get value() { return val; },
        set value(v) { val = v; },
      };
    }),
    useAnimatedStyle: jest.fn(() => ({})),
    withTiming: jest.fn((v) => v),
    withSpring: jest.fn((v) => v),
    withRepeat: jest.fn((v) => v),
    withSequence: jest.fn((...args) => args[args.length - 1]),
    withDelay: jest.fn((_delay, v) => v),
    FadeIn: {},
    FadeInDown: {},
    FadeInUp: {},
    Easing: {
      bezier: jest.fn(),
      out: jest.fn(),
      in: jest.fn(),
      inOut: jest.fn(),
      sin: jest.fn(),
    },
    interpolate: jest.fn(),
  };

  // Support: import Animated, { ... } from 'react-native-reanimated'
  const Animated = {
    View: 'View',
  };

  return {
    __esModule: true,
    default: Animated,
    ...ReanimatedMock,
  };
});


jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props, props.children);
});

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Svg = props => React.createElement(View, props, props.children);
  const Path = props => React.createElement(View, props);
  const G = props => React.createElement(View, props, props.children);

  return {
    __esModule: true,
    default: Svg, // matches: import Svg, { Path } from 'react-native-svg'
    Svg,
    Path,
    G,
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  const store = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn(async (key) => store[key] || null),
      setItem: jest.fn(async (key, value) => { store[key] = value; }),
      removeItem: jest.fn(async (key) => { delete store[key]; }),
      clear: jest.fn(async () => { Object.keys(store).forEach(k => delete store[k]); }),
    },
  };
});

