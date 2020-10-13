import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { ToggleButton, Button } from 'react-native-paper';

class FaleConosco extends React.Component {

    render() {
        return (
            <View >
                <ScrollView style={styles.container}>
                    <View>
                        <View >
                            <Text style={styles.titulo}>Descrição:</Text>
                            <Text style={styles.space}>
                                A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.titulo}>Telefones:</Text>
                            <Text style={styles.space}>Telefone: 67 998343255</Text>
                            <Text style={styles.space}>Telefone: 67 998343255</Text>
                            <Text style={styles.space}>Telefone: 67 998343255</Text>
                            <Text style={styles.space}>Telefone: 67 998343255</Text>
                        </View>

                        <View >
                            <Text style={styles.titulo}>Endereço:</Text>
                            <Text style={styles.space}>Rua: Takão Massago, 15678</Text>
                            <Text style={styles.space}>Bairro: Jardim Novo Horizonte</Text>
                            <Text style={styles.space}>Estado/Cidade: Mato Grosso Do Sul  - Dourados</Text>
                        </View>

                        <View style={styles.bottom}>
                            <Text style={styles.titulo}>Redes Sociais:</Text>
                            <ToggleButton.Row >
                                <ToggleButton color="#006400" icon="whatsapp" value="left" />
                                <ToggleButton color="#006400" icon="facebook" value="right" />
                                <ToggleButton color="#006400" icon="instagram" value="right" />
                            </ToggleButton.Row>
                        </View>

                        <View style={styles.btnContainer}>
                            <Button style={styles.bottom} color="#006400" mode="outlined" >
                                Página Da Internet
                            </Button>
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