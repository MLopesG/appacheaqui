import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class Servicos extends React.Component {
    state = {
        servicos: [
            {
                nome: 'Pizza  Calabresa Grande',
                preco: 25.00,
                img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2019/12/pizza_calabresa.jpg'
            },
            {
                nome: 'Pizza  Calabresa Grande',
                preco: 25.00,
                img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2019/12/pizza_calabresa.jpg'
            },
            {
                nome: 'Pizza  Calabresa Grande',
                preco: 25.00,
                img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2019/12/pizza_calabresa.jpg'
            },
            {
                nome: 'Pizza  Calabresa Grande',
                preco: 25.00,
                img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2019/12/pizza_calabresa.jpg'
            },
            {
                nome: 'Pizza  Calabresa Grande',
                preco: 25.00,
                img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2019/12/pizza_calabresa.jpg'
            },
            {
                nome: 'Pizza  Calabresa Grande',
                preco: 25.00,
                img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2019/12/pizza_calabresa.jpg'
            }
        ]
    }

    render() {
        const { servicos } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View >
                        {
                            servicos.map((item, index) => {
                                return (
                                    <Card style={styles.bottom} key={index}>
                                        <Card.Title title={item.nome} subtitle={'Preço: ' + item.preco + ',00' + ' - Entrega Grátis'} />
                                        <Card.Cover source={{ uri: item.img }} />
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
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    bottom: {
        marginBottom: 10
    },
    Image: {
        height: 130,
        width: 130
    },
});

export default Servicos;