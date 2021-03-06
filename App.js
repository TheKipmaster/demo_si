import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import reducers from './src/reducers'

import {
  MyListingsScreen,
  ListingDetailsScreen,
  NewListingScreen,
  FleaMarketScreen,
  NewEventScreen,
  TimelineScreen,
  ProfileScreen,
  LoginScreen,
} from './src/screens';

import NavigationService from './src/NavigationService';

console.disableYellowBox = true;

const ProfileStack = createStackNavigator(
  {
    ProfileScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    defaultNavigationOptions: {
      title: 'Perfil',
    },
  }
);

const TimelineStack = createStackNavigator(
  {
    TimelineScreen,
    NewEventScreen: {
      screen: NewEventScreen,
      navigationOptions: () => ({
        title: 'Novo Evento',
      }),
    },
  },
  {
    initialRouteName: 'TimelineScreen',
    defaultNavigationOptions: {
      title: 'Linha do Tempo',
    },
  }
);

const MyListingsStack = createStackNavigator(
  {
    MyListingsScreen,
    NewListingScreen: {
      screen: NewListingScreen,
      navigationOptions: () => ({
        title: 'Novo Anúncio',
      }),
    },
    ListingDetailsScreen: {
      screen: ListingDetailsScreen,
      navigationOptions: () => ({
        title: 'Detalhes do Anúncio',
      }),
    },
  },
  {
    initialRouteName: 'MyListingsScreen',
    defaultNavigationOptions: {
      title: 'Meus Anúncios',
    },
  }
);

const FleaMarketStack = createStackNavigator(
  {
    FleaMarketScreen,
    ListingDetailsScreen: {
      screen: ListingDetailsScreen,
      navigationOptions: () => ({
        title: 'Detalhes do Anúncio',
      }),
    },
  },
  {
    initialRouteName: 'FleaMarketScreen',
    defaultNavigationOptions: {
      title: 'Mercado de Pulgas',
    },
  }
);

const Main = createDrawerNavigator(
  {
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        title: 'Perfil',
      }),
    },
    Timeline: {
      screen: TimelineStack,
      navigationOptions: () => ({
        title: 'Linha do Tempo',
      }),
    },
    MyListings: {
      screen: MyListingsStack,
      navigationOptions: () => ({
        title: 'Meus Anúncios',
      }),
    },
    FleaMarket: {
      screen: FleaMarketStack,
      navigationOptions: () => ({
        title: 'Mercado de Pulgas',
      }),
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

const navigator = createSwitchNavigator(
  {
    LoginScreen,
    Main,
  },
  {
    initialRouteName: 'LoginScreen',
    defaultNavigationOptions: {
      title: 'Login'
    }
  }
);

const Navigation = createAppContainer(navigator);
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation
          ref={(navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef))}
        />
      </Provider>
    );
  }
}
