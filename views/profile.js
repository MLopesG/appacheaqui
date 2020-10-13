import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Title, ToggleButton, Divider, Button } from 'react-native-paper';

class Profile extends React.Component {

    render() {
        const { navigation } = this.props;

        return (
            <View >
                 <View>
                    <Image
                        style={styles.Image}
                        source={{
                            uri: 'https://media-cdn.tripadvisor.com/media/photo-s/08/8e/3f/41/labella-pizzaria.jpg',
                        }}
                    />
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.bottom, styles.center}>
                        <Title style={styles.bottom}>Pizzaria La Bella</Title>

                        <ToggleButton.Row >
                            <ToggleButton color="#006400" icon="whatsapp" value="left" />
                            <ToggleButton color="#006400" icon="phone" value="right" />
                            <ToggleButton color="#006400" icon="map" value="right" />
                        </ToggleButton.Row>
                    </View>

                    <Divider style={styles.top} />

                    <View>
                        <View>
                            <Text style={styles.titulo}>Informações Pessoais</Text>
                            <Text style={styles.space}>Email: email@gmail.com.br</Text>
                            <Text style={styles.space}>Site: site.com.br</Text>
                        </View>

                        <View>
                            <Text style={styles.titulo}>Hórario de Funcionamento</Text>
                            <Text style={styles.space}>+ Segunda - Feira 06:00 as 12:00 | 13:00 as 17:00</Text>
                            <Text style={styles.space}>+ Terça - Feira 06:00 as 12:00 | 13:00 as 17:00</Text>
                            <Text style={styles.space}>+ Quarta - Feira 06:00 as 12:00 | 13:00 as 17:00</Text>
                            <Text style={styles.space}>+ Quinta - Feira 06:00 as 12:00 | 13:00 as 17:00</Text>
                            <Text style={styles.space}>+ Sexta - Feira 06:00 as 12:00 | 13:00 as 17:00</Text>
                            <Text style={styles.space}>+ Sabádo - 06:00 as 12:00</Text>
                        </View>

                        <View style={styles.bottom}>
                            <Text style={styles.titulo}>Descrição</Text>
                            <Text style={styles.space}>
                                A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real
                            </Text>
                        </View>

                        <View style={styles.btnContainer}>
                            <Button style={styles.bottom}  color="#006400" mode="outlined"  onPress={() => navigation.navigate('Promocoes')}>
                                Promoções
                            </Button>
                            <Button style={styles.bottom} color="#006400" mode="outlined" onPress={() => navigation.navigate('Serviços/Produtos')}>
                                Serviços/Produtos
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
        paddingTop: 20,
        paddingBottom: 40
    },
    Image: {
        height: 250,
        width: '100%'
    },
    top: {
        marginTop: 20
    },
    bottom: {
        marginBottom: 25
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    space: {
        lineHeight: 30,
        fontSize: 15
    },
    btnContainer:{
        height:400
    }
});

export default Profile;