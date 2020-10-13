import React from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Searchbar, List, Divider } from 'react-native-paper';
import ImageSliderz from 'react-native-image-slideshow';
import ImageOverlay from "react-native-image-overlay";

class Home extends React.Component {
  state = {
    search: '',
    visible: true,
    categorias: [
      {
        icon: 'equal',
        title: 'Mercado 1',
        description: 'Dourados - MS'
      },
      {
        icon: 'equal',
        title: 'Mercado 2',
        description: 'Dourados - MS'
      },
      {
        icon: 'equal',
        title: 'Mercado 3',
        description: 'Dourados - MS'
      },
      {
        icon: 'equal',
        title: 'Bar 4',
        description: 'Dourados - MS'
      },
      {
        icon: 'equal',
        title: 'Bar 5',
        description: 'Dourados - MS'
      },
      {
        icon: 'equal',
        title: 'Bar 6',
        description: 'Dourados - MS'
      }
    ]
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search, categorias, visible } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <View>
          <View>
            <ImageOverlay
              source={{ uri: "https://www.douradosagora.com.br/media/images/328/65864/59a6c8077bf02d31818bb84d8e4b9153e352bb34dd21c.jpg" }}
              title="Dourados, MS - 11/10/2020"
              height={150}
              contentPosition="center"
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.bottom}>
            <ImageSliderz
              height={200}
              dataSource={[
                { url: 'https://wl-incrivel.cf.tsp.li/resize/1200x630/jpg/683/952/6c8eb05c83b3d17573e0b3a011.jpg' },
                { url: 'https://i.ytimg.com/vi/sjjxNjSSYyU/sddefault.jpg' },
                { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUqiG_11xQM28bT7oLaopQRpphfyUablgGpQ&usqp=CAU' }
              ]} />
          </View>

          <View>
            <Searchbar
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
                        onPress={() => navigation.navigate('Empresas')}
                      >
                        <List.Item
                          title={item.title}
                          description={item.description}
                          left={props => <List.Icon {...props} icon={item.icon} />}
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
  bottom: {
    marginBottom: 10
  },
  categorias: {
    height: 400
  }
});

export default Home;