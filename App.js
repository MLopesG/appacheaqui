import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider as PaperProvider, IconButtona } from 'react-native-paper';
import Home from './views/home';
import Empresa from './views/empresa';
import Perfil from './views/profile';
import FaleConosco from './views/faleconosco';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <>
      <StatusBar backgroundColor="#006400" />
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Ache Aqui Ali"
              component={Home}
              options={({ navigation }) =>({
                title: 'ACHEI AQUI ALI',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (
                  <Icon name="information-outline" size={28} color="#006400"
                  style={styles.espaco}
                  onPress={() => navigation.navigate('FaleConosco')}
                  />
                ),
              })}
            />

            <Stack.Screen
              name="Empresas"
              component={Empresa}
              options={({ navigation }) =>({
                title: 'EMPRESAS',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (
                  <Icon name="information-outline" size={28} color="#006400"
                  style={styles.espaco}
                  onPress={() => navigation.navigate('FaleConosco')}
                  />
                ),
              })}
            />

            <Stack.Screen
              name="Profile"
              component={Perfil}
              options={({ navigation }) =>({
                title: 'Carregando perfil ...',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              })}
            />

            <Stack.Screen
              name="FaleConosco"
              component={FaleConosco}
              options={{
                title: 'Fale Conosco',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },

              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  espaco: {
      paddingRight: 20
  },
});
export default App;

