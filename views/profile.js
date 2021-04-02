import React from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, View, Image, Text, ScrollView, Linking, Platform, RefreshControl, ActivityIndicator } from 'react-native';
import { Title, ToggleButton, Button, Divider, Card, Modal, Portal } from 'react-native-paper';
import WebView from 'react-native-webview';
import api from '../axios';
import Carousel from './components/carousel';
import ImagePreview from 'react-native-image-preview';

import IconMaps from '../assets/icons/maps.svg';
import IconPhone from '../assets/icons/call.svg';
import IconWhatsapp from '../assets/icons/whatsapp.svg';
import IconInstagram from '../assets/icons/instagram.svg';
import IconFacebook from '../assets/icons/facebook.svg';
import IconTwitter from '../assets/icons/twitter.svg';
import IconPlay from '../assets/icons/play.svg';
import IconBack from '../assets/icons/right.svg';

const { height } = Dimensions.get('screen');

class Profile extends React.Component {
    state = {
        search: '',
        cliente: {},
        servicos: [],
        videos: [],
        carousel: [],
        carregamentoCarousel: true,
        carregamento: true,
        modalVisible: false,
        modalVisibleImagem: false,
        refreshing: false,
        Imagem: null
    };

    toggleButtonModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    toggleButtonModalImagem(url) {
        this.setState({
            Imagem: url,
            modalVisibleImagem: !this.state.modalVisibleImagem
        });
    }

    getImagem() {
        return this.state.Imagem;
    }

    async getEmpresa() {
        const { id } = this.props.route.params;

        const Entities = require('html-entities').XmlEntities;
        const entities = new Entities();

        const cliente = await api.get(`/clientes.php?action=single&id=${id}`);
        const servicos = await api.get(`/servicos.php?action=all&id=${id}`);
        const videos = await api.get(`/clientes.php?action=single-video&id=${id}`);
        const promocoes = await api.get(`/servicos.php?action=promocoes&id=${id}`);

        let data = [];

        if (promocoes && promocoes.data.promocoes.length > 0) {

            promocoes.data.promocoes.forEach(element => {
                if (element.valor != '' && element.descricao != '') {
                    data.push(
                        {
                            title: element.descricao,
                            caption: element.valor,
                            url: element.url,
                        }
                    );
                } else {
                    data.push(
                        {

                            url: element.url,
                        }
                    )
                }
            });
        }


        this.setState({ cliente: cliente.data.cliente, servicos: servicos.data.servicos, videos: videos.data.videos, carousel: data, carregamentoCarousel: false, carregamento: false });
        // Alterar Titulo
        this.props.navigation.setOptions({ title: entities.decode(this.tituloEmpresa(cliente.data.cliente)) });
    }

    whatsapp(phone, id) {
        // Registrar click no banco de dados
        this.registrarClickBtn('id_empresa_whatsapp', id);

        Linking.canOpenURL("whatsapp://send?text=Ache Aqui Ali").then(supported => {
            return Linking.openURL(
                `https://api.whatsapp.com/send?phone=+55${phone}&text=Ache Aqui Ali`
            );
        })
    }

    phone(tel, id) {
        // Registrar click no banco de dados
        this.registrarClickBtn('id_empresa_telefone', id);

        if (Platform.OS === 'android') {
            return `tel:${tel}`;
        } else {
            return `telprompt:${tel}`;
        }
    }

    async registrarClickBtn(tipo, id) {
        // Tipos de registro
        // id_empresa_whatsapp
        // id_empresa_telefone
        // id_empresa_mapa
        await api.get(`/click.php?action=register&tipo=${tipo}&id=${id}`);
    }

    maps(item) {
        // Registrar click no banco de dados
        this.registrarClickBtn('id_empresa_mapa', item.Id);

        return `https://www.google.com/maps/place/${item.end_rua}+${item.end_numero}+${item.nome}`;
    }


    email(email) {
        return `mailto:${email}?subject=Contato via app Achei Aqui Ali&body=Contato Achei Aqui Ali`;
    }


