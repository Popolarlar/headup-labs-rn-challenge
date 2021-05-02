import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from 'types';
import { formatDate } from 'libs/date';

export default function DetailsScreen() {
  const route = useRoute<RootRouteProps<'Details'>>();
  const { title, author, publishedAt, urlToImage, content, url } = route.params.article

  const handlePress = async () => {
    const canOpen = await Linking.canOpenURL(url)
    if (canOpen) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Text style={styles.text} >{formatDate(publishedAt)} {author}</Text>
      <View style={styles.imgWrap}>
        <Image
          source={{ uri: urlToImage }}
          style={styles.img} />
      </View>
      <Text style={styles.text}>{content}</Text>
      <TouchableOpacity style={styles.action} onPress={handlePress}>
        <Text style={styles.actionText}>read more</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#393939"
  },
  action: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#a0a0a0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 18,
    color: "#ffff",
  },
  text: {
    fontSize: 18,
    color: "#393939"
  },
  imgWrap: {
    height: "30%",
    resizeMode: "contain",
    marginVertical: 8,
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
