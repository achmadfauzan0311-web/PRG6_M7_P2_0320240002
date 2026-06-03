import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Functional Component

export class KartuClass extends Component {
    render() {
        return <View style={styles.cardClass}>
            <Text style={styles.textWhite}>Halo, saya dari Class Component!</Text>
            <Text style={styles.textSub}>Sintaks saya lebih panjang dan memerlukan render</Text>
        </View>;    
    }
}
// Functional Component
export const KartuFunction = () => {
    return <View style={styles.cardFunc}>
        <Text style={styles.textWhite}>Halo, saya dari Function Component!</Text>
        <Text style={styles.textSub}>Sintaks saya lebih singkat dan tidak memerlukan render</Text>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "F5F7Fa",
        padding: 20,
    },
    tittle:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    cardClass:{
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    cardFunc: {
        backgroundColor: "#2E7D32",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    textWhite: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textSub: {
        color: 'white',
        fontSize: 15,
        marginTop: 5,
    }
});