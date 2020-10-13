import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

class Promocoes extends React.Component {
    state = {
        promocoes: [
            'https://www.pizzariabaggio.com.br/wordpress/wp-content/uploads/2020/05/Promoc%CC%A7a%CC%83o-Site-MAIO-2020.jpg',
            'https://www.mundodomarketing.com.br/assets/img/promocoes/imagem/e0e172b554cdf071d98a18cec77f1b50.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSecOcPxftSsS_oF_ej0en0tmikaZjxBf6QDg&usqp=CAU',
            'https://www.deluccapizzaria.com.br/img/pizzas-em-promocao.jpg'
        ]
    }

    render() {
        const { promocoes } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.bottom}>
                        {
                            promocoes.map((item, index) => {
                                return (
                                    <Card style={styles.bottom} key={index}>
                                        <Card.Cover source={{ uri: item }} />
                                    </Card>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    bottom: {
        marginBottom: 10
    },
});

export default Promocoes;