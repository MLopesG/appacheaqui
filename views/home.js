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
    search: null,
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
      this.getCategoriasSearch(search);
      return prevState;
    });
  };

  async getCidade() {
    const { cidade } = this.props;

    if (cidade && cidade === null) return false;

    let cidadeGet = await api.get(`/cidades.php?action=single&cidade_id=${this.props.cidade}`);

    if (cidadeGet.data.cidade != null) {
      this.setState({ cidade: cidadeGet.data.cidade });
    }
  }

  async getBanners(tipo, id = null, cidade) {

    //Atribuir cidade e estado

    const banners = await api.get(`/banner.php?action=all&tipo=${tipo}&cidade=${cidade}`);

    if (banners && banners.data.success) {
      this.setState({ carousel: banners.data.banners, carregamentoCarousel: false });
    }
  }

  async getCategorias() {

    const { cidade, estado } = this.props.route.params;

    this.setState({
      estado: estado,
      cidade: cidade
    })

    const categorias = await api.get('/categorias.php?action=all');

    if (categorias.data.success) {
      this.setState({ categorias: categorias.data.categorias, carregamento: false, search: null });
    }

    this.getBanners(0, null, cidade);
  }

  async registrarClick(id, tipo) {
    if (tipo === 'empresa') {
      return await api.get(`/clientes.php?action=click&id=${id}`);
    }
    return await api.get(`/categorias.php?action=click&id=${id}`);
  }

  getCategoriasSearch(search) {
    const { cidade } = this.state;

    api.get(`/categorias.php?action=search&search=${search}&cidade=${cidade}`).then((getSearch) => {
      if (getSearch.data.success) {
        this.setState({ categorias: getSearch.data.data });
      }
    })
  }

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true, carregamento: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getCategorias();
    }, 1000)

    clearTimeout();
  }

  render() {
    const { search, categorias, carregamento, carregamentoCarousel, carousel, refreshing } = this.state;
    const { navigation } = this.props;

    const { cidade } = this.props.route.params;

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
            <View>
              <Carousel carregamento={carregamentoCarousel} banners={carousel} navigation={navigation}></Carousel>
            </View>
            <View>
              <Searchbar
                placeholder="Buscar categoria ..."
                onChangeText={(value) => this.updateSearch(value)}
                value={search}
                icon={() =>
                  <IconSearch width={20} height={25} fill={"#212121"} />
                }
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
                            this.registrarClick(item.Id, item.tipo);

                            if (item.tipo === 'categoria' || (item && !item.tipo)) {
                              return navigation.navigate('Empresas', { id: item.Id, categoria: item.descricao, cidade: cidade })
                            }

                            if(item.tipo === 'empresa'){
                              return navigation.navigate('Profile', { id: item.Id });
                            }
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