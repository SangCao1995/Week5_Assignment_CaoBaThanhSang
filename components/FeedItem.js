import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Linking} from 'react-native';

export default function FeedItem(props) {
    onPressButton = () => {
        Linking.openURL(props.item.url).catch((err) => console.error('An error occurred', err));
    }
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.item.title}</Text>
            <Image source={{ uri: props.item.urlToImage }} style={styles.image}/>
            <View style={styles.sourceWrapper}>
                <Text style={styles.sourceText}>Source </Text>
                <Text style={styles.sourceResponse}>{props.item.source.name}</Text>
            </View>
            <Text>{props.item.content}</Text>
            <View style={styles.publishedWrapper}>
                <Text style={styles.publishedText}>Published </Text>
                <Text style={styles.publishedResponse}>{props.item.publishedAt}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
                <Text style={styles.textButton}>Read more</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginTop: 1,
        padding: 10
    },
    title: {
        fontSize: 18,
        marginTop: 15
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 12
    },
    sourceWrapper: {
        flexDirection: 'row',
        marginTop: 5
    },
    sourceText: {
        fontWeight: 'bold'
    },
    sourceResponse: {
        color: 'gray'
    },
    publishedWrapper: {
        flexDirection: 'row'
    },
    publishedText: {
        fontWeight: 'bold'
    },
    publishedResponse: {
        color: 'gray'
    },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    textButton: {
        padding: 10,
        color: 'white',
        fontSize: 15
    }
})