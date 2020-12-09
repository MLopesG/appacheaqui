import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableHighlight, Linking, Platform } from 'react-native';
import { Searchbar, Surface, ToggleButton, Button, ActivityIndicator } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import BannerCidade from './components/bannerCidade';
import Carousel from './components/carousel';
import api from '../axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Empresa extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: '',
    empresas: [],
    carregamento: true,
    carregamentoCategorias: false
  };

  updateSearch = (search) => {
    this.setState((prevState) => {
      prevState['search'] = search;
      prevState['carregamentoCategorias'] = true;
      this.getEmpresasSearch(prevState.search);
      return prevState;
    });
  };

  async getEmpresasCategorias() {
    const { id } = this.props.route.params;

    const empresas = await api.get(`/categorias.php?action=empresas&id=${id}`);

    setTimeout(() => {
      this.setState({ empresas: empresas.data.empresas, carregamento: false });
    }, 500)
  }

  async getEmpresasSearch(search) {
    const getSearch = await api.get(`/categorias.php?action=empresas-search&search=${search}`);

    if (getSearch.data.empresas.length > 0) {
      this.setState({ empresas: getSearch.data.empresas, carregamentoCategorias: false });
    }
  }

  async registrarClick($id) {
    await api.get(`/clientes.php?action=click&id=${id}`);
  }

  componentDidMount() {
    this.getEmpresasCategorias();
  }

  whatsapp(phone) {
    Linking.canOpenURL("whatsapp://send?text=Ache Aqui Ali").then(supported => {

        return Linking.openURL(
          `https://api.whatsapp.com/send?phone=+55${phone}&text=Ache Aqui Ali`
        );
      
    })
  }

  phone(tel) {
    if (Platform.OS === 'android') {
      return `tel:${tel}`;
    } else {
      return `telprompt:${tel}`;
    }
  }

  maps(item) {
    return `https://www.google.com/maps/place/${item.end_rua}+${item.end_numero}+${item.nome}`;
  }

  render() {
    const { search, empresas, carregamento, carregamentoCategorias } = this.state;
    const { navigation } = this.props;

    if (carregamento) {
      return (
        <View style={styles.load}>
          <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View>
            <BannerCidade />
          </View>
          <View style={styles.container}>
            <Carousel tipo={1}></Carousel>
            <View>
              <Searchbar
                placeholder="Buscar ..."
                onChangeText={this.updateSearch}
                value={search}
              />

            </View>
            <View>
              <View style={styles.empresas} >
                {carregamentoCategorias ? (
                  <View style={styles.load}>
                    <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
                  </View>
                ) : <FlatGrid
                    itemDimension={140}
                    data={empresas}
                    renderItem={({ item, index }) => (
                      <View>
                        <TouchableHighlight
                          key={index}
                          activeOpacity={0.6}
                          underlayColor="#DDDDDD"
                          onPress={() => {
                            navigation.navigate('Profile', { id: item.Id });
                            this.registrarClick(item.Id);
                          }}
                        >
                          <Surface style={styles.surface} >
                            <Image
                              style={styles.Image}
                              source={{
                                uri: item.logo,
                              }}
                            />
                          </Surface>
                        </TouchableHighlight>
                        <ToggleButton.Row>
                          <Button icon="whatsapp" labelStyle={{ color: '#ffffff' }} color="#006400" style={[{ marginTop: 7, marginRight: 5, width: 57, borderColor: '#006400' }]} compact mode="contained" onPress={() => this.whatsapp(item.fonecelular)}></Button>
                          <Button icon="phone" labelStyle={{ color: '#ffffff' }} color="#006400" style={[{ marginTop: 7, marginRight: 5, width: 57, borderColor: '#006400' }]} compact mode="contained" onPress={() => Linking.openURL(this.phone(item.fonecelular))}></Button>
                          <Button labelStyle={{ color: '#ffffff' }} color="#006400" style={[{ marginTop: 7, marginRight: 5, width: 57, borderColor: '#006400' }]} compact mode="contained" onPress={() => Linking.openURL(this.maps(item))}>
                            <Icon name="map-marker" size={18} color="#ffffff"
                            />
                          </Button>
                        </ToggleButton.Row>
                      </View>
                    )}
                  />}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: 'white'
  },
  load: {
    padding: 30
  },
  bottom: {
    marginBottom: 10
  },
  top: {
    marginTop: 10
  },
  empresas: {
    height: '100%',
  },
  Image: {
    height: 150,
    width: 180
  },
  surface: {
    padding: 6,
    height: 150,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  }
});

export default Empresa;