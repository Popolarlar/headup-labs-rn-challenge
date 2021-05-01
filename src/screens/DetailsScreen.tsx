import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from 'types';

export default function DetailsScreen() {
  const route = useRoute<RootRouteProps<'Details'>>();
  const { title, author, publishedAt, urlToImage, content, url } = route.params.article

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <Text>{publishedAt}</Text>
      <View style={styles.imgWrap}>
        <Image
          source={{ uri: urlToImage }}
          style={styles.img} />
      </View>
      <Text>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  imgWrap: {
    height: "30%",
    resizeMode: "contain"
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
