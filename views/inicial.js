import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import api from '../axios';

const { width, height } = Dimensions.get('window');

export default class Inicial extends React.Component {

    state = {
        estado: null,
        cidade: null,
        estados: [],
        cidades: []
    }

    async loadEstados() {
        const estados = await api.get('/estados.php?action=all');

        if (estados.data.success) {

            let estadosFormat = [];

            estados.data.estados.forEach(element => {
                estadosFormat.push({ label: element.nome, value: element.Id });
            });

            this.setState({ estados: estadosFormat, carregamento: false });
        }
    }

    async loadCidades(estado) {

        this.setState({
            estado: estado
        });

        const cidades = await api.get(`/cidades.php?action=estado_cidades&estado_id=${estado}`);

        if (cidades.data.success) {

            let cidadesFormat = [];

            cidades.data.cidades.forEach(element => {
                cidadesFormat.push({ label: element.nome, value: element.Id });
            });

            this.setState({ cidades: cidadesFormat, carregamento: false });
        }
    }

    entrar() {
        const { navigation } = this.props;
        const { cidade, estado } = this.state;

        navigation.navigate("Ache Aqui Ali", {
                cidade: cidade,
                estado: estado
            
        });
    }

    componentDidMount() {
        this.loadEstados();
    }

    render() {
        const { cidade, estado, estados, cidades } = this.state;

        const placeholder = {
            label: 'Selecionar:',
            value: null,
            color: '#006400',
        };

        return (
            <View style={styles.container}>
                <View style={styles.containerImagem}>
                    <Image resizeMode="stretch" style={styles.containerCidadeImagem} source={require('../img/logo.png')} ></Image>
                </View>
                <View style={styles.containerInputs}>
                    <View style={styles.containerInput}>
                        <Text style={styles.label}>Selecione seu estado:</Text>
                        <RNPickerSelect
                            onValueChange={(value) => {
                                this.loadCidades(value);
                            }}
                            placeholder={placeholder}
                            useNativeAndroidPickerStyle={false}
                            style={{
                                inputAndroid: {
                                    backgroundColor: '#f0f0f0',
                                    padding: 12,
                                    borderRadius:5,
                                    color: '#212121'
                                },
                                inputIOS: {
                                    backgroundColor: '#f0f0f0',
                                    padding: 12,
                                    borderRadius:5,
                                    color: '#212121',
                                }
                            }}
                            value={estado}
                            items={estados}
                        />
                    </View>

                    {
                        cidades.length > 0   ? <View style={styles.containerInput}>
                            <Text style={styles.label}>Selecione sua cidade:</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputAndroid: {
                                        backgroundColor: '#f0f0f0',
                                        padding: 12,
                                        borderRadius:5,
                                        color: '#212121',
                                    },
                                    inputIOS: {
                                        backgroundColor: '#f0f0f0',
                                        padding: 12,
                                        borderRadius:5,
                                        color: '#212121',
                                    }
                                }}
                                value={cidade}
                                placeholder={placeholder}
                                onValueChange={(value) => {
                                    this.setState({
                                        cidade: value,
                                    });
                                }}
                                items={cidades}
                            />
                        </View>
                            : <></>
                    }
                    {
                        estado != null && cidade != null ? <View style={styles.btn}>
                            <Button onPress={() => this.entrar()} mode="contained"  color="#006400">
                                Entrar
                        </Button>
                        </View> : <></>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        width: width,
        height: height
    },
    containerCidadeImagem: {
        width: width,
        height: 200,
    },
    containerImagem: {
        marginTop: 10,
        marginBottom: 10
    },
    containerInputs: {
        alignContent: 'center',
        padding: 10,
        marginTop:20
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#006400',
        marginBottom: 10
    },
    containerInput: {
        marginBottom: 15
    },
    btn: {
        marginTop: 10
    }
});

