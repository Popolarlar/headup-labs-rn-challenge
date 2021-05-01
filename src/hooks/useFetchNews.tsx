import React from 'react'
import { IArticle } from 'types'

const API_KEY = "fe92d2e6c16f4c679f9670d8f8ca8f40"
const API_BASE_URL = "https://newsapi.org/v2/top-headlines"
const PAGE_SIZE = 10

export default function useFetchNews(props: { page: number }) {
  const { page } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [hasMorePage, setHasMorePage] = React.useState<boolean>(true)
  const [articles, setArticles] = React.useState<IArticle[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const query = `${API_BASE_URL}?country=au&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}&page=${page}`

      try {
        const response = await fetch(query);
        const data = await response.json();

        if (data.status === "error") {
          throw new Error(`${data.code} - ${data.message}`)
        }


        setArticles(prev => [...prev, ...data.articles])
        setHasMorePage(data.totalResults > page * PAGE_SIZE)

      } catch (error) {
        console.log(error)
      }

      setIsLoading(false)
    };

    if (hasMorePage) {
      fetchData()
    }
  }, [page])

  return { isLoading, hasMorePage, articles };
}

