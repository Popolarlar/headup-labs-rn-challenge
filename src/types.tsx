import { RouteProp } from '@react-navigation/native';

export interface IArticle {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
};

export type RootStackParamList = {
  Home: undefined;
  Details: { article: IArticle; };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;