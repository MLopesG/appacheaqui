import React from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Searchbar, List, Divider, ActivityIndicator, Colors } from 'react-native-paper';
import api from '../axios';
import BannerCidade from './components/bannerCidade';
import Carousel from './components/carousel';

class Home extends React.Component {
  state = {
    search: '',
    categorias: [],
    carregamento: true,
    carregamentoCategorias: false,
  };

  updateSearch = (search) => {
    this.setState((prevState) => {
      prevState['search'] = search;
      prevState['carregamentoCategorias'] = true;
      this.getCategoriasSearch(prevState.search);
      return prevState;
    });
  };

  async getCategorias() {
    const categorias = await api.get('/categorias.php?action=all');

    if (categorias.data.success) {
      setTimeout(() => {
        this.setState({ categorias: categorias.data.categorias, carregamento: false });
      }, 500)
    }
  }

  async registrarClick($id) {
    await api.get(`/categorias.php?action=click&id=${id}`);
  }

  async getCategoriasSearch(search) {
    const getSearch = await api.get(`/categorias.php?action=search&search=${search}`);
    this.setState({ categorias: getSearch.data.data, carregamentoCategorias: false });
  }

  componentDidMount() {
    this.getCategorias();
  }

  render() {
    const { search, categorias, carregamento, carregamentoCategorias } = this.state;
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
            <Carousel tipo={0}></Carousel>
            <View>
              <Searchbar
                placeholder="Buscar categoria ..."
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
            <View>

              <View style={styles.categorias} >
                {
                  categorias.map((item, index) => {
                    return (
                      <View>
                        <TouchableHighlight
                          key={index}
                          activeOpacity={0.6}
                          underlayColor="#DDDDDD"
                          onPress={() => {
                            this.registrarClick(item.Id);
                            navigation.navigate('Empresas', { id: item.Id })
                          }}
                        >
                          <List.Item
                            key={index}
                            title={item.descricao}
                            left={props => <List.Icon {...props} icon="equal" />}
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
    height:'100%'
  }
});

export default Home;