    componentDidMount() {
        this.getEmpresa();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true, carregamento: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
            this.getEmpresa();
        }, 2000)

        clearTimeout();
    }

    tituloEmpresa(item) {
        if (item.tipo === 'pf') {
            return item.apelido != null ? item.apelido : item.nomecompleto;
        } else {
            return item.nomefantasia != null ? item.nomefantasia : item.razaosocial;
        }
    }

    render() {

        const { navigation } = this.props;

        const { modalVisibleImagem, cliente, carregamento, refreshing, servicos, modalVisible, videos, carregamentoCarousel, carousel } = this.state;

        const stylesProfile = function (cliente) {
            return {
                backgroundColor: cliente.cor_background,
            }
        }

        const Entities = require('html-entities').XmlEntities;
        const entities = new Entities();


        const styleColor = function (cliente) {
            return {
                color: cliente.cor_fonte,
                fontWeight: '700',
                fontSize: 16,
                marginTop: 10
            }
        }

        if (carregamento) {
            return (
                <View style={styles.load}>
                    <ActivityIndicator size={35} animating={carregamento} color={'#006400'} />
                </View>
            );
        } else {

            return (

                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh} />}>
                    <View >
                        <View style={stylesProfile(cliente)} >
                            <Portal style={{ width: '100%', height: 200 }}>
                                <Modal visible={modalVisible} onDismiss={() => this.toggleButtonModal()} contentContainerStyle={{ margin: 10, backgroundColor: 'white', padding: 10, height: 200 }}>
                                    <WebView
                                        allowsFullscreenVideo
                                        allowsInlineMediaPlayback
                                        mediaPlaybackRequiresUserAction
                                        source={{
                                            uri: cliente.video
                                        }}
                                        style={{ width: '100%', height: 200 }}
                                    />
                                </Modal>
                            </Portal>
                            <ImagePreview visible={modalVisibleImagem} source={{ uri: this.getImagem() }} close={() => this.toggleButtonModalImagem()} />
                            <View>
                                <Image
                                    style={styles.header}
                                    source={cliente.fachada != null ? { uri: cliente.fachada } : require('./imagens/fachada_padrao.fw.png')}
                                />
                            </View>
                            <Image style={styles.avatar} source={cliente.logo != null ? { uri: cliente.logo } : require('./imagens/logo_padrao.fw.png')} />
                            <ScrollView style={styles.headerTop}>
                                <View style={styles.center}>
                                    <Title style={[styles.bottom, styleColor(cliente)]}>{entities.decode(cliente.apelido)}</Title>
                                    <ToggleButton.Row>
                                        {cliente.video != null ? <Button icon={() => <IconPlay width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => this.toggleButtonModal()}></Button> : <></>}
                                        {cliente.facebook != null ? <Button icon={() => <IconFacebook width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(`https://facebook.com/${cliente.facebook}`)}></Button> : <></>}
                                        {cliente.twitter != null ? <Button icon={() => <IconTwitter width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(`https://twitter.com/${cliente.twitter}`)}></Button> : <></>}
                                        {cliente.instagram != null ? <Button icon={() => <IconInstagram width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(`https://www.instagram.com/${cliente.instagram}`)}></Button> : <></>}
                                        {cliente.fonecelular != null ? <Button icon={() => <IconWhatsapp width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => this.whatsapp(cliente.fonecelular, cliente.Id)}></Button> : <></>}
                                        {cliente.fonecelular != null ? <Button icon={() => <IconPhone width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(this.phone(cliente.fonecelular, cliente.Id))} ></Button> : <></>}
                                        <Button icon={() => <IconMaps width={15} height={25} fill="#006400" />} labelStyle={styleColor(cliente)} style={[stylesProfile(cliente), { marginLeft: 5 }]} compact mode="contained" onPress={() => Linking.openURL(this.maps(cliente))}>

                                        </Button>
                                    </ToggleButton.Row>
                                </View>

                                <Divider style={styles.top} />

                            </ScrollView>
                        </View>

                        <View style={styles.containerInfoEmpresa}>
                            <View>
                                <Text style={styles.titulo}>Informações Pessoais</Text>

                                <View>
                                    <Text style={styles.titulo}>Endereço:</Text>
                                    <Text>{entities.decode(`${cliente.end_rua + ', ' + cliente.end_numero}, ${cliente.end_complemento}` + ' - ' + cliente.nome + '/' + cliente.uf)}</Text>
                                </View>

                                <View>
                                    <Text style={styles.titulo}>Email:</Text>
                                    <Text onPress={() => Linking.openURL(this.email(cliente.email))} style={[styles.click]}>{cliente.email}</Text>
                                </View>
                                {
                                    cliente.site != null && cliente.site != '' ?
                                        <View>
                                            <Text style={styles.titulo}>Site:</Text>
                                            <Text onPress={() => Linking.openURL(`http://${cliente.site}`)} style={[styles.click]} >{cliente.site}</Text>
                                        </View> : <></>
                                }

                            </View>

                            <View>
                                <Text style={styles.titulo}>Hórario de Funcionamento</Text>
                                <Text>{entities.decode(cliente.horariodeatendimento)}</Text>
                            </View>

                            <View style={styles.bottom}>
                                <Text style={styles.titulo}>Descrição</Text>
                                <Text style={{ textAlign: "justify" }}>
                                    {entities.decode(cliente.descricaodaempresa)}
                                </Text>
                            </View>

                            <View style={styles.bottom}>
                                <Text style={[styles.containerInfo, styles.titulo]}>Promoções</Text>
                                <Carousel navigation={navigation} carregamento={carregamentoCarousel} banners={carousel}></Carousel>
                            </View>

                            {
                                servicos.length > 0 ? <View style={[styles.bottom]}>
                                    <Text style={[styles.containerInfo, styles.titulo]}> Produtos e/ou Serviços</Text>
                                    <View >
                                        {
                                            servicos.map((item, index) => {
                                                return (
                                                    <TouchableHighlight style={styles.separar} onPress={() => this.toggleButtonModalImagem(item.url)} >
                                                        <Card elevation={1} elevation={0} key={(index + 1) * 2} >
                                                            {item.valor != '' || item.descricao != null ? <Card.Title title={item.descricao} subtitle={item.valor != null && item.valor != '' ? 'Valor: ' + item.valor : ''} /> : <View style={{ marginBottom: 10 }}></View>}

                                                            <Card.Cover source={{ uri: item.url }} />


                                                            {
                                                                item.link != null || item.link ? <Button icon="chevron-right" onPress={() => Linking.openURL(item.link)} color={cliente.cor_fonte} >
                                                                    Ver Mais
                                                            </Button>
                                                                    : <></>
                                                            }
                                                        </Card>
                                                    </TouchableHighlight>
                                                )
                                            })
                                        }
                                    </View>
                                </View> : <View></View>
                            }
                            {
                                videos.length > 0 ? <View style={[styles.bottom, styles.btnContainer]}>
                                    <Text style={[styles.containerInfo, styles.titulo]}> Videos</Text>
                                    <View>
                                        {
                                            videos.map((item, index) => {
                                                return (
                                                    <WebView
                                                        key={(index + 1) * 3}
                                                        allowsFullscreenVideo
                                                        allowsInlineMediaPlayback
                                                        mediaPlaybackRequiresUserAction
                                                        source={{
                                                            uri: item.video
                                                        }}
                                                        style={{ width: '100%', height: height * 0.5, marginBottom: 20 }}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                </View> : <View></View>
                            }
                        </View>
                    </View>

                </ScrollView>
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
        paddingBottom: 40
    },
    modal: {
        width: 500,
        height: 350
    },
    headerTop: {
        marginTop: 75
    },
    header: {
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
        marginBottom: 10
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
    separar: {
        marginBottom: 10
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
    },
    click: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000"
    }
});

export default Profile;