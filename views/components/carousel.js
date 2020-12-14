import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ImageSliderz from 'react-native-image-slideshow';

class Carousel extends React.Component {

    render() {
        const { banners, carregamento } = this.props;

        if (carregamento) {
            return (
                <View style={styles.load}>
                    <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
                </View>
            );
        } else {
            if (banners.length === 0) {
                return (
                    <View></View>
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