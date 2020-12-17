import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ImageSliderz from 'react-native-image-slideshow';

class Carousel extends React.Component {

    state = {
        position: 0,
        interval: null,
    }

    componentWillMount() {
        if (this.props.banners && this.props.banners.length == 0) return false;
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === (this.props.banners.length - 1) ? 0 : this.state.position + 1
                });
            }, 4500)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

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
                            dataSource={banners}
                            position={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                        />
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