import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Searchbar, Surface, ToggleButton } from 'react-native-paper';
import ImageSliderz from 'react-native-image-slideshow';
import ImageOverlay from "react-native-image-overlay";
import { FlatGrid } from 'react-native-super-grid';

class Empresa extends React.Component {
  state = {
    search: '',
    visible: true
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search, visible } = this.state;
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
              placeholder="Buscar ..."
              onChangeText={this.updateSearch}
              value={search}
            />

          </View>

          <View>
            <ScrollView style={styles.empresas} >
              <FlatGrid
                itemDimension={180}
                data={[
                  {
                    logo: 'https://static.expressodelivery.com.br/imagens/logos/43559/Expresso-Delivery_689c95c3253904fa4ded72f28ee825b6.png',
                    titulo: 'Pizzaria La Bella'
                  },
                  {
                    logo: 'https://www.zto.digital/images/logo@2x.png',
                    titulo: 'ZTO Tecnologia'
                  },
                  {
                    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJCdOV5ZtQmKt2luYcaQxSe1BTjHXO3AK3fQ&usqp=CAU',
                    titulo: 'Fiat'
                  },
                  {
                    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROmdBc4i9CAQ2T5SYlpAw0vfds0FkbMRboCQ&usqp=CAU',
                    titulo: 'Hyundai'
                  }
                ]}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableHighlight
                      key={index}
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => navigation.navigate('Profile')}
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
                      <ToggleButton color="#006400" icon="whatsapp" value="left" />
                      <ToggleButton color="#006400" icon="phone" value="right" />
                      <ToggleButton color="#006400" icon="map" value="right" />
                    </ToggleButton.Row>

                  </View>
                )}
              />
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
});

export default Empresa;