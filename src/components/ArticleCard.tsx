import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { IArticle } from 'types'
import { useNavigation } from '@react-navigation/native';

export default function ArticleCard(props: { article: IArticle }) {
  const navigation = useNavigation();
  const { article } = props
  const { title, author, description, publishedAt, urlToImage } = article

  const onCardPress = () => {
    navigation.navigate("Details", { article })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onCardPress}>
      <Text >{title}</Text>
      <Text >{publishedAt}</Text>
      <Text >{author}</Text>
      <Text>{description}</Text>
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={{ uri: urlToImage }}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#FF9788",
  },
  imgWrap: {
    width: "25%",
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
