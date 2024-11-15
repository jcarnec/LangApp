import { StackScreenProps } from '@react-navigation/stack';

type StackParamList = {
  Home: any;
  Login: any;
  Registration: any;
  Subscriptions: any;
  ClozemasterScreen: any;
  SubscriptionsScreen: any;
  AddSubscriptionsScreen: any;
  AddInterestsScreen: any;
  AddKeyWord : any;
  AddInterest: any;
  AddSubscriptions: any;
  ArticleView: any;
  ArticlesStack: any;
  Settings: any;
  "Articles": any;
};

type loginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

type registrationScreenProps = StackScreenProps<RootStackParamList, 'Registration'>;

type homeScreenProps = StackScreenProps<RootStackParamList, 'Subscribtions'>;