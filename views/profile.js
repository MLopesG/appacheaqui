import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Linking, Platform } from 'react-native';
import { Title, ToggleButton, Button, Divider, ActivityIndicator, Card, Provider, Modal, Portal } from 'react-native-paper';
import YoutubePlayer from "react-native-youtube-iframe";
import api from '../axios';
import Carousel from './components/carousel';

class Profile extends React.Component {
    state = {
        search: '',
        cliente: {},
        servicos: [],
        carregamento: true,
        modalVisible: false
    };

    toggleButtonModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    async getEmpresa() {
        const { id } = this.props.route.params;

        const cliente = await api.get(`/clientes.php?action=single&id=${id}`);
        const servicos = await api.get(`/servicos.php?action=all&id=${id}`);

        this.setState({ cliente: cliente.data.cliente, servicos: servicos.data.servicos, carregamento: false });
    }

    whatsapp(phone) {
        Linking.canOpenURL("whatsapp://send?text=Ache Aqui Ali").then(supported => {
            if (supported) {
                return Linking.openURL(
                    `whatsapp://send?phone=${phone}&text=Ache Aqui Ali`
                );
            } else {
                return Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${phone}&text=Ache Aqui Ali`
                );
            }
        })
    }

    phone(tel) {
        if (Platform.OS === 'android') {
            return `tel:${tel}`;
        } else {
            return `telprompt:${tel}`;
        }
    }


    componentDidMount() {
        this.getEmpresa();
    }

    render() {

        const { cliente, carregamento, servicos, modalVisible } = this.state;

        const stylesProfile = function (cliente) {
            return {
                backgroundColor: cliente.cor_background,
            }
        }

        const styleColor = function (cliente) {
            return {
                color: cliente.cor_fonte,
                fontWeight: '700',
                fontSize: 16,
                marginTop: 10
            }
        }

        // Alterar Titulo
        this.props.navigation.setOptions({ title: cliente.apelido });

        if (carregamento) {
            return (
                <View style={styles.load}>
                    <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
                </View>
            );
        } else {

            return (
                <View >
                    <View style={stylesProfile(cliente)} >
                        <Portal>
                            <Modal visible={modalVisible} onDismiss={() => this.toggleButtonModal()} contentContainerStyle={{ margin: 10, backgroundColor: 'white', padding: 10 }}>
                                <YoutubePlayer
                                    height={200}
                                    play={true}
                                    videoId={cliente.video}
                                />
                            </Modal>
                        </Portal>
                        <View>
                            <Image
                                style={styles.header}
                                source={{
                                    uri: cliente.fachada,
                                }}
                            />
                        </View>
                        <Image style={styles.avatar} source={{ uri: cliente.logo }} />
                        <ScrollView style={styles.headerTop}>
                            <View style={ styles.center}>
                                <Title style={[styles.bottom, styleColor(cliente)]}>{cliente.apelido}</Title>
                                <ToggleButton.Row>
                                    <Button icon="play" labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => this.toggleButtonModal()}></Button>
                                    <Button icon="facebook" labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(cliente.facebook)}></Button>
                                    <Button icon="twitter" labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(cliente.twitter)}></Button>
                                    <Button icon="instagram" labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(cliente.instagram)}></Button>
                                    <Button icon="whatsapp" labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(this.whatsapp(cliente.fonecelular))}></Button>
                                    <Button icon="phone" labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(this.phone(cliente.fonecelular))} ></Button>
                                </ToggleButton.Row>
                            </View>

                            <Divider style={styles.top} />


                        </ScrollView>
                    </View>

                    <View style={[styles.containerInfoEmpresa]}>
                    <ScrollView >
                        <View>
                            <View>
                                <Text style={styles.titulo}>Informações Pessoais</Text>

                                <View>
                                    <Text style={styles.titulo}>Email:</Text>
                                    <Text>{cliente.email}</Text>
                                </View>
                                <View  >
                                    <Text style={styles.titulo}>Site:</Text>
                                    <Text>{cliente.site}</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.titulo}>Hórario de Funcionamento</Text>
                                <Text>{cliente.horariodeatendimento}</Text>
                            </View>

                            <View style={styles.bottom}>
                                <Text style={styles.titulo}>Descrição</Text>
                                <Text style={{ textAlign: "justify" }}>
                                    {cliente.descricaodaempresa}
                                </Text>
                            </View>

                            <View style={styles.bottom}>
                                <Text style={[styles.containerInfo, styles.titulo]}>Promoções</Text>
                                <Carousel tipo="promocao" id={cliente.Id}></Carousel>
                            </View>

                            {
                                servicos.length > 0 ? <View style={[styles.bottom, styles.btnContainer]}>
                                    <Text style={[styles.containerInfo, styles.titulo]}>Serviços</Text>
                                    <View >
                                        {
                                            servicos.map((item, index) => {
                                                return (
                                                    <Card style={{ backgroundColor: 'transparent', border: 'none' }} elevation={0} key={index}>
                                                        <Card.Title title={item.descricao} subtitle={item.valor != null ? 'Valor: ' + item.valor : 'Valor: 0,00'} />
                                                        <Card.Cover source={{ uri: item.url }} />
                                                    </Card>
                                                )
                                            })
                                        }
                                    </View>
                                </View> : <View></View>
                            }
                        </View>
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    containerInfo: { marginBottom: 10, fontWeight: '700', fontSize: 16 },
    container: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginTop: 70,
        paddingBottom: 40,
        height: 500
    },
    containerInfoEmpresa: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 40,
        height: 500
    },
    modal: {
        width: 500,
        height: 350
    },
    headerTop:{
        marginTop:75
    },  
    header:{
        padding: 30
    },
    Image: {
        height: 250,
        width: '100%'
    },
    ImageServico: {
        height: 130,
        width: 130
    },
    top: {
        marginTop: 20
    },
    bottom: {
        marginBottom: 15
    },
    load: {
        padding: 30
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        marginBottom: 80
    },
    header: {
        backgroundColor: "#006400",
        height: 200,
    },
    avatar: {
        width: 140,
        height: 140,
        backgroundColor: "#006400",
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    titulo: {
        fontWeight: '700',
        fontSize: 14,
        marginTop: 10
    }
});

export default Profile;