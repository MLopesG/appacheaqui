import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ImageSliderz from 'react-native-image-slideshow';
import api from '../../axios';

class Carousel extends React.Component {
    state = {
        banners: [],
        carregamento: true
    };

    async getBanners() {
        if (this.props.tipo === 'promocao') {
            const promocoes = await api.get(`/servicos.php?action=promocoes&id=${this.props.id}`);
            this.setState({ banners: promocoes.data.promocoes, carregamento: false });
        } else {
            const banners = await api.get(`/banner.php?action=all&tipo=${this.props.tipo}`);
            this.setState({ banners: banners.data.banners, carregamento: false });
        }
    }

    componentDidMount() {
        this.getBanners();
    }

    render() {
        const { banners, carregamento } = this.state;


        if (carregamento) {
            return (
                <View style={styles.load}>
                    <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
                </View>
            );
        } else {

            return (
                <View style={styles.bottom}>
                    <ImageSliderz
                        height={200}
                        dataSource={banners} />
                </View>
            );
        }
    }
}

const heigth = 180;

const styles = StyleSheet.create({
    bottom: {
        marginBottom: 10
    },
    load: {
        padding: 30
    },
});

export default Carousel;