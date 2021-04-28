import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import api from '../../axios';

const moment = require('moment');

class BannerCidade extends React.Component {
  state = {
    cidade: null,
  };

  async getCidade() {
    const { cidade } = this.props;

    if (cidade && cidade === null) return false;

    const cidadeGet = await api.get(`/cidades.php?action=single&cidade_id=${this.props.cidade}`);

    if (cidadeGet.data.cidade != null) {
      this.setState({ cidade: cidadeGet.data.cidade });
    }
  }

  componentDidMount() {
    this.getCidade();
  }

  dateAtual() {

    const { cidade } = this.state;

    return `${cidade.nome}  - ${moment().format('DD/MM/YYYY')}`
  }

  render() {

    const { cidade } = this.state;

    return (
      cidade != null ?
        <View style={styles.containerBANNER}>
          <ImageBackground
            source={{ uri: cidade.url != null ? cidade.url : 'https://www.douradosagora.com.br/media/images/4236/69772/5a3a3e82555b30533a699050227d454e271d33f6b4815.jpg' }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.close}>{this.dateAtual()}  </Text>
          </ImageBackground>
        </View> : <></>
    );
  }
}

const heigth = 105;

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    borderRadius: 5
  },
  close: {
    position: 'absolute',
    top: heigth / 2.35,
    left: '20%',
    zIndex: 1,
    width: '100%',
    height: 150,
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  containerBANNER: {
    width: '100%',
    height: heigth
  },
});

export default BannerCidade;