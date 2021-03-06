import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';
import Router from './router';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { colors, typography } from '../config/styles';

var styles = {
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
};
const defaultRouteConfig = {
  navigationBar: {
    tintColor: colors.white,
    titleStyle: {
      fontFamily: typography.fontMain
    },
    renderBackground: () => (
      <LinearGradient
        colors={[colors.purple, colors.red]}
        style={styles.linearGradient}
        start={{x: 1, y: 0}}
        end={{x: -1, y: 1.0}}
        locations={[0,.6]}
      />
    )
  }
};

class NavigationLayout extends Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }
  render(){
    return (
      <DrawerNavigation
        initialItem='schedule'
        tabBarColor={colors.black}
        drawerWidth={220}
      >
        <DrawerNavigationItem
          id='schedule'
          title='Schedule'
          renderTitle={isSelected => this._renderTitle(' Schedule', isSelected)}
          renderIcon={isSelected => this.renderIcon('md-calendar', isSelected)}
        >
          <StackNavigation
            id='schedule'
            navigatorUID="schedule"
            initialRoute={Router.getRoute('Schedule')}
            defaultRouteConfig={defaultRouteConfig}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id='Faves'
          title='Faves'
          renderTitle={isSelected => this._renderTitle(' Faves', isSelected)}
          renderIcon={isSelected => this.renderIcon('md-heart', isSelected)}
        >
          <StackNavigation
            id='Faves'
            navigatorUID="Faves"
            initialRoute={Router.getRoute('Faves')}
            defaultRouteConfig={defaultRouteConfig}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id='About'
          renderTitle={isSelected => this._renderTitle(' About', isSelected)}
          renderIcon={isSelected => this.renderIcon('md-information-circle', isSelected)}
        >
          <StackNavigation
            id='about'
            initialRoute={Router.getRoute('About')}
            defaultRouteConfig={defaultRouteConfig}
          />
        </DrawerNavigationItem>
      </DrawerNavigation>
    );
  }
  _renderTitle(text, isSelected) {
    return (
      <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
        {text}
      </Text>
    );
  }
  renderIcon(iconName, isSelected){
    return <Icon name={iconName} size={24} color={isSelected ? colors.black : colors.mediumGrey}/>
  }
  renderTitle(isSelected, title){
    const titleStyle = {
      color: isSelected ? colors.white : colors.mediumGrey,
      fontSize: 12,
      fontFamily: typography.fontMain
    };
    return <Text style={titleStyle}>{title}</Text>
  }
}

export default NavigationLayout;
