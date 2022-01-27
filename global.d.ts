import { StackScreenProps } from '@react-navigation/stack';

type StackParamList = {
  Home: any;
  Login: undefined;
  Registration: undefined;
  Subscriptions: undefined;
  ClozemasterScreen: undefined;
  SubscriptionsScreen: undefined;
  AddKeyWord : undefined;
  AddInterest: undefined;
  AddSubscriptionsTabs: undefined;
  ArticleView: any;
  ArticlesStack: any;
  Settings: any;
  "Articles": undefined;
};

type loginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

type registrationScreenProps = StackScreenProps<RootStackParamList, 'Registration'>;

type homeScreenProps = StackScreenProps<RootStackParamList, 'Subscribtions'>;