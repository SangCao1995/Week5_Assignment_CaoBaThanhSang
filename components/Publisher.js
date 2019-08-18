import React from 'react';
import {View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import PubItem from '../components/PubItem'
export default function Publisher(props) {
    let array = [];
    const { ListPub } = props;
    console.log(ListPub)
    for (var propt in ListPub) {
        var nums = Object.keys(ListPub[propt]).length;
        var item = { id: propt, numofart: nums };
        array.push(item);
    }
    return(
        <ScrollView contentContainerStyle={styles.scrollView}>
            {
                array.map(item => {
                    return (
                        <PubItem key={item.id} item={item} />
                    )
                })
            }
        </ScrollView>

    );
   
}

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
})