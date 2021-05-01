import ArticleCard from 'components/ArticleCard'
import useFetchNews from 'hooks/useFetchNews'
import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { IArticle } from 'types'

export default function HomeScreen() {
  const [page, setPage] = React.useState(1)
  const { isLoading, hasMorePage, articles } = useFetchNews({ page })

  const loadNextPage = React.useCallback(
    () => {
      if (isLoading || !hasMorePage) {
        return
      }
      setPage(prev => prev + 1)
    },
    [isLoading, hasMorePage, page],
  )

  const renderItem = ({ item, index }: { item: IArticle; index: number }) => <ArticleCard article={item} />

  const renderFooter = () => {
    return (
      <View>
        <ActivityIndicator animating={isLoading} size="large" />
      </View>
    )
  }
  const renderDivider = () => <View style={{ marginBottom: 16 }} />



  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={renderDivider}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.content}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 16
  }
})
