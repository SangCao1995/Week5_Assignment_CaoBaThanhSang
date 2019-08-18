import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function Search(props) {
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={() => props.onPressButton()}>
                <Text>Hello</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    button: {
        marginTop: 24,
        marginLeft: 12,
        backgroundColor: 'green',
        width: 80,
        height: 40
    }
})