import { RouteProps } from 'react-router-dom'

export enum Routes {
  HOME = '/',
  SIGN_IN = '/sign-in',
  ADD_NEWS = '/add-news',
  PREVIEW_NEWS = '/preview',
  EDIT_NEWS = '/edit',
  ADD_USER = '/add-user',
}

export const getHomeRoute = () => Routes.HOME
export const getSignInRoute = () => Routes.SIGN_IN
export const getAddNewsRoute = () => Routes.ADD_NEWS
export const getPreviewNewsRoute = (newsId: string) => `${Routes.PREVIEW_NEWS}/${newsId}`
export const getEditNewsRoute = (newsId: string) => `${Routes.EDIT_NEWS}/${newsId}`
export const getAddUserRoute = () => Routes.ADD_USER

export type AppRoutesProps = RouteProps & {
  withLayout?: boolean
}
