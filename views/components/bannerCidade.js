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
          <ImageBackground
            source={{ uri: cidade.url != null ? cidade.url : 'https://www.douradosagora.com.br/media/images/4236/69772/5a3a3e82555b30533a699050227d454e271d33f6b4815.jpg' }}
            style={styles.containerBANNER}
          >
            <Text style={styles.close}>{this.dateAtual()}  </Text>
          </ImageBackground> : <></>
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
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  containerBANNER: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height: heigth
  },
});

export default BannerCidade;