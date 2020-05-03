import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const stacks = createStackNavigator({
  List: List,
  Book: Book,
});

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login: Login,
      Stack: stacks,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default Routes;
