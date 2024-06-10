import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text } from 'react-native';

const Carousel = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const autoRotate = () => {
        const nextIndex = (currentIndex + 1) % data.length;

        if (nextIndex >= 0 && nextIndex < data.length) {
            const nextItemOffset = (Dimensions.get('window').width + 10) * nextIndex;
            flatListRef?.current?.scrollToOffset({
                animated: true,
                offset: nextItemOffset,
            });
            setCurrentIndex(nextIndex);
        } else {
            setCurrentIndex(0);
        }
    };

    useEffect(() => {
        const interval = setInterval(autoRotate, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItems = ({ item }) => (
        <View style={styles.carouselItem}>
            <View style={{ flexDirection: 'row' }}>
                <Text>{item.taskName}</Text>
                <Text>{item.taskTime}</Text>
            </View>
            {/* Add additional content as needed */}
        </View>
    );

    return (
        <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            contentContainerStyle={styles.flatListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToInterval={Dimensions.get('window').width + 10}
            decelerationRate="fast"
        />
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        // Add styling for the container if needed
    },
    carouselItem: {
        width: Dimensions.get('window').width,
        padding: 10,
        // Customize item styling as needed
    },
});

export default Carousel;