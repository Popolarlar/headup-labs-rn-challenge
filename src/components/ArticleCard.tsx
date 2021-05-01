import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { IArticle } from 'types'
import { useNavigation } from '@react-navigation/native';
import { formatDate } from 'libs/date';

export default function ArticleCard(props: { article: IArticle }) {
  const navigation = useNavigation();
  const { article } = props
  const { title, author, description, publishedAt, urlToImage } = article

  const onCardPress = () => {
    navigation.navigate("Details", { article })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onCardPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <View style={styles.main}>
          <Text style={styles.subtitle}>
            {formatDate(publishedAt)} {author}
          </Text>
          <Text style={styles.text}>{description}</Text>
        </View>

        {urlToImage ?
          <View style={styles.imgWrap}>
            <Image
              style={styles.img}
              source={{ uri: urlToImage }}
            />
          </View> : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#ffff",
    elevation: 1,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.2
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#393939"
  },
  content: {
    flexDirection: "row",
    flex: 1
  },
  main: {
    flex: 1
  },
  subtitle: {
    flexDirection: "row",
    color: "#a0a0a0",
    marginBottom: 4
  },
  text: {
    color: "#393939"
  },
  imgWrap: {
    width: "25%",
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 4
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
