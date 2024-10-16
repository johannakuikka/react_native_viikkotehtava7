import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function Row({ item, removeTask }) {
    return (
        <TouchableOpacity onPress={() => removeTask(item.id)}>
            <Text style={styles.text}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        padding: 8,
    },
});