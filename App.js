import 'react-native-gesture-handler';
import React from 'react';

import { Dimensions, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Home from './views/home';
import Empresa from './views/empresa';
import Perfil from './views/profile';
import FaleConosco from './views/faleconosco';
import Inicial from './views/inicial';

import IconInformation from './assets/icons/Information.svg';
import BackIcon from './assets/icons/backLeft.svg';

const { height } = Dimensions.get("screen");

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#006400" />
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicial">
              <Stack.Screen
                name="Ache Aqui Ali"
                component={Home}
                options={({ navigation }) => ({
                  title: 'ACHEI AQUI ALI',
                  headerTitleAlign: 'center',
                  headerTintColor: '#006400',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.070
                  },
                  headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('FaleConosco')}>
                      <IconInformation width={80} height={25} fill={"#006400"} />
                    </TouchableOpacity>
                  ),
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <BackIcon style={{ marginLeft: 20 }} height="25" width="25" fill={"#006400"} />
                    </TouchableOpacity>
                  )
                })}
              />

              <Stack.Screen
                name="Empresas"
                component={Empresa}
                options={({ navigation }) => ({
                  title: 'EMPRESAS',
                  headerTitleAlign: 'center',
                  headerTintColor: '#006400',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.070
                  },
                  headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('FaleConosco')}>
                      <IconInformation width={80} height={25} fill={"#006400"} />
                    </TouchableOpacity>
                  ),
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <BackIcon style={{ marginLeft: 20 }} height="25" width="25" fill={"#006400"} />
                    </TouchableOpacity>
                  )
                })}
              />

              <Stack.Screen
                name="Profile"
                component={Perfil}
                options={({ navigation }) => ({
                  title: 'Carregando perfil ...',
                  headerTitleAlign: 'center',
                  headerTintColor: '#006400',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.070
                  },
                  headerLeft: (navigation) => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <BackIcon style={{ marginLeft: 20 }} height="25" width="25" fill={"#006400"} />
                    </TouchableOpacity>
                  )
                })}
              />

              <Stack.Screen
                name="Inicial"
                component={Inicial}
                options={({ navigation }) => ({
                  title: 'Escolha sua cidade',
                  headerTitleAlign: 'center',
                  headerTintColor: '#006400',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.070
                  },
                })}
              />

              <Stack.Screen
                name="FaleConosco"
                component={FaleConosco}
                options={({ navigation }) => ({
                  title: 'Fale Conosco',
                  headerTitleAlign: 'center',
                  headerTintColor: '#006400',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.070
                  },
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <BackIcon style={{ marginLeft: 20 }} height="25" width="25" fill={"#006400"} />
                    </TouchableOpacity>
                  )
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </>
    );
  }
}


export default App;

