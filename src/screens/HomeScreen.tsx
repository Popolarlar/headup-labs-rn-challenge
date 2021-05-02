import ArticleCard from 'components/ArticleCard'
import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { IArticle } from 'types'

const API_KEY = "fe92d2e6c16f4c679f9670d8f8ca8f40"
const API_BASE_URL = "https://newsapi.org/v2/top-headlines"
const PAGE_SIZE = 10

const defaultState = {
  data: [],
  error: null,
  page: 1,
  hasMorePage: true,
  isRefreshing: false,
  isLoadingMore: false,
}

export default function HomeScreen() {
  const [state, setState] = React.useState(defaultState)

  React.useEffect(() => {
    fetchData(1)
  }, [])

  const refreshPage = React.useCallback(
    () => {
      if (state.isRefreshing) { return }
      fetchData(1)
    },
    [state.isRefreshing],
  )

  const loadNextPage = React.useCallback(
    () => {
      if (state.isLoadingMore || !state.hasMorePage) {
        return
      }
      fetchData(state.page + 1)
    },
    [state.isLoadingMore, state.hasMorePage, state.page],
  )

  const fetchData = async (page: number) => {
    setState(prev => {
      return {
        ...prev,
        page,
        isRefreshing: page === 1 ? true : false,
        isLoadingMore: page === 1 ? false : true,
      }
    })

    const query = `${API_BASE_URL}?country=au&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}&page=${page}`

    try {
      const response = await fetch(query);
      const data = await response.json();

      if (data.status === "error") {
        throw new Error(`${data.code} - ${data.message}`)
      }

      setState(prev => {
        return {
          ...prev,
          data: state.page === 1 ? data.articles : [...prev.data, ...data.articles],
          hasMorePage: data.totalResults > state.page * PAGE_SIZE,
          isRefreshing: false,
          isLoadingMore: false,
        }
      })

    } catch (error) {
      setState(prev => {
        return {
          ...prev,
          isRefreshing: false,
          isLoadingMore: false,
          error: error
        }
      })
    }
  }

  const renderItem = ({ item, index }: { item: IArticle; index: number }) => <ArticleCard article={item} />

  const renderFooter = () => <View style={styles.footer}>
    <ActivityIndicator animating={state.isLoadingMore} size="large" />
  </View>

  const renderDivider = () => <View style={{ marginBottom: 16 }} />

  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        onRefresh={refreshPage}
        refreshing={state.isRefreshing}
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
  },
  footer: {
    marginVertical: 16
  }
})
