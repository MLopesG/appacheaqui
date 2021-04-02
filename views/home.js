import React from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight, RefreshControl, ActivityIndicator } from 'react-native';
import { Searchbar, List, Divider } from 'react-native-paper';
import api from '../axios';
import BannerCidade from './components/bannerCidade';
import Carousel from './components/carousel';

import IconSearch from '../assets/icons/search.svg';
import IconClose from '../assets/icons/close.svg';

class Home extends React.Component {
  state = {
    search: '',
    categorias: [],
    carousel: [],
    carregamentoCarousel: true,
    carregamento: true,
    carregamentoCategorias: false,
    refreshing: false,
    estado: null,
    cidade: null
  };

  updateSearch = (search) => {
    this.setState((prevState) => {
      prevState['search'] = search;
      prevState['carregamentoCategorias'] = true;
      this.getCategoriasSearch(prevState.search);
      return prevState;
    });
  };

  async getBanners(tipo, id = null) {
    const {cidade} = this.state;

    const banners = await api.get(`/banner.php?action=all&tipo=${tipo}&cidade=${cidade}`);
    
    if(banners && banners.data.success){
      this.setState({ carousel: banners.data.banners, carregamentoCarousel: false });
    }
  }

  async getCategorias() {
    const categorias = await api.get('/categorias.php?action=all');

    if (categorias.data.success) {
      this.setState({ categorias: categorias.data.categorias, carregamento: false });
    }

    this.getBanners(0);
  }

  async registrarClick(id) {
    await api.get(`/categorias.php?action=click&id=${id}`);
  }

  async getCategoriasSearch(search) {
    const {cidade} = this.state;
    const getSearch = await api.get(`/categorias.php?action=search&search=${search}&cidade=${cidade}`);
    this.setState({ categorias: getSearch.data.data, carregamentoCategorias: false });
  }

  componentDidMount() {

    //Atribuir cidade e estado
    const { cidade, estado } = this.props.route.params;

    this.setState({
      estado:estado, 
      cidade: cidade
    })

    this.getCategorias();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true, carregamento: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getCategorias();
    }, 2000)

    clearTimeout();
  }

  render() {
    const { search, categorias, carregamento, carregamentoCarousel, carousel, refreshing, cidade } = this.state;
    const { navigation } = this.props;

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
            <Carousel carregamento={carregamentoCarousel} banners={carousel} navigation={navigation}></Carousel>
            <View>
              <Searchbar
                placeholder="Buscar categoria ..."
                onChangeText={this.updateSearch}
                value={search}
                icon={() => <IconSearch width={20} height={25} fill={"#212121"} />}
                clearIcon={() => <IconClose width={15} height={25} fill={"#212121"} />}
              />
            </View>
            <View>

              <View style={styles.categorias} >
                {
                  categorias.map((item, index) => {
                    return (
                      <View>
                        <TouchableHighlight
                          key={item.Id}
                          activeOpacity={0.6}
                          underlayColor="#DDDDDD"
                          onPress={() => {
                            this.registrarClick(item.Id);
                            navigation.navigate('Empresas', { id: item.Id, categoria: item.descricao, cidade:cidade })
                          }}
                        >
                          <List.Item
                            title={item.descricao}
                          />
                        </TouchableHighlight>
                        <Divider />
                      </View>
                    );
                  })
                }
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
  load: {
    padding: 30
  },
  input: {
    backgroundColor: 'white'
  },
  bottom: {
    marginBottom: 10
  },
  categorias: {
    height: '100%'
  }
});

export default Home;