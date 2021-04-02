import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableHighlight, ActivityIndicator, Linking, Platform, Text, RefreshControl } from 'react-native';
import { Searchbar, Surface, ToggleButton, Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import BannerCidade from './components/bannerCidade';
import Carousel from './components/carousel';
import api from '../axios';

import IconMaps from '../assets/icons/maps.svg';
import IconPhone from '../assets/icons/call.svg';
import IconWhatsapp from '../assets/icons/whatsapp.svg';
import IconSearch from '../assets/icons/search.svg';
import IconClose from '../assets/icons/close.svg';

class Empresa extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: '',
    empresas: [],
    carousel: [],
    carregamentoCarousel: true,
    carregamento: true,
    carregamentoCategorias: false,
    refreshing: false,
    cidade:null
  };

  updateSearch = async (search) => {
    this.setState((prevState) => {
      prevState['search'] = search;
      prevState['carregamentoCategorias'] = true;
      this.getEmpresasSearch(prevState.search);
      
      return prevState;
    });
  };

  async getEmpresasCategorias() {
    const { id, categoria, cidade } = this.props.route.params;

    this.props.navigation.setOptions({ title: categoria });

    const empresas = await api.get(`/categorias.php?action=empresas&id=${id}&cidade=${cidade}`);

    setTimeout(() => {
      this.setState({ empresas: empresas.data.empresas, carregamento: false , cidade: cidade});
    }, 500)

    this.getBanners(1);
  }

  async getEmpresasSearch(search) {
    this.setState({ carregamentoCategorias: true });

    const filter = this.state.empresas.filter(function (el) {
      return el.razaosocial.indexOf(search) >= 0 ||
        el.nomefantasia.indexOf(search) >= 0 ||
        el.tags.indexOf(search) >= 0 ||
        el.descricaodaempresa.indexOf(search) >= 0; 
    });
    
    if (filter.length > 0) {
      this.setState({ empresas: filter, carregamentoCategorias: false });
    }
  }

  async registrarClick(id) {
    await api.get(`/clientes.php?action=click&id=${id}`);
  }

  async registrarClickBtn(tipo, id) {
    // Tipos de registro
    // id_empresa_whatsapp
    // id_empresa_telefone
    // id_empresa_mapa
    await api.get(`/click.php?action=register&tipo=${tipo}&id=${id}`);
  }

  componentDidMount() {
    this.getEmpresasCategorias();
  }

  whatsapp(phone, id) {
     // Registrar click no banco de dados
    this.registrarClickBtn('id_empresa_whatsapp', id);

    Linking.canOpenURL("whatsapp://send?text=Ache Aqui Ali").then(supported => {

      return Linking.openURL(
        `https://api.whatsapp.com/send?phone=+55${phone}&text=Ache Aqui Ali`
      );

    })
  }

  phone(tel, id) {
     // Registrar click no banco de dados
    this.registrarClickBtn('id_empresa_telefone', id);

    if (Platform.OS === 'android') {
      return `tel:${tel}`;
    } else {
      return `telprompt:${tel}`;
    }
  }

  tituloEmpresa(item) {
    if (item.tipo === 'pf') {
      return item.apelido != null ? item.apelido : item.nomecompleto;
    } else {
      return item.nomefantasia != null ? item.nomefantasia : item.razaosocial;
    }
  }

  maps(item) {
    // Registrar click no banco de dados
    this.registrarClickBtn('id_empresa_mapa', item.Id);

    return `https://www.google.com/maps/place/${item.end_rua}+${item.end_numero}+${item.nome}`;
  }

  async getBanners(tipo) {
    const {cidade} =  this.props.route.params;

    const banners = await api.get(`/banner.php?action=all&tipo=${tipo}&cidade=${cidade}`);

    if(banners && banners.data.success){
      this.setState({ carousel: banners.data.banners, carregamentoCarousel: false });
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true, carregamento: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getEmpresasCategorias();
    }, 2000)

    clearTimeout();
  }

  render() {
    const { search, empresas, carregamento, carregamentoCategorias, carregamentoCarousel, carousel, refreshing, cidade } = this.state;
    const { navigation } = this.props;
   
    const Entities = require('html-entities').XmlEntities;
    const entities = new Entities();


    if (carregamento) {
      return (
        <View style={styles.load}>
          <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
        </View>
      );
    } else {
      return (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh} />}>
          <View>
          <BannerCidade cidade={cidade} />
          </View>
          <View style={styles.container}>
            <Carousel carregamento={carregamentoCarousel} banners={carousel}></Carousel>
            <View>
              <Searchbar
                placeholder="Buscar ..."
                onChangeText={this.updateSearch}
                value={search}
                icon={() => <IconSearch  width={20} height={25} fill={"#212121"} />}
                clearIcon={() => <IconClose  width={15} height={25} fill={"#212121"} />}
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
                          <View>
                            <Surface style={styles.surface} >
                              <Image
                              resizeMode="cover"
                                style={styles.Image}
                                source={item.logo != null ? { uri: item.logo } : require('./imagens/logo_padrao.fw.png')}
                              />
                            </Surface>

                            <Surface style={styles.surfaceHeader}>
                              <Text style={styles.header}>{entities.decode(this.tituloEmpresa(item))}</Text>
                            </Surface>
                            
                          </View>
                        </TouchableHighlight>
                        <ToggleButton.Row style={styles.center}>
                          <View style={styles.button}>
                            <Button style={styles.btn} icon={() => <IconWhatsapp  width={15} height={25} fill="#006400" />}  labelStyle={{ color: '#006400' }} color="#ffffff" compact mode="contained" onPress={() => this.whatsapp(item.fonecelular, item.Id)}></Button>
                          </View>
                          <View style={styles.button}>
                            <Button style={styles.btn} icon={() => <IconPhone  width={15} height={25} fill="#006400" />} labelStyle={{ color: '#006400' }} color="#ffffff" compact mode="contained" onPress={() => Linking.openURL(this.phone(item.fonecelular, item.Id))}></Button>
                          </View>
                          <View style={styles.button}>
                            <Button style={styles.btn}  icon={() => <IconMaps  width={15} height={25} fill="#006400" />} labelStyle={{ color: '#006400' }} color="#ffffff" compact mode="contained"  onPress={() => Linking.openURL(this.maps(item))}></Button>
                          </View>
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
    height: 140,
    width: '100%',
  },
  surface: {
    height: 140,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  surfaceHeader:{
    elevation: 2
  },
  header: {
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 12,
    textAlign: 'center',
    color: '#006400',
    fontWeight:'bold'
  }, 
  button:{
    marginTop:8
  },
  btn:{
    width:50,
    height:35,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  center:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default Empresa;