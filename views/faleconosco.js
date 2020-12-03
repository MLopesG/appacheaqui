import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import { ToggleButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class FaleConosco extends React.Component {

    render() {
        return (
            <View >
                <ScrollView style={styles.container}>
                    <View>
                        <View >
                            <Text style={styles.titulo}>Descrição:</Text>
                            <Text style={styles.space}>
                                O Achei Aqui Ali é o mais completo guia comercial, com melhor visualização, localização e e-commerce. Projetado para ampliar a visibilidade, estreitando o relacionamento entre lojistas e consumidores.
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.titulo}>Telefones:</Text>
                            <Text style={styles.space}>Telefone: (67) 99691-1212</Text>
                            <Text style={styles.space}>Telefone: (67) 3422-1212</Text>
                        </View>

                        <View style={styles.bottom}>
                            <Text style={styles.titulo}>Redes Sociais:</Text>
                            <ToggleButton.Row>
                                <Button icon="facebook"  labelStyle={{color:'#ffffff'}} color="#006400"  style={{marginRight:10}} compact mode="contained" onPress={() => Linking.openURL('https://www.facebook.com/acheiaquiali')}></Button>
                                <Button icon="instagram"  labelStyle={{color:'#ffffff'}} color="#006400"  style={{marginRight:10}} compact mode="contained" onPress={() => Linking.openURL('https://www.instagram.com/acheiaquiali')}></Button>
                                <Button   labelStyle={{color:'#ffffff'}} color="#006400"  style={{marginRight:10}} compact mode="contained" onPress={() => Linking.openURL('http://www.acheiaquiali.com.br')}>
                                    <Icon name="cellphone-link" size={18} color="#ffffff"></Icon>
                                </Button>
                            </ToggleButton.Row>
                        </View>

                        <View style={styles.btnContainer}>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 40
    },
    bottom: {
        marginBottom: 25
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10
    },
    space: {
        lineHeight: 30,
        fontSize: 15
    },
    btnContainer: {
        height: 100
    }
});

export default FaleConosco;