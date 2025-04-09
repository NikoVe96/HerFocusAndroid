import React from 'react';
import { ScrollView, Image, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

const ModuleSlide = ({ scaleFactor, colors, imageSource, markdownContent, children }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            {imageSource && (
                <Image
                    source={imageSource}
                    style={{
                        width: 200 * scaleFactor,
                        height: 200 * scaleFactor,
                        alignSelf: 'center',
                    }}
                />
            )}
            {markdownContent && (
                <View style={{ margin: '3%' }}>
                    <Markdown
                        style={{
                            paragraph: { fontSize: 18 * scaleFactor, color: colors.darkText },
                            bullet_list: { fontSize: 18, color: colors.darkText },
                            heading3: {
                                color: colors.darkText,
                                fontSize: 20 * scaleFactor,
                                marginTop: 30,
                                fontWeight: 'bold',
                            },
                            list_item: { marginVertical: 5 },
                        }}
                    >
                        {markdownContent}
                    </Markdown>
                </View>
            )}
            {children}
        </ScrollView>
    );
};

export default ModuleSlide;
