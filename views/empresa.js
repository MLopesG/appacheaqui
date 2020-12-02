import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableHighlight, Linking, Platform } from 'react-native';
import { Searchbar, Surface, ToggleButton, Button, ActivityIndicator } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import BannerCidade from './components/bannerCidade';
import Carousel from './components/carousel';
import api from '../axios';

class Empresa extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: '',
    empresas: [],
    carregamento: true,
    carregamentoCategorias: false,
    showCancel: false,
  };

  updateSearch = (search) => {
    this.setState((prevState) => {
      prevState['search'] = search;
      prevState['showCancel'] = true;
      prevState['carregamentoCategorias'] = true;
      this.getEmpresasSearch(prevState.search);
      return prevState;
    });
  };

  toggleCancel() {
    this.setState({
      showCancel: !this.state.showCancel
    });
  }

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
      if (supported) {
        return Linking.openURL(
          `whatsapp://send?phone=${phone}&text=Ache Aqui Ali`
        );
      } else {
        return Linking.openURL(
          `https://api.whatsapp.com/send?phone=${phone}&text=Ache Aqui Ali`
        );
      }
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
    const { search, empresas, showCancel, carregamento, carregamentoCategorias } = this.state;
    const { navigation } = this.props;

    if (carregamento) {
      return (
        <View style={styles.load}>
          <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
        </View>
      );
    } else {
      if (showCancel) {
        return (
          <View  style={styles.container}>
            <View >
              <View>
                <Searchbar
                onIconPress={() => {
                  this.toggleCancel()
                }}
                  placeholder="Buscar ..."
                  onChangeText={this.updateSearch}
                  value={search}
                />

              </View>
              <View>
                <ScrollView style={styles.categoriasAuto} >
                {
                carregamentoCategorias ? 
                (
                <View style={styles.load}>
                  <ActivityIndicator size={35} animating={carregamentoCategorias} color={'#006400'} />
                </View>
                ):
                 <FlatGrid
                    itemDimension={150}
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
                          <Button icon="whatsapp" labelStyle={{color:'#006400'}} color="#006400"  style={[ { marginTop:7, marginRight:5, width:57, borderColor: '#006400'}]} compact mode="outlined" onPress={() =>Linking.openURL(this.whatsapp(item.fonecelular))}></Button>
                          <Button icon="phone" labelStyle={{color:'#006400'}}  color="#006400"  style={[ { marginTop:7, marginRight:5, width:57, borderColor: '#006400'}]} compact mode="outlined" onPress={() =>Linking.openURL(this.phone(item.fonecelular))}></Button>
                          <Button icon="map" labelStyle={{color:'#006400'}} color="#006400" style={[ { marginTop:7 , marginRight:5, width:57, borderColor: '#006400'}]} compact mode="outlined" onPress={() =>Linking.openURL(this.maps(item))}></Button>
                        </ToggleButton.Row>
                      </View>
                    )}
                  />}
                </ScrollView>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <View>
              <BannerCidade />
            </View>
            <View style={styles.container}>
              <Carousel tipo={1}></Carousel>
              <View>
                <Searchbar
                onIconPress={() => {
                  this.toggleCancel()
                }}
                  placeholder="Buscar ..."
                  onChangeText={this.updateSearch}
                  value={search}
                />

              </View>

              <View>
                <ScrollView style={styles.empresas} >
                  { carregamentoCategorias ? (
                     <View style={styles.load}>
                     <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
                   </View>
                  ) : <FlatGrid
                    itemDimension={150}
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
                          <Button icon="whatsapp" labelStyle={{color:'#006400'}} color="#006400"  style={[ { marginTop:7, marginRight:5, width:57, borderColor: '#006400'}]} compact mode="outlined" onPress={() =>Linking.openURL(this.whatsapp(item.fonecelular))}></Button>
                          <Button icon="phone" labelStyle={{color:'#006400'}}  color="#006400"  style={[ { marginTop:7, marginRight:5, width:57, borderColor: '#006400'}]} compact mode="outlined" onPress={() =>Linking.openURL(this.phone(item.fonecelular))}></Button>
                          <Button icon="map" labelStyle={{color:'#006400'}} color="#006400" style={[ { marginTop:7 , marginRight:5, width:57, borderColor: '#006400'}]} compact mode="outlined" onPress={() =>Linking.openURL(this.maps(item))}></Button>
                        </ToggleButton.Row>
                      </View>
                    )}
                  />}
                </ScrollView>
              </View>
            </View>
          </View>
        );
      }
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
    height: 350,
  },
  Image: {
    height: 150,
    width: 180
  },
  surface: {
    padding: 8,
    height: 150,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  categoriasAuto: {
    height: '100%'
  }
});

export default Empresa;