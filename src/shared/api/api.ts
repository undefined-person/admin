import axios, { AxiosRequestConfig } from 'axios'

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const createInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  return $api({
    ...config,
    ...options,
  }).then((res) => res.data)
}

type BodyType<Data> = Data

export interface SignInBodyDto {
  username: string
  password: string
}

export interface SignUpBodyDto {
  email: string
  password: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never

export const authControllerSignUp = (
  signUpBodyDto: BodyType<SignUpBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-up`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: signUpBodyDto,
    },
    options
  )
}

export const authControllerSignIn = (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: signInBodyDto,
    },
    options
  )
}

export const userControllerAddUser = (
  userDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/user/add-user`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: userDto,
    },
    options
  )
}

export interface GetSessionInfoDto {
  session: {
    userId: number
    role: 'ADMIN' | 'USER'
    iat: number
    exp: number
  }
}

export const authControllerSignOut = (options?: SecondParameter<typeof createInstance>) => {
  return createInstance<void>({ url: `/auth/sign-out`, method: 'POST' }, options)
}

export const authControllerGetSessionInfo = (options?: SecondParameter<typeof createInstance>) => {
  return createInstance<GetSessionInfoDto>({ url: `/auth/session`, method: 'GET' }, options)
}

export type NewsListParams = {
  page: number
  limit: number
}

export type News = {
  id: number
  title: string
  content: string
  newsCoverPhoto: string
  date: string
  authorId: number
}

type NewsResponse = {
  news: News[]
  hasMore: boolean
  hasPrevious: boolean
}

export const newsControllerGetNews = (params?: NewsListParams, options?: SecondParameter<typeof createInstance>) => {
  return createInstance<NewsResponse>({ url: `/news`, method: 'GET', params }, options)
}

export const newsControllerGetNewsById = (newsId: number, options?: SecondParameter<typeof createInstance>) => {
  return createInstance<News>({ url: `/news/${newsId}`, method: 'GET' }, options)
}

export type NewsBodyDto = {
  file: File
  title: string
  content: string
}

type NewsCreateResponse = {
  message: string
  news: News
}

export const newsControllerCreateNews = (
  newsBodyDto: BodyType<FormData>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<NewsCreateResponse>(
    {
      url: `/news`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: newsBodyDto,
    },
    options
  )
}

export const newsControllerUpdateNews = (
  newsId: number,
  newsBodyDto: BodyType<FormData>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<NewsCreateResponse>(
    {
      url: `/news/${newsId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: newsBodyDto,
    },
    options
  )
}

export const newsControllerDeleteNews = (newsId: number, options?: SecondParameter<typeof createInstance>) => {
  return createInstance<void>({ url: `/news/${newsId}`, method: 'DELETE' }, options)
}
