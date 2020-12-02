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
    showCancel: false,
    carregamento: true,
    carregamentoCategorias: false,
  };

  toggleCancel() {
    this.setState({
      showCancel: !this.state.showCancel
    });
  }

  updateSearch = (search) => {
    this.setState((prevState) => {
      prevState['search'] = search;
      prevState['showCancel'] = true;
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
    const { search, categorias, showCancel, carregamento, carregamentoCategorias } = this.state;
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
          <View>
            <View style={styles.container}>
              <Searchbar
                onIconPress={() => {
                  this.toggleCancel()
                }}
                placeholder="Buscar categoria ..."
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
            <ScrollView style={styles.categoriasAuto} >
              {
                carregamentoCategorias ? 
                (
                <View style={styles.load}>
                  <ActivityIndicator size={35} animating={carregamentoCategorias} color={'#006400'} />
                </View>
                ) : categorias.map((item, index) => {
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
            </ScrollView>
          </View>
        );
      } else {
        return (
          <View>
            <View>
              <BannerCidade />
            </View>
            <View style={styles.container}>
              <Carousel tipo={0}></Carousel>
              <View>
                <Searchbar
                  onChange={() => {
                    this.toggleCancel()
                  }}
                  placeholder="Buscar categoria ..."
                  onChangeText={this.updateSearch}
                  value={search}
                />
              </View>
              <View>

                <ScrollView style={styles.categorias} >
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
    height: 400
  },
  categoriasAuto: {
    height: 1000
  }
});

export default Home;