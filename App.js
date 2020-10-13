import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import Home from './views/home';
import Empresa from './views/empresa';
import Perfil from './views/profile';
import Promocoes from './views/promocoes';
import Servicos from './views/servicos';
import FaleConosco from './views/faleconosco';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Ache Aqui"
              component={Home}
              options={({ navigation }) =>({
                title: 'Ache Aqui',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (
                  <IconButton
                    icon="006400"
                    color="#006400"
                    size={25}
                    onPress={() => navigation.navigate('FaleConosco')}
                  />
                ),
              })}
            />

            <Stack.Screen
              name="Empresas"
              component={Empresa}
              options={({ navigation }) =>({
                title: 'Empresas',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (
                  <IconButton
                    icon="006400"
                    color="#006400"
                    size={25}
                    onPress={() => navigation.navigate('FaleConosco')}
                  />
                ),
              })}
            />

            <Stack.Screen
              name="Profile"
              component={Perfil}
              options={({ navigation }) =>({
                title: 'Perfil',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              })}
            />

            <Stack.Screen
              name="Promocoes"
              component={Promocoes}
              options={({ navigation }) =>({
                title: 'Promoções',
                headerTitleAlign: 'center',
                headerTintColor: '#006400',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              })}
            />

            <Stack.Screen
              name="Serviços/Produtos"
              component={Servicos}
              options={({ navigation }) =>({
                title: 'Serviços/Produtos',
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
    );
  }
}

export default App;