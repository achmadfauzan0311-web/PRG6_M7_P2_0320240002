import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

// KOMPONEN ANAK: TIMER DENGAN LIFE CYCLE
class TimerLifeCycle extends Component {
    // FASE 0: CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = { detik: 0 };
        console.log("0. [CONSTRUCTOR] Memori disiapkan untuk anak.");
    }

    // FASE 1: MOUNTING ( LAHIR )
    componentDidMount() {
        console.log("1. [MOUNTING] Anak Lahir! Timer mulai berjalan.");
        
        this.interval = setInterval(() => {
            this.setState({ detik: this.state.detik + 1 });

            console.log(` [BACKGROUND TIMER] Berjalan: ${this.state.detik} detik`);
            
        },1000);
    }
    
    // FASE 2: UPDATING ( HIDUP )
    componentDidUpdate(prevProps, prevState) {
        console.log(`2. [UPDATING] Waktu bertambah: ${this.state.detik} detik`);
    }

    // FASE 3: UNMOUNTING ( MATI )
    componentWillUnmount() {
        console.log("3. [UNMOUNTING] Anak Mati! Timer dihentikan.");
        clearInterval(this.interval);
    }

    render() {
        return (
            <View style={styles.timerBox}>
                <Text style={styles.timerText}>Timer: {this.state.detik} detik:</Text>
                <Text>Detik Berjalan</Text>
            </View>
        );
    }
}

// KOMPONEN UTAMA : INDUK PENGEDALI
export default class ClassLifeCycle extends Component {
    state = { tampilkanTimer: false };

    toggleTimer = () => {
        this.setState({ tampilkanTimer: !this.state.tampilkanTimer });
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Demo Lifecycle Komponen</Text>

            <View style={styles.content}>
                {/* CONDITIONAL RENDERING: Menentukan anak lahir atau mati */}
                {this.state.tampilkanTimer ? (
                <TimerLifeCycle />
                ) : (
                <Text style={styles.infoText}>Komponen Anak Belum Lahir</Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                title={
                    this.state.tampilkanTimer
                    ? "Hancurkan Komponen (Unmount)"
                    : "Lahirkan Komponen (Mount)"
                }
                color={this.state.tampilkanTimer ? "#D32F2F" : "#0056A0"}
                onPress={this.toggleTimer}
                />
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        alignItems: "center",
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    content: {
        height: 150,
        justifyContent: "center",
    },
    timerBox: {
        backgroundColor: '#FFF',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2E7D32',
    },

    infoText: {
        fontSize: 16,
        color: '#888',
        fontStyle: 'italic',
    },

    buttonContainer: {
        marginTop: 40,
        width: '80%',
    }
});
